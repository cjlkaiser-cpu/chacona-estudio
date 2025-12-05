// ==========================================
// BASE DE DATOS IndexedDB
// ==========================================

const DB_NAME = 'ChaconaStudyDB';
const DB_VERSION = 3; // Incrementado para múltiples grabaciones
let db = null;

// Inicializar IndexedDB
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const database = event.target.result;
            const oldVersion = event.oldVersion;

            // Store para datos de estudio (notas, completado, fecha)
            if (!database.objectStoreNames.contains('studyData')) {
                database.createObjectStore('studyData', { keyPath: 'id' });
            }

            // Store para fotos de partitura (binarios)
            if (!database.objectStoreNames.contains('photoFiles')) {
                database.createObjectStore('photoFiles', { keyPath: 'id' });
            }

            // Migración: de audioFiles antiguo a recordings (múltiples por variación)
            if (oldVersion < 3) {
                // Eliminar store antiguo si existe
                if (database.objectStoreNames.contains('audioFiles')) {
                    database.deleteObjectStore('audioFiles');
                }
                // Crear nuevo store para grabaciones múltiples
                const recordingsStore = database.createObjectStore('recordings', { keyPath: 'recordingId' });
                recordingsStore.createIndex('variationId', 'variationId', { unique: false });
            }
        };
    });
}

// Guardar datos de estudio
function saveStudyDataToDB(index, data) {
    if (!db) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['studyData'], 'readwrite');
        const store = transaction.objectStore('studyData');
        const request = store.put({ id: index, ...data });
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Cargar datos de estudio
function loadStudyDataFromDB() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['studyData'], 'readonly');
        const store = transaction.objectStore('studyData');
        const request = store.getAll();
        request.onsuccess = () => {
            const data = {};
            request.result.forEach(item => {
                data[item.id] = {
                    completed: item.completed || false,
                    completedDate: item.completedDate || null,
                    notes: item.notes || ''
                };
            });
            resolve(data);
        };
        request.onerror = () => reject(request.error);
    });
}

// Guardar grabación (múltiples por variación)
function saveRecordingToDB(variationId, audioBlob, name = null) {
    if (!db) return Promise.resolve();
    return new Promise(async (resolve, reject) => {
        // Contar grabaciones existentes para nombrar
        const existingRecordings = await getRecordingsForVariation(variationId);
        const takeNumber = existingRecordings.length + 1;

        const recording = {
            recordingId: `${variationId}_${Date.now()}`,
            variationId: variationId,
            name: name || `Toma ${takeNumber}`,
            date: new Date().toISOString(),
            audio: audioBlob
        };

        const transaction = db.transaction(['recordings'], 'readwrite');
        const store = transaction.objectStore('recordings');
        const request = store.put(recording);
        request.onsuccess = () => resolve(recording);
        request.onerror = () => reject(request.error);
    });
}

// Obtener grabaciones de una variación
function getRecordingsForVariation(variationId) {
    if (!db) return Promise.resolve([]);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['recordings'], 'readonly');
        const store = transaction.objectStore('recordings');
        const index = store.index('variationId');
        const request = index.getAll(variationId);
        request.onsuccess = () => {
            // Ordenar por fecha (más reciente primero)
            const recordings = request.result.sort((a, b) =>
                new Date(b.date) - new Date(a.date)
            );
            resolve(recordings);
        };
        request.onerror = () => reject(request.error);
    });
}

// Eliminar una grabación específica
function deleteRecordingFromDB(recordingId) {
    if (!db) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['recordings'], 'readwrite');
        const store = transaction.objectStore('recordings');
        const request = store.delete(recordingId);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Obtener todas las grabaciones (para exportar)
function getAllRecordingsFromDB() {
    if (!db) return Promise.resolve([]);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['recordings'], 'readonly');
        const store = transaction.objectStore('recordings');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Guardar foto
