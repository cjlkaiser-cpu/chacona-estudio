// Estado de la aplicación
let currentVariation = 0;
let studyData = {};

// Elementos del DOM
const elements = {
    sidebar: document.getElementById('sidebar'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    variationTitle: document.getElementById('variationTitle'),
    manuscriptImg: document.getElementById('manuscriptImg'),
    variationDescription: document.getElementById('variationDescription'),
    completedCheckbox: document.getElementById('completedCheckbox'),
    dateCompleted: document.getElementById('dateCompleted'),
    notesTextarea: document.getElementById('notesTextarea'),
    autosaveIndicator: document.getElementById('autosaveIndicator'),
    audioInput: document.getElementById('audioInput'),
    uploadBtn: document.getElementById('uploadBtn'),
    uploadArea: document.getElementById('uploadArea'),
    playerContainer: document.getElementById('playerContainer'),
    audioPlayer: document.getElementById('audioPlayer'),
    removeAudioBtn: document.getElementById('removeAudioBtn'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn')
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadStudyData();
    buildSidebar();
    loadVariation(currentVariation);
    setupEventListeners();
    updateProgress();
});

// Cargar datos guardados
function loadStudyData() {
    const saved = localStorage.getItem('chaconaStudyData');
    if (saved) {
        studyData = JSON.parse(saved);
    } else {
        // Inicializar datos vacíos para cada variación
        VARIACIONES.forEach((v, i) => {
            studyData[i] = {
                completed: false,
                completedDate: null,
                notes: '',
                audioData: null
            };
        });
    }
}

// Guardar datos
function saveStudyData() {
    localStorage.setItem('chaconaStudyData', JSON.stringify(studyData));
}

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
function loadVariation(index) {
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

    // Audio
    if (data.audioData) {
        elements.uploadArea.style.display = 'none';
        elements.playerContainer.style.display = 'flex';
        elements.audioPlayer.src = data.audioData;
    } else {
        elements.uploadArea.style.display = 'flex';
        elements.playerContainer.style.display = 'none';
        elements.audioPlayer.src = '';
    }

    // Actualizar sidebar
    document.querySelectorAll('.variation-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.index) === index) {
            item.classList.add('active');
            // Scroll to item
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
    elements.completedCheckbox.addEventListener('change', (e) => {
        studyData[currentVariation].completed = e.target.checked;
        studyData[currentVariation].completedDate = e.target.checked
            ? new Date().toLocaleDateString('es-ES')
            : null;

        elements.dateCompleted.textContent = studyData[currentVariation].completedDate
            ? `Completada: ${studyData[currentVariation].completedDate}`
            : '';

        saveStudyData();
        updateSidebarItem(currentVariation);
        updateProgress();
    });

    // Notas con autosave
    let notesTimeout;
    elements.notesTextarea.addEventListener('input', () => {
        elements.autosaveIndicator.textContent = 'Guardando...';
        elements.autosaveIndicator.className = 'autosave-indicator saving';

        clearTimeout(notesTimeout);
        notesTimeout = setTimeout(() => {
            studyData[currentVariation].notes = elements.notesTextarea.value;
            saveStudyData();
            elements.autosaveIndicator.textContent = 'Guardado ✓';
            elements.autosaveIndicator.className = 'autosave-indicator saved';

            setTimeout(() => {
                elements.autosaveIndicator.textContent = 'Guardado automático';
                elements.autosaveIndicator.className = 'autosave-indicator';
            }, 2000);
        }, 500);
    });

    // Upload audio
    elements.uploadBtn.addEventListener('click', () => {
        elements.audioInput.click();
    });

    elements.audioInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const audioData = event.target.result;
                studyData[currentVariation].audioData = audioData;
                saveStudyData();

                elements.uploadArea.style.display = 'none';
                elements.playerContainer.style.display = 'flex';
                elements.audioPlayer.src = audioData;
            };
            reader.readAsDataURL(file);
        }
    });

    // Eliminar audio
    elements.removeAudioBtn.addEventListener('click', () => {
        if (confirm('¿Eliminar esta grabación?')) {
            studyData[currentVariation].audioData = null;
            saveStudyData();

            elements.uploadArea.style.display = 'flex';
            elements.playerContainer.style.display = 'none';
            elements.audioPlayer.src = '';
            elements.audioInput.value = '';
        }
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
function toggleMobileMenu() {
    elements.sidebar.classList.toggle('open');
}

function closeMobileMenu() {
    elements.sidebar.classList.remove('open');
}

// Crear overlay para mobile
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
document.body.appendChild(overlay);
overlay.addEventListener('click', closeMobileMenu);

// Observar cambios en sidebar para overlay
const observer = new MutationObserver(() => {
    overlay.classList.toggle('active', elements.sidebar.classList.contains('open'));
});
observer.observe(elements.sidebar, { attributes: true, attributeFilter: ['class'] });
