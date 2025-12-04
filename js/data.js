// Datos de las variaciones de la Chacona BWV 1004
const VARIACIONES = [
    {
        numero: 1,
        titulo: "Variación 1 (Tema)",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var01-copia.gif",
        texto: "La Chacona comienza, extrañamente, en el segundo tiempo (el tiempo fuerte que falta se completa al final de la pieza). Los dos primeros compases siguen exactamente el ritmo de chacona. Las notas altas de los acordes explican la melodía, que fluye ininterrumpidamente hacia la siguiente variación.",
        seccion: "re-menor-1"
    },
    {
        numero: 2,
        titulo: "Variación 2",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var02-copia.gif",
        texto: "Bach sigue fiel al ritmo de chacona. Este tema usa un final diferente al de la primera frase, con la melodía subiendo a un pico más alto e intenso.",
        seccion: "re-menor-1"
    },
    {
        numero: 3,
        titulo: "Variación 3",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var03-copia.gif",
        texto: "La melodía cambia a un registro más bajo, por lo que ahora es la nota más baja o la segunda más baja de cada acorde. Esta melodía se siente arquetípica, como la melodía de chacona más genérica que se le ocurrió a Bach. Los acordes permanecen iguales, pero el ritmo se asienta en un patrón más regular: corchea con puntillo, semicorchea, corchea con puntillo, semicorchea. Esta variación forma una estructura de llamada y respuesta con la variación 4.",
        seccion: "re-menor-1"
    },
    {
        numero: 4,
        titulo: "Variación 4",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var04-copia.gif",
        texto: "Esta es prácticamente la misma melodía que en la variación 3, pero se mueve a través de una armonía un poco más compleja al final.",
        seccion: "re-menor-1"
    },
    {
        numero: 5,
        titulo: "Variación 5",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var05-copia.gif",
        texto: "La melodía de las dos variaciones anteriores se repite, pero de forma ligeramente diferente y una octava más alta. También hay más homofonía en el contrapunto de dos voces. Hasta este punto, cada nota en la Chacona ha sido de las escalas Re menor natural o Re menor armónica. Sin embargo, justo antes del tercer compás de esta variación, aparece por primera vez la nota Fa sostenido, la tercera mayor en la clave de Re. Es parte de un acorde Re7, el V7/IV.",
        seccion: "re-menor-1"
    },
    {
        numero: 6,
        titulo: "Variación 6",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var06-copia.gif",
        texto: "Esto es casi lo mismo que la variación 5 hasta el último compás, cuando hay otro tono cromático nuevo, Sol#. Es parte de Mi7, el acorde V7/V. Siendo el compositor inteligente que es, Bach no lo resuelve de inmediato, primero pone un acorde Rem/LA, una especie de extensión contrapuntística de La7sus4.",
        seccion: "re-menor-1"
    },
    {
        numero: 7,
        titulo: "Variación 7",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var07-copia.gif",
        texto: "Hay un ritmo nuevo y más simple, corcheas y semicorcheas normales. La voz superior reproduce patrones escalares y la voz inferior hace un contrapunto mínimo en un patrón i-iv-V simple. En el segundo tiempo del segundo compás, Bach implica un acorde LA7(♭9) saltando desde el tercer Do sostenido hasta el Si♭ 9♭.",
        seccion: "re-menor-1"
    },
    {
        numero: 8,
        titulo: "Variación 8",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var08-copia.gif",
        texto: "Un camino más elaborado melódicamente a través de los cambios de acordes de la variación 7. Al final del tercer compás, hay otro tono nuevo que no hemos escuchado antes, Mi♭, la cuarta suspendida del acorde Si♭. Bach ahora ha usado las doce clases de tonos cromáticos, y solo estamos a un octavo del camino a través de la Chacona. Incluye el riff Tragic Baroque Ending.",
        seccion: "re-menor-1"
    },
    {
        numero: 9,
        titulo: "Variación 9",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var09-copia.gif",
        texto: "Una bonita secuencia muy jazz de dominantes que recorre el círculo de quintas. Es un patrón muy elegante de bajada cromática haciendo una llamada y respuesta en los registros alto y bajo. El primer descenso cromático de Si♭ a G# es especialmente dramático. Bach utiliza aquí un ritmo simple de corchea para no sobrecargar tu cerebro.",
        seccion: "re-menor-1"
    },
    {
        numero: 10,
        titulo: "Variación 10",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var10-copia.gif",
        texto: "Una versión arpegiada más compleja de la variación 9, con semicorcheas en lugar de corcheas. Al final del tercer compás está el salto de Do sostenido a Si bemol que implica nuevamente La7(♭9).",
        seccion: "re-menor-1"
    },
    {
        numero: 11,
        titulo: "Variación 11",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var11-copia.gif",
        texto: "Armónicamente similar a la variación 10, pero un poco más simple, con una mezcla de escalas y arpegios. La ejecución de toda la escala menor melódica en Re en el primer compás es otro motivo recurrente que Bach utilizará muchas más veces a lo largo de la Chacona.",
        seccion: "re-menor-1"
    },
    {
        numero: 12,
        titulo: "Variación 12",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var12-copia.gif",
        texto: "La resolución de La7 a Rem se pospone al segundo tiempo del primer compás. La escala de semicorcheas se ejecuta con algunos grandes saltos en los acordes V7 y V7/iv. En el tercer compás, Bach realiza todo el camino en la escala menor melódica de Sol, en paralelo a la ejecución menor melódica de Re en la variación 11.",
        seccion: "re-menor-1"
    },
    {
        numero: 13,
        titulo: "Variación 13",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var13-copia.gif",
        texto: "Bach introduce una nueva progresión de acordes, la cadencia andaluza, familiar para los fanáticos de Ray Charles igual a los cambios de 'Hit The Road, Jack'. Esta progresión continuará durante las siguientes ocho variaciones. Incluye adornos: el Solm antes del Do7, el Fa7 tonificando el Sib y el Miø7 como el predominante de La7.",
        seccion: "re-menor-1"
    },
    {
        numero: 14,
        titulo: "Variación 14",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var14-copia.gif",
        texto: "Continuamos con la cadencia andaluza. Arpegios de semicorcheas y fragmentos de escala en una ordenada secuencia ascendente.",
        seccion: "re-menor-1"
    },
    {
        numero: 15,
        titulo: "Variación 15",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var15-copia.gif",
        texto: "Cadencia andaluza. Dobles cuerdas y arpegios de corcheas dando paso a secuencias de semicorcheas.",
        seccion: "re-menor-1"
    },
    {
        numero: 16,
        titulo: "Variación 16",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var16-copia.gif",
        texto: "Cadencia andaluza. Dobles cuerdas y arpegios de corcheas dando paso a secuencias de semicorcheas.",
        seccion: "re-menor-1"
    },
    {
        numero: 17,
        titulo: "Variación 17",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var17-copia.gif",
        texto: "Cadencia andaluza. Arpegios de semicorcheas dando paso a escalas de fusas. Esto parece muy difícil de tocar, pero si conoces las escalas, no lo es: Bach está ejecutando Re menor natural y Sib mayor, y subiendo y bajando Re menor melódica al final.",
        seccion: "re-menor-1"
    },
    {
        numero: 18,
        titulo: "Variación 18",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var18-copia.gif",
        texto: "Cadencia andaluza. En su mayoría, ejecuciones de escala de fusas. Los primeros tres compases están completamente dentro de la escala Re menor natural. El último compás es donde se complica: la primera nota es un Do sostenido que implica Re menor armónico, pero luego el siguiente tiempo y medio es un Re menor natural directo descendente.",
        seccion: "re-menor-1"
    },
    {
        numero: 19,
        titulo: "Variación 19",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var19-copia.gif",
        texto: "Cadencia andaluza. Esta variación es una de las más difíciles de tocar, porque es casi todas las escalas de fusas, y porque las escalas cambian mucho: dos tiempos de Re menor melódico, luego un arpegio Si♭ cromatizado, luego casi dos compases de Sol menor melódico. ¡Es como correr rápido a través de una carrera de obstáculos!",
        seccion: "re-menor-1"
    },
    {
        numero: 20,
        titulo: "Variación 20",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var20-copia.gif",
        texto: "El pulso vuelve a estabilizarse en semicorcheas constantes, pero la armonía se vuelve mucho más complicada. Es como una cadencia andaluza, pero Do y Si♭ son reemplazados por sus relativos menores y son precedidos por dominantes secundarios. Hay un patrón de arpegio ascendente y descendente genial.",
        seccion: "re-menor-1"
    },
    {
        numero: 21,
        titulo: "Variación 21",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var21-copia.gif",
        texto: "Algunos ritmos nuevos y algunos acordes nuevos. Yo los llamo los acordes misteriosos. Los arpegios tienen notas dobladas en un patrón sincopado, con una secuencia de fusas al final. Esto es difícil para el cerebro, pero muy satisfactorio de tocar una vez que lo dominas.",
        seccion: "re-menor-1"
    },
    {
        numero: 22,
        titulo: "Variación 22",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var22-copia-1.gif",
        texto: "La armonía se vuelve dramáticamente más simple, mientras que la melodía se vuelve más compleja, con frases ascendentes y descendentes fragmentadas en un patrón impredecible. Los patrones de hemiola de tres notas en los compases tercero y cuarto suenan más a jazz que a música barroca. Ese Sol5 superior es la nota más alta de toda la pieza.",
        seccion: "re-menor-1"
    },
    {
        numero: 23,
        titulo: "Variación 23",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var23-copia-2.gif",
        texto: "Ahora Bach da comienzo a una serie de nueve variaciones de arpegios rápidos e intensos. La progresión es nueva, un sencillo i-ii-V, i-ii-V.",
        seccion: "re-menor-1"
    },
    {
        numero: 24,
        titulo: "Variación 24",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var24-copia-1.gif",
        texto: "Arpegios intensos. La progresión parece complicada, pero simplemente es I – V7/iv – iv – V.",
        seccion: "re-menor-1"
    },
    {
        numero: 25,
        titulo: "Variación 25",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var25-copia-1.gif",
        texto: "Arpegios intensos con líneas cromáticas ascendentes y descendentes en las voces exteriores. Los acordes son una versión elaborada de los de la variación 24.",
        seccion: "re-menor-1"
    },
    {
        numero: 26,
        titulo: "Variación 26",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var26-copia-1.gif",
        texto: "Arpegios intensos con líneas cromáticas ascendentes y descendentes en las voces exteriores. Los acordes son una versión elaborada de los de la variación 24.",
        seccion: "re-menor-1"
    },
    {
        numero: 27,
        titulo: "Variación 27",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var27-copia-1.gif",
        texto: "Arpegios intensos, pasando del contrapunto de tres voces al de cuatro voces. La armonía es una versión decorada de otra cadencia andaluza. Los acordes menores de séptima al final del primer compás y al comienzo del segundo son muy suaves.",
        seccion: "re-menor-1"
    },
    {
        numero: 28,
        titulo: "Variación 28",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var28-copia-1.gif",
        texto: "Arpegios intensos. Bach vuelve al contrapunto a tres voces, pero con una tensa armonía cromáticamente ascendente. Este podría ser el momento más dramático de toda la pieza. Es un pico de intensidad particular. Hermoso.",
        seccion: "re-menor-1"
    },
    {
        numero: 29,
        titulo: "Variación 29",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var29-copia-1.gif",
        texto: "Arpegios intensos. ¡Qué desgarrador es ese salto de Re a Si♭ al principio! Lleno de patetismo. Después, los acordes descienden cromáticamente, liberando la tensión acumulada. Los acordes siguen el círculo de movimiento de quintas de un modo que suena jazz.",
        seccion: "re-menor-1"
    },
    {
        numero: 30,
        titulo: "Variación 30",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var30-copia-2.gif",
        texto: "Ronda final de arpegios intensos. La voz superior sigue descendiendo del pico de variación 28. El primer acorde es una sorpresa, un acorde Re mayor en lugar de Re menor como todas las demás variaciones hasta ahora. Presagia el inminente cambio a Re mayor. ¡Tan fresco!",
        seccion: "re-menor-1"
    },
    {
        numero: 31,
        titulo: "Variación 31",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var31-copia-1.gif",
        texto: "Los arpegios intensos finalmente se suavizan. Conseguimos una cadencia andaluza más sencilla pero aún elaborada. Hay más grupos de hemiola de tres notas. Esto parece más difícil de tocar de lo que es: Re menor natural, Si♭ mayor, Re menor natural de nuevo, y luego Re menor melódico en el último compás.",
        seccion: "re-menor-1"
    },
    {
        numero: 32,
        titulo: "Variación 32 (Tema)",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var32-copia.gif",
        texto: "¡Vuelve el tema! Comienza fragmentado en ejecuciones de escala de semicorcheas durante dos tiempos. Después de eso, se instala en los mismos acordes de bloque que el comienzo de la pieza. Pero luego, en el último compás, cambia a una secuencia genial de contrapunto de cuatro voces, con las tres voces superiores descendiendo cromáticamente.",
        seccion: "re-menor-1"
    },
    {
        numero: 33,
        titulo: "Variación 33 (Tema)",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var33-copia-1.gif",
        texto: "La secuencia de contrapunto con la voz superior cromáticamente descendente continúa desde la variación 32. Las frases de Bach atraviesan el límite de esta sección. Como en la variación 30, el primer acorde es Re mayor en lugar de Re menor, para prefigurar el cambio a Re mayor.",
        seccion: "re-menor-1"
    },
    {
        numero: 34,
        titulo: "Variación 34 (Re Mayor)",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var34-copia.gif",
        texto: "¡Re mayor! Los ritmos y acordes se vuelven mucho más simples por un tiempo. Es como llegar a un claro del bosque. El ritmo ahora es la versión más literal típica de la chacona.",
        seccion: "re-mayor"
    },
    {
        numero: 35,
        titulo: "Variación 35",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var35-copia.gif",
        texto: "Contrapunto simple de dos y tres voces en acordes mayores diatónicos simples, solo escalas en corcheas en su mayor parte.",
        seccion: "re-mayor"
    },
    {
        numero: 36,
        titulo: "Variación 36",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var36-copia.gif",
        texto: "Contrapunto pastoral más suave en corcheas, aunque ahora se expande a tres y cuatro voces. También salimos brevemente de Re mayor, con un Sol sostenido en el acorde Mi7.",
        seccion: "re-mayor"
    },
    {
        numero: 37,
        titulo: "Variación 37",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var37-copia.gif",
        texto: "Un contrapunto aún más pastoral, con una elegante secuencia descendente de dos y tres voces a través de la segunda mitad de la variación. Ese patrón de acordes en los dos últimos compases es difícil de conseguir con la guitarra, pero suena genial cuando lo haces.",
        seccion: "re-mayor"
    },
    {
        numero: 38,
        titulo: "Variación 38",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var38-copia.gif",
        texto: "Llamada y respuesta entre ejecuciones de escala de semicorcheas y arpegios y acordes en una progresión más compleja con algunos acordes nuevos, incluido Fa#7. ¿Qué tan moderno es ese Solmaj7 arpegiado en el tercer compás?",
        seccion: "re-mayor"
    },
    {
        numero: 39,
        titulo: "Variación 39",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var39-copia.gif",
        texto: "Arpegios y descensos de escala sobre una progresión sencilla y alegre: I-V-V/V-V. Los arpegios cubren un amplio rango de octavas, pero por lo demás son simples canciones de cuna.",
        seccion: "re-mayor"
    },
    {
        numero: 40,
        titulo: "Variación 40",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var40-copia.gif",
        texto: "Bonita secuencia de arpegios simples escalonada sobre IV-vi-V. El Fa sostenido en la parte superior de la secuencia es la segunda nota más alta de la Chacona.",
        seccion: "re-mayor"
    },
    {
        numero: 41,
        titulo: "Variación 41",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var41-copia.gif",
        texto: "Misma progresión y concepto melódico básico que la variación 40, pero con grupos de tres La repetidos en la parte superior. La figura tiene una cualidad regia.",
        seccion: "re-mayor"
    },
    {
        numero: 42,
        titulo: "Variación 42",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var42-copia.gif",
        texto: "Continuando con el motivo de tres La repetidas en un registro más bajo. Los mismos acordes que el par de variaciones anteriores, pero con V7/V insertado antes del último compás.",
        seccion: "re-mayor"
    },
    {
        numero: 43,
        titulo: "Variación 43",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var43-copia.gif",
        texto: "Ahora Bach repite más grupos de notas, hasta cinco a la vez, sobre una nota pedal La repetida. Usar La como nota de bajo para un acorde Mi7 es extraño y «incorrecto», y Bach lo sabe. La disonancia temporal entre el bajo La y el Sol agudo en el acorde es muy eficaz.",
        seccion: "re-mayor"
    },
    {
        numero: 44,
        titulo: "Variación 44",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var44-copia-1.gif",
        texto: "Más notas repetidas, ahora con la pedal Re, y con una progresión de acordes más activa elaborada a partir de I-V7/IV-IV-V. Las líneas que divergen, convergen y vuelven a divergir en registros muy diferentes son llamativas. El último compás tiene algunas suspensiones notablemente disonantes.",
        seccion: "re-mayor"
    },
    {
        numero: 45,
        titulo: "Variación 45",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var45-copia.gif",
        texto: "Dobles y triples cuerdas en ritmo de chacona. Hay una nueva progresión de acordes: I-V7-V7/vi-vi-V7/IV-IV-V7. En el segundo compás hay una disonancia realmente agradable cuando Re y Mi se pegan entre sí.",
        seccion: "re-mayor"
    },
    {
        numero: 46,
        titulo: "Variación 46",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var46-copia.gif",
        texto: "Los dos primeros compases: un acorde de dos notas, Re y Fa# con un contrapunto móvil debajo. El acorde de dos notas funciona primero como Re, luego como Si menor, luego como Solmaj7 y finalmente como Re mayor nuevamente. Genial. Precioso. ¡No es nada fácil de tocar con la guitarra!",
        seccion: "re-mayor"
    },
    {
        numero: 47,
        titulo: "Variación 47",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var47-copia.gif",
        texto: "Acordes en triples cuerdas, incluido un V7/IV muy jazz, con su séptima en el bajo.",
        seccion: "re-mayor"
    },
    {
        numero: 48,
        titulo: "Variación 48",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var48-copia-1.gif",
        texto: "Unos celestiales acordes de cuádruples cuerdas que le sientan excepcionalmente bien a la guitarra y que suenan casi como rock clásico. La progresión repite el V7/IV con su séptima en el bajo de la variación 47, esta vez resolviéndose en Solmaj7 al colocar Fa# arriba.",
        seccion: "re-mayor"
    },
    {
        numero: 49,
        titulo: "Variación 49",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var49-copia.gif",
        texto: "Más acordes divinos, esta vez formando un magnífico contrapunto ascendente. ¿Cuánto de satisfactorio es esa subida cromática en el bajo de Re/Fa# a Sol a Mi7/Sol# a La? Enormemente satisfactorio. ¡Y además es muy fácil de tocar en la guitarra!",
        seccion: "re-mayor"
    },
    {
        numero: 50,
        titulo: "Variación 50",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var50-copia.gif",
        texto: "Grandes acordes en triples cuerdas con una melodía cromática descendente en la parte superior que suena prácticamente a blues. La segunda mitad tiene la misma línea de bajo cromática ascendente que la variación 49.",
        seccion: "re-mayor"
    },
    {
        numero: 51,
        titulo: "Variación 51",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var51-copia.gif",
        texto: "Para las dos últimas variaciones de la sección de Re mayor, Bach establece un nuevo patrón, un contrapunto repetido de doble cuerda que suena regio con un agradable esquema diatónico al estilo de los Beatles en el bajo.",
        seccion: "re-mayor"
    },
    {
        numero: 52,
        titulo: "Variación 52",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var52-copia.gif",
        texto: "Más contrapunto de doble cuerda, con la armonía cromática más compleja de la sección de Re mayor hasta ahora. Es súper intenso tener todo el contrapunto convergiendo gradualmente hasta que explota en un acorde Mim ampliamente extendido antes de aterrizar en el La7 final que nos lleva de regreso a Re menor para la sección final.",
        seccion: "re-mayor"
    },
    {
        numero: 53,
        titulo: "Variación 53",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var53-copia.gif",
        texto: "De vuelta a casa en Re menor, el ritmo vuelve al patrón de chacona. Los acordes retoman la cadencia andaluza, aunque ahora se viste con un acorde Sibmaj7. Hay algunos enclosures ingeniosos en los patrones parecidos a arpegios.",
        seccion: "re-menor-2"
    },
    {
        numero: 54,
        titulo: "Variación 54",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var54-copia.gif",
        texto: "Sucesión de arpegios y escalas de corcheas y semicorcheas punteadas sobre una compleja abstracción de la cadencia andaluza. Una vez más, Bach conduce de Fa7 a Sibsus inesperadamente.",
        seccion: "re-menor-2"
    },
    {
        numero: 55,
        titulo: "Variación 55",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var55-copia.gif",
        texto: "Un patrón melódico elegante: arpegio ascendente de cuatro notas, giro escalar descendente repetido con una nota de bajo en el medio. Las primeras notas sugieren La7/Re, que es tremendamente moderno. En el tercer compás, Bach enuncia una tríada aumentada Fa.",
        seccion: "re-menor-2"
    },
    {
        numero: 56,
        titulo: "Variación 56",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var56-copia.gif",
        texto: "Cadencia andaluza con dominantes secundarios, creando un agradable círculo jazzístico de movimiento de quintas. La melodía alterna entre ejecuciones de escala y arpegios amplios.",
        seccion: "re-menor-2"
    },
    {
        numero: 57,
        titulo: "Variación 57",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var57-copia.gif",
        texto: "Este es un patrón melódico complicado, sobre cadencia andaluza ligeramente adornada. Pulso de semicorchea adornado con giros de fusas, que se repiten brevemente al final. Los enormes saltos de intervalo hacen que esta variación sea un auténtico hueso para tocar la guitarra.",
        seccion: "re-menor-2"
    },
    {
        numero: 58,
        titulo: "Variación 58",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var58-copia.gif",
        texto: "Esta sección de bariolage majestuosamente intensa comienza sobre una cadencia andaluza sencilla. ¿Es triste esa línea descendente repetida? Bastante, pero no tan triste como la siguiente variación.",
        seccion: "re-menor-2"
    },
    {
        numero: 59,
        titulo: "Variación 59",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var59-copia.gif",
        texto: "Continuamos con el Bariolage. Los acordes siguen siendo una cadencia andaluza estricta, pero la melodía los conecta cromáticamente. Esta variación, junto con la anterior, es lo más hermoso en la historia de la música occidental, en lo que a mí respecta.",
        seccion: "re-menor-2"
    },
    {
        numero: 60,
        titulo: "Variación 60",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var60-copia.gif",
        texto: "El bariolage rompe la cadencia andaluza, con un contrapunto de subida y bajada más complejo. Me llevó una eternidad aprender a tocarlo a la guitarra, y valió la pena.",
        seccion: "re-menor-2"
    },
    {
        numero: 61,
        titulo: "Variación 61",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var61-copia.gif",
        texto: "Tresillos arpegiados en una cadencia andaluza elaborada con contrapunto. Es muy fácil perder la noción de lo que sucede con el ritmo porque los patrones de arpegio no cambian de dirección en las líneas de compás como esperabas. En el tercer compás, Bach implica Sibmaj7 con solo un Re, un Sib y una La, ¡en ese orden!",
        seccion: "re-menor-2"
    },
    {
        numero: 62,
        titulo: "Variación 62",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var62-copia.gif",
        texto: "Tresillos en patrones de fragmentos de escala descendente y arpegios ascendentes en cadencia andaluza. Las notas repetidas le dan a esto una ambigüedad de fraseo súper moderna en el nivel micro. Es más fácil de tocar de lo que parece si conoces sus escalas.",
        seccion: "re-menor-2"
    },
    {
        numero: 63,
        titulo: "Variación 63 (Tema)",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var63-copia.gif",
        texto: "¡Uf! De vuelta a casa. Esto es idéntico a la variación 1, muy parecido a lo que se hace en una melodía de jazz.",
        seccion: "re-menor-2"
    },
    {
        numero: 64,
        titulo: "Variación 64 (Final)",
        imagen: "https://www.deviolines.com/wp-content/uploads/2021/06/var64-copia.gif",
        texto: "Bueno, no es como la vuelta a la melodía, porque esto es completamente diferente a todo lo que ha sucedido hasta ahora. Es una hermosa secuencia de contrapunto de tres voces que desciende a través de progresiones de vi en Sol menor, aterrizando en el riff de final barroco trágico con el arpegio Do#dim7. El Re menor final cierra el círculo, llenando el primer tiempo vacío desde el principio de la pieza.",
        seccion: "re-menor-2"
    }
];