function savePhotoToDB(index, photoBlob) {
    if (!db) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['photoFiles'], 'readwrite');
        const store = transaction.objectStore('photoFiles');
        const request = store.put({ id: index, photo: photoBlob });
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Cargar foto
function loadPhotoFromDB(index) {
    if (!db) return Promise.resolve(null);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['photoFiles'], 'readonly');
        const store = transaction.objectStore('photoFiles');
        const request = store.get(index);
        request.onsuccess = () => resolve(request.result?.photo || null);
        request.onerror = () => reject(request.error);
    });
}

// Eliminar foto
function deletePhotoFromDB(index) {
    if (!db) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['photoFiles'], 'readwrite');
        const store = transaction.objectStore('photoFiles');
        const request = store.delete(index);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Obtener todas las fotos
function getAllPhotosFromDB() {
    if (!db) return Promise.resolve([]);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['photoFiles'], 'readonly');
        const store = transaction.objectStore('photoFiles');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// ==========================================
// EXPORTAR / IMPORTAR
// ==========================================

async function exportData() {
    try {
        const studyData = await loadStudyDataFromDB();
        const recordings = await getAllRecordingsFromDB();
        const photos = await getAllPhotosFromDB();

        // Convertir grabaciones (Blob) a base64 para exportar
        const recordingsBase64 = await Promise.all(
            recordings.map(async (item) => {
                if (item.audio instanceof Blob) {
                    const base64 = await blobToBase64(item.audio);
                    return { ...item, audio: base64 };
                }
                return item;
            })
        );

        // Convertir fotos (Blob) a base64 para exportar
        const photosBase64 = await Promise.all(
            photos.map(async (item) => {
                if (item.photo instanceof Blob) {
                    const base64 = await blobToBase64(item.photo);
                    return { id: item.id, photo: base64 };
                }
                return item;
            })
        );

        const exportObj = {
            version: 3,
            exportDate: new Date().toISOString(),
            studyData: studyData,
            recordings: recordingsBase64,
            photoFiles: photosBase64
        };

        const json = JSON.stringify(exportObj);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `chacona-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();

        URL.revokeObjectURL(url);
        showNotification('Backup exportado correctamente', 'success');
    } catch (error) {
        console.error('Error exportando:', error);
        showNotification('Error al exportar', 'error');
    }
}

async function importData(file) {
    try {
        const text = await file.text();
        const data = JSON.parse(text);

        if (!data.version || !data.studyData) {
            throw new Error('Formato de archivo inválido');
        }

        // Importar datos de estudio
        for (const [index, item] of Object.entries(data.studyData)) {
            await saveStudyDataToDB(parseInt(index), item);
        }

        // Importar grabaciones (nuevo formato v3)
        if (data.recordings) {
            for (const item of data.recordings) {
                if (item.audio) {
                    const blob = base64ToBlob(item.audio);
                    // Guardar directamente con la estructura completa
                    const recording = {
                        recordingId: item.recordingId,
                        variationId: item.variationId,
                        name: item.name,
                        date: item.date,
                        audio: blob
                    };
                    const transaction = db.transaction(['recordings'], 'readwrite');
                    const store = transaction.objectStore('recordings');
                    await new Promise((resolve, reject) => {
                        const request = store.put(recording);
                        request.onsuccess = () => resolve();
                        request.onerror = () => reject(request.error);
                    });
                }
            }
        }

        // Compatibilidad con formato antiguo v2 (audioFiles)
        if (data.audioFiles && !data.recordings) {
            for (const item of data.audioFiles) {
                if (item.audio) {
                    const blob = base64ToBlob(item.audio);
                    await saveRecordingToDB(item.id, blob, 'Toma 1 (importada)');
                }
            }
        }

        // Importar fotos (convertir base64 a Blob)
        if (data.photoFiles) {
            for (const item of data.photoFiles) {
                if (item.photo) {
                    const blob = base64ToBlob(item.photo);
                    await savePhotoToDB(item.id, blob);
                }
            }
        }

        // Recargar datos
        studyData = await loadStudyDataFromDB();
        buildSidebar();
        loadVariation(currentVariation);
        updateProgress();

        showNotification('Backup importado correctamente', 'success');
    } catch (error) {
        console.error('Error importando:', error);
        showNotification('Error al importar: ' + error.message, 'error');
    }
}

// Utilidades para conversión
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

function base64ToBlob(base64) {
    const parts = base64.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

// Notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==========================================
// GRABADOR DE AUDIO
// ==========================================

let mediaRecorder = null;
let audioChunks = [];
let recordingStartTime = null;
let recordingTimer = null;

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Determinar formato soportado
        const mimeType = MediaRecorder.isTypeSupported('audio/webm')
            ? 'audio/webm'
            : 'audio/mp4';

        mediaRecorder = new MediaRecorder(stream, { mimeType });
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = async () => {
            // Parar todas las pistas del stream
            stream.getTracks().forEach(track => track.stop());

            // Crear blob con el audio grabado
            const audioBlob = new Blob(audioChunks, { type: mimeType });

            // Guardar en IndexedDB (nueva grabación)
            await saveRecordingToDB(currentVariation, audioBlob);

            // Mostrar botones y actualizar lista
            elements.audioOptions.style.display = 'flex';
            elements.recorderActive.style.display = 'none';
            await renderRecordingsList(currentVariation);

            showNotification('Grabación guardada', 'success');
        };

        // Iniciar grabación
        mediaRecorder.start();
        recordingStartTime = Date.now();

        // Actualizar UI
        elements.audioOptions.style.display = 'none';
        elements.recorderActive.style.display = 'flex';

        // Timer
        recordingTimer = setInterval(updateRecordingTime, 1000);
        updateRecordingTime();

    } catch (error) {
        console.error('Error al acceder al micrófono:', error);
        if (error.name === 'NotAllowedError') {
            showNotification('Permiso de micrófono denegado', 'error');
        } else {
            showNotification('Error al iniciar grabación', 'error');
        }
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        clearInterval(recordingTimer);
    }
}

function updateRecordingTime() {
    const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const seconds = (elapsed % 60).toString().padStart(2, '0');
    elements.recTime.textContent = `${minutes}:${seconds}`;
}

// ==========================================
// LISTA DE GRABACIONES
// ==========================================

let currentlyPlayingAudio = null;
let currentlyPlayingButton = null;

async function renderRecordingsList(variationId) {
    const recordings = await getRecordingsForVariation(variationId);
    const container = elements.recordingsList;

    if (recordings.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = recordings.map(rec => {
        const date = new Date(rec.date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return `
            <div class="recording-item" data-recording-id="${rec.recordingId}">
                <span class="recording-icon">🎵</span>
                <div class="recording-info">
                    <div class="recording-name">${rec.name}</div>
                    <div class="recording-date">${date}</div>
                </div>
                <div class="recording-actions">
                    <button class="play-btn" data-recording-id="${rec.recordingId}" title="Reproducir">
                        ▶
                    </button>
                    <button class="delete-recording-btn" data-recording-id="${rec.recordingId}" title="Eliminar">
                        ✕
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Event listeners para reproducir
    container.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const recordingId = e.currentTarget.dataset.recordingId;
            await playRecording(recordingId, e.currentTarget);
        });
    });

    // Event listeners para eliminar
    container.querySelectorAll('.delete-recording-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const recordingId = e.currentTarget.dataset.recordingId;
            if (confirm('¿Eliminar esta grabación?')) {
                await deleteRecordingFromDB(recordingId);
                await renderRecordingsList(variationId);
                showNotification('Grabación eliminada', 'info');
            }
        });
    });
}

