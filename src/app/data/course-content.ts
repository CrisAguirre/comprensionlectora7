export interface CourseResource {
  type: string;
  title: string;
  url: string;
  phase?: 'inicio' | 'desarrollo' | 'cierre' | 'general';
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  options: string[];
  correctOptionIndex: number;
}

export interface CourseActivity {
  activityId: number;
  unit: 'semantico' | 'sintactico' | 'pragmatico';
  title: string;
  objective: string;
  weakness?: string;
  competency?: string;
  durationMinutes?: number;
  startInstructions: string;
  developmentInstructions: string;
  closureInstructions: string;
  resources: CourseResource[];
  quizQuestions: QuizQuestion[];
}

export interface Course {
  courseId: string;
  title: string;
  description: string;
  grade: string;
  durationWeeks: number;
  passPercentage: number;
  activities: CourseActivity[];
}

const q = (
  id: number,
  prompt: string,
  options: string[],
  correctOptionIndex: number
): QuizQuestion => ({ id, prompt, options, correctOptionIndex });

const SITE = 'https://sites.google.com/view/estrategiapedagogicavictor?usp=sharing';

/** Contenido oficial — PDF «Contenido del Curso en Linea» */
export const CL7_COURSE: Course = {
  courseId: 'cl7-2026',
  title: 'Comprensión Lectora Grado Séptimo',
  description:
    'El curso virtual «Comprensión lectora Grado Séptimo» ha sido diseñado para superar las dificultades del proceso lector de estudiantes de grado séptimo, con el uso de diferentes herramientas digitales. Aprenderán a entender mejor los textos que leen, descubrir su significado más profundo y analizar cómo están escritos y para qué fueron creados, con actividades guiadas y recursos interactivos. El curso está dividido en cuatro unidades (indicadores semántico, sintáctico y pragmático); cada actividad tiene fase inicial, intermedia y final (120 minutos cada una).',
  grade: '7',
  durationWeeks: 4,
  passPercentage: 70,
  activities: [
    {
      activityId: 1,
      unit: 'semantico',
      title: 'Introducción al uso de herramientas de inteligencia artificial',
      weakness:
        'Capacidades para el reconocimiento de elementos explícitos de la lectura y habilidades en competencia tecnológica (herramientas digitales con fines académicos).',
      competency: 'Competencia lectora en el nivel semántico',
      durationMinutes: 120,
      objective:
        'Identificar elementos explícitos de la lectura a través de herramientas digitales como Calameo, herramientas de inteligencia artificial, Pixtón y Genially para el fortalecimiento de las habilidades del indicador semántico.',
      startInstructions: `Los estudiantes realizan la lectura individual y guiada de presentaciones gráficas de Canva y Genially (concepto y herramientas de IA más reconocidas).

Se solicita:
• Usar Chat GPT para crear un prompt que brinde la definición de inteligencia artificial y sus principales funciones.
• Con el texto de Chat GPT, usar una segunda herramienta IA para crear un mapa mental en Mónica IA.`,
      developmentInstructions: `Se presenta la lectura en Calameo «Las Hormigas» y se solicita lectura individual.

A partir de la lectura:
• Identificar 10 palabras clave del texto.
• Elaborar una nube de palabras en WordArt.com (ingresar por Google Sites, opción «CREA CON IA», usar PDF del cuento, elegir forma, generar y descargar la nube).`,
      closureInstructions: `Los estudiantes con su grupo de trabajo responden el cuestionario de evaluación formativa en Genially (alojado en Google Sites).`,
      resources: [
        { type: 'sitio', title: 'Google Sites — Estrategia pedagógica', url: SITE, phase: 'general' },
        { type: 'genially', title: 'Presentación herramientas de IA', url: 'https://view.genially.com/696fb0fddc40bdee09d29216/presentation-herramientas-ia', phase: 'inicio' },
        { type: 'calameo', title: 'Lectura «Las Hormigas»', url: 'https://www.calameo.com/books/007604388d53541762386', phase: 'desarrollo' },
        { type: 'ia', title: 'WordArt.com — nube de palabras', url: 'https://wordart.com', phase: 'desarrollo' },
        { type: 'evaluación', title: 'Evaluación formativa Genially', url: 'https://view.genially.com/6917b08131e2f5f2e006de4c/interactive-content-evaluacion-formativa', phase: 'cierre' }
      ],
      quizQuestions: [
        q(1, 'En la Actividad 1, la lectura central del nivel semántico es:', ['Canto Chocoano', 'Las Hormigas', 'La Guernica', 'Un cuento de terror'], 1),
        q(2, 'Para la definición de IA se solicita usar:', ['Solo Canva', 'Chat GPT con un prompt', 'Solo WordArt', 'Scratch'], 1),
        q(3, 'La nube de palabras se elabora con:', ['Liveworksheets', 'WordArt.com', 'Padlet', 'Pixtón'], 1),
        q(4, 'La evaluación formativa de cierre se realiza en:', ['Mentimeter', 'Genially', 'Actionbound', 'Merge Cube'], 1),
        q(5, 'Esta actividad fortalece el indicador:', ['Pragmático', 'Semántico', 'Solo matemáticas', 'Solo deporte'], 1)
      ]
    },
    {
      activityId: 2,
      unit: 'semantico',
      title: 'Herramientas y Tips para generar prompt',
      weakness:
        'Capacidades para el reconocimiento de elementos explícitos de la lectura y competencia tecnológica en herramientas digitales académicas.',
      competency: 'Competencia lectora en el nivel semántico',
      durationMinutes: 120,
      objective:
        'Identificar elementos explícitos de la lectura mediante el diseño de prompts y herramientas digitales (Canva, Chat GPT) para el indicador semántico.',
      startInstructions: `Lectura de conceptos básicos y características para la creación de un prompt (presentación Canva en Google Sites).

En conjunto con el grupo, responder en el documento editable de Canva:
«¿Cuáles han sido las experiencias más significativas de los estudiantes en el proceso de generación de prompts y qué aprendizajes, retos o estrategias han identificado durante su elaboración?»`,
      developmentInstructions: `Con Chat GPT, crear un prompt que solicite ventajas y desventajas del uso de la inteligencia artificial en los procesos de enseñanza-aprendizaje.

Con los resultados, elaborar una infografía en Canva.`,
      closureInstructions: `Elegir una situación problema del contexto real (académica, tecnológica, ambiental o social).

Diseñar una cadena de 3 prompts para resolverla y mostrar el resultado final en el archivo de Canva editable alojado en Google Sites.`,
      resources: [
        { type: 'sitio', title: 'Google Sites', url: SITE, phase: 'general' },
        { type: 'canva', title: 'Presentación conceptos de Prompt', url: 'https://www.canva.com/design/DAG--Eg9Lso/mhCddOyYGZggp-raJ4afNQ/edit?utm_content=DAG--Eg9Lso&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', phase: 'inicio' },
        { type: 'canva', title: 'Documento editable — reflexión grupal', url: 'https://www.canva.com/design/DAG_hHwGRko/9QMWArEStfXa9kEbVOMIaA/edit?utm_content=DAG_hHwGRko&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', phase: 'inicio' },
        { type: 'canva', title: 'Archivo editable — 3 prompts (entrega final)', url: 'https://www.canva.com/design/DAG-_gWZ8_w/3eaT5Ci-fA7ytgx8qGChAw/edit', phase: 'cierre' }
      ],
      quizQuestions: [
        q(1, 'En la fase intermedia se pide un prompt sobre:', ['Historia del Chocó', 'Ventajas y desventajas de la IA en enseñanza-aprendizaje', 'Solo deportes', 'Solo música'], 1),
        q(2, 'El producto de la fase intermedia se presenta como:', ['Historieta', 'Infografía en Canva', 'Línea de tiempo', 'Juego Scratch'], 1),
        q(3, 'En la fase final se diseña:', ['Una sola pregunta', 'Una cadena de 3 prompts para una situación problema real', 'Solo un mapa mental', 'Solo un PDF'], 1),
        q(4, 'La reflexión grupal inicial se registra en:', ['Padlet', 'Documento editable de Canva', 'Mentimeter', 'Calameo'], 1),
        q(5, 'Esta actividad pertenece al nivel:', ['Sintáctico', 'Semántico', 'Pragmático exclusivo', 'Fonológico'], 1)
      ]
    },
    {
      activityId: 3,
      unit: 'semantico',
      title: 'Creación de fichas interactivas en Liveworksheets',
      weakness:
        'Elementos explícitos de la lectura y competencia tecnológica en herramientas digitales académicas.',
      competency: 'Competencia lectora en el nivel semántico',
      durationMinutes: 120,
      objective:
        'Identificar elementos explícitos mediante el diseño de fichas interactivas evaluables en Liveworksheets.',
      startInstructions: `Visualizar el video instructivo «Cómo crear fichas interactivas en Liveworksheets».

Prestar atención a cómo se dibujan los cuadros de texto y cómo se asignan los comandos básicos.`,
      developmentInstructions: `Analizar la imagen detallada de un computador con sus periféricos.

Redactar 10 afirmaciones de Falso (F) o Verdadero (V).

Acceder a Liveworksheets desde Google Sites, subir el diseño en PDF o imagen, insertar cuadros interactivos, configurar clave de respuestas para autocorrección y descargar el enlace para compartir.`,
      closureInstructions: `Compartir el producto generado por cada grupo.

Generar el enlace (ficha «Pública»), socializar en foro o grupo para que al menos dos compañeros resuelvan la actividad.

En el mural de Padlet, cada grupo responde:
• ¿Qué fue lo más sencillo y lo más complejo de usar Liveworksheets?
• ¿Cómo te sentiste al pasar de ser alumno a ser el «profesor» que diseña la evaluación?`,
      resources: [
        { type: 'sitio', title: 'Google Sites', url: SITE, phase: 'general' },
        { type: 'youtube', title: 'Video: crear fichas en Liveworksheets', url: 'https://youtu.be/MmUpEp9xf_Y', phase: 'inicio' },
        { type: 'liveworksheet', title: 'Liveworksheets', url: 'https://www.liveworksheets.com/es', phase: 'desarrollo' },
        { type: 'padlet', title: 'Mural Padlet — reflexión final', url: 'https://padlet.com/maestriaudes6/en-este-espacio-digital-com-n-cada-grupo-de-estudiantes-debe-a31ohdgi55uhgm5n', phase: 'cierre' }
      ],
      quizQuestions: [
        q(1, 'La ficha interactiva incluye:', ['5 preguntas abiertas', '10 afirmaciones V o F sobre periféricos de computador', 'Solo imágenes', 'Solo audio'], 1),
        q(2, 'La autocorrección se configura con:', ['Clave de respuestas en Liveworksheets', 'Solo WhatsApp', 'Solo correo', 'Sin revisión'], 1),
        q(3, 'El cierre incluye socializar en:', ['Padlet', 'Solo impresión', 'Solo examen escrito', 'QR de realidad aumentada'], 1),
        q(4, 'El video tutorial está en:', ['Pixtón', 'YouTube (Liveworksheets)', 'Netflix', 'Spotify'], 1),
        q(5, 'Al menos cuántos compañeros deben resolver la ficha compartida:', ['Ninguno', 'Dos', 'Veinte', 'Cien'], 1)
      ]
    },
    {
      activityId: 4,
      unit: 'sintactico',
      title: 'Diseño de una presentación interactiva del texto «Canto Chocoano»',
      weakness:
        'Capacidades para el reconocimiento de elementos implícitos de la lectura y competencia tecnológica.',
      competency: 'Competencia lectora en el nivel sintáctico',
      durationMinutes: 120,
      objective:
        'Identificar elementos implícitos de la lectura a través de Canva, Genially, Educaplay y Pixtón para el fortalecimiento del indicador sintáctico.',
      startInstructions: `Lectura en Canva del texto «Canto Chocoano».

Analizar e interpretar la intención del autor, prestando atención a: descripciones del lugar, elementos naturales y culturales, tono narrativo y poético, y mensaje sobre el Chocó y su gente.

Con el grupo, responder la pregunta en el cuestionario de Google Forms.`,
      developmentInstructions: `Diseñar una presentación en Genially con:

• Diapositiva 1 — Portada: «La intención del autor en Canto Chocoano», nombre y grado.
• Diapositiva 2 — Introducción: breve descripción y tipo de texto.
• Diapositiva 3 — Intención del autor (palabras propias).
• Diapositiva 4 — Evidencias: 2 o 3 frases del texto.
• Diapositiva 5 — Opinión personal.
• Diapositiva 6 — Elemento creativo opcional (imágenes, música, animaciones).`,
      closureInstructions: `Realizar el juego de Educaplay para reconocer saberes previos e identificar elementos implícitos de la lectura.`,
      resources: [
        { type: 'sitio', title: 'Google Sites', url: SITE, phase: 'general' },
        { type: 'canva', title: 'Lectura «Canto Chocoano»', url: 'https://www.canva.com/design/DAG6fHfFvAU/QEg-lxcHUSwaYDv0GF325w/edit?utm_content=DAG6fHfFvAU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', phase: 'inicio' },
        { type: 'forms', title: 'Cuestionario Google Forms — intención del autor', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfJ5SZF1z5t_PtS5GeNz9Q0cJh1GY9dL5WBLIVEldgqAiBEYw/viewform?usp=publish-editor', phase: 'inicio' },
        { type: 'genially', title: 'Genially — presentación', url: 'https://view.genially.com/6917b08131e2f5f2e006de4c', phase: 'desarrollo' },
        { type: 'educaplay', title: 'Juego Educaplay — saberes previos', url: 'https://es.educaplay.com/recursos-educativos/27015882-aventura_en_la_selva_preguntas_del_texto.html', phase: 'cierre' }
      ],
      quizQuestions: [
        q(1, 'El texto trabajado en esta unidad es:', ['Las Hormigas', 'Canto Chocoano', 'La Guernica', 'Romeo y Julieta'], 1),
        q(2, 'La presentación interactiva se diseña en:', ['Scratch', 'Genially', 'Solo Word', 'Solo Excel'], 1),
        q(3, 'En la diapositiva de evidencias se incluyen:', ['0 frases', '2 o 3 frases del texto', 'Solo el título', 'Solo imágenes sin texto'], 1),
        q(4, 'El cierre incluye un juego en:', ['Liveworksheets', 'Educaplay', 'Solo correo', 'Solo TikTok'], 1),
        q(5, 'Esta actividad corresponde al indicador:', ['Semántico', 'Sintáctico', 'Solo ortografía', 'Solo fonética'], 1)
      ]
    },
    {
      activityId: 5,
      unit: 'sintactico',
      title: 'Creación de historieta en Pixtón',
      weakness:
        'Elementos implícitos de la lectura y competencia tecnológica en herramientas digitales.',
      competency: 'Competencia lectora en el nivel sintáctico',
      durationMinutes: 120,
      objective:
        'Identificar elementos implícitos reconstruyendo la secuencia narrativa del texto en historieta digital.',
      startInstructions: `Retomar la lectura del Canto Chocoano en el fragmento donde llega el extraño personaje tras la caída del rayo.`,
      developmentInstructions: `Elaborar una historieta en Pixtón de 6 a 10 viñetas con los momentos:

• La vida en el caserío antes del rayo.
• La caída del rayo.
• La llegada del extraño del bote.
• La reacción de niños y adultos.
• Un final libre (inventar qué ocurrió después).

Incluir diálogos, pensamientos, onomatopeyas y generar el enlace de la historieta.`,
      closureInstructions: `Los grupos responden el cuestionario de Google Forms (reflexión) y socializan las respuestas con los compañeros.`,
      resources: [
        { type: 'sitio', title: 'Google Sites', url: SITE, phase: 'general' },
        { type: 'canva', title: 'Canto Chocoano (fragmento)', url: 'https://www.canva.com/design/DAG6fHfFvAU/QEg-lxcHUSwaYDv0GF325w/edit?utm_content=DAG6fHfFvAU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', phase: 'inicio' },
        { type: 'pixton', title: 'Herramienta Pixtón', url: 'https://www.pixton.com/', phase: 'desarrollo' },
        { type: 'forms', title: 'Google Forms — reflexión historieta', url: 'https://docs.google.com/forms/d/e/1FAIpQLScoRJQUgX7p1FBC979XRCYX-Q0ZpBDNC5n-MNywiGwgKDtFMQ/viewform', phase: 'cierre' }
      ],
      quizQuestions: [
        q(1, 'La historieta debe tener entre:', ['1 y 2 viñetas', '6 y 10 viñetas', '50 viñetas obligatorias', 'Sin viñetas'], 1),
        q(2, 'Debe incluir obligatoriamente:', ['Solo color', 'Diálogos, pensamientos y onomatopeyas', 'Solo mapa', 'Solo tabla'], 1),
        q(3, 'Un momento narrativo es:', ['La caída del rayo', 'La invención de internet', 'El viaje a la luna', 'La guerra mundial completa'], 0),
        q(4, 'La herramienta de creación es:', ['Liveworksheets', 'Pixtón', 'WordArt', 'Padlet'], 1),
        q(5, 'La reflexión final se registra en:', ['Google Forms', 'Solo papel sin digital', 'Solo SMS', 'QR AR'], 0)
      ]
    },
    {
      activityId: 6,
      unit: 'pragmatico',
      title: 'Análisis y línea de tiempo del texto «La Guernica»',
      weakness:
        'Elementos implícitos de la lectura y competencia tecnológica en herramientas digitales.',
      competency: 'Competencia lectora en el nivel pragmático',
      durationMinutes: 120,
      objective:
        'Identificar elementos implícitos y contexto histórico del texto y la obra «El Guernica» de Pablo Picasso.',
      startInstructions: `Lectura de un texto relacionado con la pintura del Guernica de Pablo Picasso (guerra y sus consecuencias).

Observar la imagen de «El Guernica», reflexionar sobre personajes, formas y colores en el mural de Padlet.`,
      developmentInstructions: `Organizar la información cronológicamente en cuatro bloques:

• Origen (1937)
• El exilio (1938-1980)
• El retorno (1981)
• Actualidad (1992-presente)

Crear la línea de tiempo en Canva, Genially o Miro (plantillas timeline/infografía).`,
      closureInstructions: `Terminada la línea de tiempo, responder la pregunta de reflexión en el documento de Google editable y socializar con los compañeros.`,
      resources: [
        { type: 'sitio', title: 'Google Sites', url: SITE, phase: 'general' },
        { type: 'padlet', title: 'Mural Padlet — análisis visual Guernica', url: 'https://padlet.com/magisterudes14/juicios-de-valor-s4xk5nhrib0mjjyr', phase: 'inicio' },
        { type: 'drive', title: 'Documento Google editable — reflexión', url: 'https://drive.google.com/file/d/1mFG_yG_iDq4nAoxnCwnncYWife4Uje1z/view', phase: 'cierre' }
      ],
      quizQuestions: [
        q(1, 'La obra analizada es de:', ['Van Gogh', 'Pablo Picasso (El Guernica)', 'Dalí', 'Botero'], 1),
        q(2, 'Un bloque de la línea de tiempo es:', ['Origen (1937)', 'Edad media europea', 'Prehistoria', 'Futuro 3000'], 0),
        q(3, 'Herramientas sugeridas para la línea de tiempo incluyen:', ['Solo lápiz', 'Canva, Genially o Miro', 'Solo TikTok', 'Solo correo'], 1),
        q(4, 'La reflexión inicial grupal puede hacerse en:', ['Padlet', 'Solo examen oral sin recursos', 'Solo impresora', 'QR 3D'], 0),
        q(5, 'Esta actividad trabaja el nivel:', ['Semántico exclusivo', 'Pragmático', 'Solo matemáticas', 'Solo inglés'], 1)
      ]
    },
    {
      activityId: 7,
      unit: 'pragmatico',
      title: 'Juego de preguntas y respuestas con Scratch',
      weakness:
        'Elementos implícitos de la lectura y competencia tecnológica.',
      competency: 'Competencia lectora en el nivel pragmático',
      durationMinutes: 120,
      objective:
        'Identificar elementos implícitos elaborando un juego de preguntas y respuestas sobre la lectura de El Guernica en Scratch.',
      startInstructions: `Basados en la lectura de «El Guernica», familiarizarse con Scratch (aprestamiento):

1. Visualizar el video tutorial del aprestamiento.
2. Elaborar ejercicio de aprestamiento (explorar entorno, cambiar velocidad de peces, etc.).
3. Visualizar video tutorial acuario en Scratch.
4. Generar el link del ejercicio de aprestamiento.`,
      developmentInstructions: `Basarse en la lectura «El Guernica» para crear un juego de preguntas y respuestas interactivo en Scratch:

• Visualizar el video tutorial del juego.
• Elaborar el juego con preguntas y respuestas del sitio de Google Sites.
• Generar el link de Scratch.`,
      closureInstructions: `Cada grupo presenta el juego a sus compañeros explicando funcionamiento, elementos usados e idea principal que los inspiró.`,
      resources: [
        { type: 'sitio', title: 'Google Sites', url: SITE, phase: 'general' },
        { type: 'youtube', title: 'Video aprestamiento Scratch', url: 'https://youtu.be/Jq_1ZwXc58o', phase: 'inicio' },
        { type: 'youtube', title: 'Video juego preguntas Scratch', url: 'https://youtu.be/daSe-VtxthU', phase: 'desarrollo' },
        { type: 'scratch', title: 'Scratch', url: 'https://scratch.mit.edu/', phase: 'desarrollo' }
      ],
      quizQuestions: [
        q(1, 'Antes del juego final se realiza:', ['Solo evaluación escrita', 'Aprestamiento en Scratch', 'Solo lectura sin digital', 'Solo dibujo'], 1),
        q(2, 'El juego debe basarse en la lectura:', ['Las Hormigas', 'El Guernica', 'Canto Chocoano', 'Harry Potter'], 1),
        q(3, 'En la fase final cada grupo debe:', ['Solo entregar PDF', 'Presentar y explicar su juego', 'Borrar el proyecto', 'No compartir'], 1),
        q(4, 'Scratch se usa para:', ['Solo editar fotos', 'Programar un juego de preguntas y respuestas', 'Solo música', 'Solo mapas'], 1),
        q(5, 'Los tutoriales están en:', ['Solo libros impresos', 'YouTube (aprestamiento y juego)', 'Solo radio', 'Solo periódico'], 1)
      ]
    },
    {
      activityId: 8,
      unit: 'pragmatico',
      title: 'Creación de un Storytelling',
      weakness:
        'Elementos implícitos de la lectura y competencia tecnológica.',
      competency: 'Competencia lectora en el nivel pragmático',
      durationMinutes: 120,
      objective:
        'Construir una narración con inicio, nudo y desenlace expresando aprendizajes mediante storytelling digital.',
      startInstructions: `Introducción a Storytelling.

Visualizar el video «Storytelling Definición» e identificar estructura: inicio, nudo y desenlace.

Observar: cómo se engancha a la audiencia, importancia del conflicto (reto del día), resolución y uso de imágenes.`,
      developmentInstructions: `Elegir herramienta digital (Canva, Genially o PowToon).

Elaborar guion de un día en la vida escolar con:
• Introducción — inicio de la jornada.
• Nudo — momento más importante, desafiante o curioso.
• Desenlace — cierre de jornada y enseñanza del día.

Producir el storytelling con la herramienta elegida.`,
      closureInstructions: `Proyectar el producto ante el grupo.

Reflexión digital en Mentimeter (preguntas guía):
• ¿Qué fue lo más difícil de sintetizar tu día en una historia?
• ¿Cómo te ayudó la herramienta digital a expresar tus emociones?
• ¿Qué aprendiste sobre ti mismo al analizar tu rutina escolar?

Código Mentimeter: 46439018`,
      resources: [
        { type: 'sitio', title: 'Google Sites', url: SITE, phase: 'general' },
        { type: 'youtube', title: 'Storytelling — definición', url: 'https://youtu.be/RVSA0VOkgMY', phase: 'inicio' },
        { type: 'mentimeter', title: 'Mentimeter — reflexión final', url: 'https://www.menti.com/alcaxumg8oyh?questionIndex=1', phase: 'cierre' }
      ],
      quizQuestions: [
        q(1, 'La estructura narrativa incluye:', ['Solo conclusión', 'Inicio, nudo y desenlace', 'Solo índice', 'Solo bibliografía'], 1),
        q(2, 'El guion trata sobre:', ['Un viaje espacial ficticio obligatorio', 'Un día en la vida escolar', 'Solo recetas', 'Solo tablas'], 1),
        q(3, 'Herramientas sugeridas incluyen:', ['Solo calculadora', 'Canva, Genially o PowToon', 'Solo Excel', 'Solo bloc'], 1),
        q(4, 'La reflexión final usa:', ['Mentimeter', 'Solo examen físico', 'Solo fax', 'QR AR'], 0),
        q(5, 'El video inicial aborda:', ['Solo matemáticas', 'Definición y estructura de storytelling', 'Solo deportes', 'Solo cocina'], 1)
      ]
    }
  ]
};