async function playRecording(recordingId, button) {
    // Si ya hay algo reproduciéndose
    if (currentlyPlayingAudio) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio = null;
        if (currentlyPlayingButton) {
            currentlyPlayingButton.textContent = '▶';
            currentlyPlayingButton.classList.remove('playing');
            currentlyPlayingButton.closest('.recording-item').classList.remove('playing');
        }

        // Si es el mismo botón, solo parar
        if (currentlyPlayingButton === button) {
            currentlyPlayingButton = null;
            return;
        }
    }

    // Obtener la grabación de IndexedDB
    const recordings = await getRecordingsForVariation(currentVariation);
    const recording = recordings.find(r => r.recordingId === recordingId);

    if (!recording || !recording.audio) {
        showNotification('Error al cargar la grabación', 'error');
        return;
    }

    // Crear audio y reproducir
    const audioUrl = URL.createObjectURL(recording.audio);
    const audio = new Audio(audioUrl);

    audio.onended = () => {
        button.textContent = '▶';
        button.classList.remove('playing');
        button.closest('.recording-item').classList.remove('playing');
        currentlyPlayingAudio = null;
        currentlyPlayingButton = null;
        URL.revokeObjectURL(audioUrl);
    };

    audio.onerror = () => {
        showNotification('Error al reproducir', 'error');
        button.textContent = '▶';
        button.classList.remove('playing');
        button.closest('.recording-item').classList.remove('playing');
        currentlyPlayingAudio = null;
        currentlyPlayingButton = null;
    };

    currentlyPlayingAudio = audio;
    currentlyPlayingButton = button;

    button.textContent = '⏸';
    button.classList.add('playing');
    button.closest('.recording-item').classList.add('playing');

    audio.play();
}

// ==========================================
// APLICACIÓN PRINCIPAL
// ==========================================

let currentVariation = 0;
let studyData = {};

// Elementos del DOM
const elements = {};

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Cachear elementos del DOM
        elements.sidebar = document.getElementById('sidebar');
        elements.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        elements.progressFill = document.getElementById('progressFill');
        elements.progressText = document.getElementById('progressText');
        elements.variationTitle = document.getElementById('variationTitle');
        elements.manuscriptImg = document.getElementById('manuscriptImg');
        elements.variationDescription = document.getElementById('variationDescription');
        elements.completedCheckbox = document.getElementById('completedCheckbox');
        elements.dateCompleted = document.getElementById('dateCompleted');
        elements.notesTextarea = document.getElementById('notesTextarea');
        elements.autosaveIndicator = document.getElementById('autosaveIndicator');

        // Audio elements
        elements.audioOptions = document.getElementById('audioOptions');
        elements.recordBtn = document.getElementById('recordBtn');
        elements.uploadBtn = document.getElementById('uploadBtn');
        elements.audioInput = document.getElementById('audioInput');
        elements.recorderActive = document.getElementById('recorderActive');
        elements.recTime = document.getElementById('recTime');
        elements.stopBtn = document.getElementById('stopBtn');
        elements.recordingsList = document.getElementById('recordingsList');

        // Photo elements
        elements.photoUploadArea = document.getElementById('photoUploadArea');
        elements.photoUploadBtn = document.getElementById('photoUploadBtn');
        elements.photoInput = document.getElementById('photoInput');
        elements.photoPreviewContainer = document.getElementById('photoPreviewContainer');
        elements.photoPreview = document.getElementById('photoPreview');
        elements.removePhotoBtn = document.getElementById('removePhotoBtn');

        // Navigation
        elements.prevBtn = document.getElementById('prevBtn');
        elements.nextBtn = document.getElementById('nextBtn');

        // Backup
        elements.exportBtn = document.getElementById('exportBtn');
        elements.importBtn = document.getElementById('importBtn');
        elements.importInput = document.getElementById('importInput');

        // Inicializar DB y cargar datos
        try {
            await initDB();
            studyData = await loadStudyDataFromDB();
        } catch (dbError) {
            console.warn('IndexedDB no disponible, usando modo sin persistencia:', dbError);
            db = null; // Marcar que no hay DB
        }

        // Inicializar datos vacíos si no existen
        for (let i = 0; i < VARIACIONES.length; i++) {
            if (!studyData[i]) {
                studyData[i] = {
                    completed: false,
                    completedDate: null,
                    notes: ''
                };
            }
        }

        buildSidebar();
        loadVariation(currentVariation);
        setupEventListeners();
        setupMobileOverlay();
        updateProgress();
    } catch (error) {
        console.error('Error inicializando app:', error);
    }
});

// Construir sidebar con las variaciones
function buildSidebar() {
    const sections = {
        'section-re-menor-1': [],
        'section-re-mayor': [],
        'section-re-menor-2': []
    };

    VARIACIONES.forEach((v, index) => {
        const sectionId = `section-${v.seccion}`;
        if (sections[sectionId]) {
            sections[sectionId].push({ ...v, index });
        }
    });

    Object.keys(sections).forEach(sectionId => {
        const container = document.getElementById(sectionId);
        if (container) {
            container.innerHTML = sections[sectionId].map(v => `
                <div class="variation-item ${studyData[v.index]?.completed ? 'completed' : ''}"
                     data-index="${v.index}">
                    <span class="item-check">${studyData[v.index]?.completed ? '✓' : '○'}</span>
                    <span class="item-number">${v.numero}</span>
                    <span class="item-title">${v.titulo.replace(/Variación \d+\s*/, '')}</span>
                </div>
            `).join('');
        }
    });

    // Event listeners para items
    document.querySelectorAll('.variation-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            loadVariation(index);
            closeMobileMenu();
        });
    });

    // Event listeners para headers de sección
    document.querySelectorAll('.section-header').forEach(header => {
        header.addEventListener('click', () => {
            const sectionId = header.dataset.section;
            const items = document.getElementById(`section-${sectionId}`);
            const icon = header.querySelector('.section-icon');

            items.classList.toggle('collapsed');
            icon.textContent = items.classList.contains('collapsed') ? '▶' : '▼';
        });
    });
}

// Cargar una variación
async function loadVariation(index) {
    currentVariation = index;
    const variation = VARIACIONES[index];
    const data = studyData[index] || {};

    // Actualizar UI
    elements.variationTitle.textContent = variation.titulo;
    elements.manuscriptImg.src = variation.imagen;
    elements.manuscriptImg.alt = `Manuscrito ${variation.titulo}`;
    elements.variationDescription.textContent = variation.texto;

    // Checkbox completada
    elements.completedCheckbox.checked = data.completed || false;
    elements.dateCompleted.textContent = data.completedDate
        ? `Completada: ${data.completedDate}`
        : '';

    // Notas
    elements.notesTextarea.value = data.notes || '';

    // Parar audio si está reproduciéndose
    if (currentlyPlayingAudio) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio = null;
        currentlyPlayingButton = null;
    }

    // Mostrar lista de grabaciones
    elements.audioOptions.style.display = 'flex';
    elements.recorderActive.style.display = 'none';
    await renderRecordingsList(index);

    // Foto desde IndexedDB
    const photoBlob = await loadPhotoFromDB(index);
    if (photoBlob) {
        const photoUrl = URL.createObjectURL(photoBlob);
        elements.photoUploadArea.style.display = 'none';
        elements.photoPreviewContainer.style.display = 'block';
        elements.photoPreview.src = photoUrl;
    } else {
        elements.photoUploadArea.style.display = 'block';
        elements.photoPreviewContainer.style.display = 'none';
        elements.photoPreview.src = '';
    }

    // Actualizar sidebar
    document.querySelectorAll('.variation-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.index) === index) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    // Botones navegación
    elements.prevBtn.disabled = index === 0;
    elements.nextBtn.disabled = index === VARIACIONES.length - 1;

    // Expandir sección correspondiente
    expandSection(variation.seccion);
}

// Expandir sección en sidebar
function expandSection(seccion) {
    const sectionItems = document.getElementById(`section-${seccion}`);
    const sectionHeader = document.querySelector(`[data-section="${seccion}"]`);

    if (sectionItems && sectionItems.classList.contains('collapsed')) {
        sectionItems.classList.remove('collapsed');
        const icon = sectionHeader.querySelector('.section-icon');
        icon.textContent = '▼';
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Navegación
    elements.prevBtn.addEventListener('click', () => {
        if (currentVariation > 0) {
            loadVariation(currentVariation - 1);
        }
    });

    elements.nextBtn.addEventListener('click', () => {
        if (currentVariation < VARIACIONES.length - 1) {
            loadVariation(currentVariation + 1);
        }
    });

    // Checkbox completada
    elements.completedCheckbox.addEventListener('change', async (e) => {
        studyData[currentVariation].completed = e.target.checked;
        studyData[currentVariation].completedDate = e.target.checked
            ? new Date().toLocaleDateString('es-ES')
            : null;

        elements.dateCompleted.textContent = studyData[currentVariation].completedDate
            ? `Completada: ${studyData[currentVariation].completedDate}`
            : '';

        await saveStudyDataToDB(currentVariation, studyData[currentVariation]);
        updateSidebarItem(currentVariation);
        updateProgress();
    });

    // Notas con autosave
    let notesTimeout;
    elements.notesTextarea.addEventListener('input', () => {
        elements.autosaveIndicator.textContent = 'Guardando...';
        elements.autosaveIndicator.className = 'autosave-indicator saving';

        clearTimeout(notesTimeout);
        notesTimeout = setTimeout(async () => {
            studyData[currentVariation].notes = elements.notesTextarea.value;
            await saveStudyDataToDB(currentVariation, studyData[currentVariation]);

            elements.autosaveIndicator.textContent = 'Guardado ✓';
            elements.autosaveIndicator.className = 'autosave-indicator saved';

            setTimeout(() => {
                elements.autosaveIndicator.textContent = 'Guardado automático';
                elements.autosaveIndicator.className = 'autosave-indicator';
            }, 2000);
        }, 500);
    });

    // Grabar audio
    elements.recordBtn.addEventListener('click', startRecording);
    elements.stopBtn.addEventListener('click', stopRecording);

    // Upload audio
    elements.uploadBtn.addEventListener('click', () => {
        elements.audioInput.click();
    });

    elements.audioInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            await saveRecordingToDB(currentVariation, file);
            await renderRecordingsList(currentVariation);
            elements.audioInput.value = '';
            showNotification('Audio guardado', 'success');
        }
    });

    // Upload foto
    elements.photoUploadBtn.addEventListener('click', () => {
        elements.photoInput.click();
    });

    elements.photoInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            await savePhotoToDB(currentVariation, file);

            const photoUrl = URL.createObjectURL(file);
            elements.photoUploadArea.style.display = 'none';
            elements.photoPreviewContainer.style.display = 'block';
            elements.photoPreview.src = photoUrl;

            showNotification('Foto guardada', 'success');
        }
    });

    // Eliminar foto
    elements.removePhotoBtn.addEventListener('click', async () => {
        if (confirm('¿Eliminar esta foto?')) {
            await deletePhotoFromDB(currentVariation);

            elements.photoUploadArea.style.display = 'block';
            elements.photoPreviewContainer.style.display = 'none';
            elements.photoPreview.src = '';
            elements.photoInput.value = '';

            showNotification('Foto eliminada', 'info');
        }
    });

    // Exportar / Importar
    elements.exportBtn.addEventListener('click', exportData);

    elements.importBtn.addEventListener('click', () => {
        elements.importInput.click();
    });

    elements.importInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            if (confirm('¿Importar backup? Esto sobrescribirá los datos actuales.')) {
                importData(file);
            }
        }
        e.target.value = '';
    });

    // Mobile menu
    elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'ArrowLeft' && currentVariation > 0) {
            loadVariation(currentVariation - 1);
        } else if (e.key === 'ArrowRight' && currentVariation < VARIACIONES.length - 1) {
            loadVariation(currentVariation + 1);
        }
    });
}

// Actualizar item en sidebar
function updateSidebarItem(index) {
    const item = document.querySelector(`.variation-item[data-index="${index}"]`);
    if (item) {
        const isCompleted = studyData[index]?.completed;
        item.classList.toggle('completed', isCompleted);
        item.querySelector('.item-check').textContent = isCompleted ? '✓' : '○';
    }
}

// Actualizar barra de progreso
function updateProgress() {
    const completed = Object.values(studyData).filter(d => d.completed).length;
    const total = VARIACIONES.length;
    const percentage = (completed / total) * 100;

    elements.progressFill.style.width = `${percentage}%`;
    elements.progressText.textContent = `${completed}/${total} completadas`;
}

// Mobile menu
let overlay = null;

function toggleMobileMenu() {
    elements.sidebar.classList.toggle('open');
    if (overlay) {
        overlay.classList.toggle('active', elements.sidebar.classList.contains('open'));
    }
}

function closeMobileMenu() {
    elements.sidebar.classList.remove('open');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

function setupMobileOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeMobileMenu);
}
