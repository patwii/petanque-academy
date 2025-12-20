import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: "Pétanque Academy",
  description: "Elite player development - From technique to flow",
  ignoreDeadLinks: true,

  // SEO and Site Configuration
  lang: 'en',
  lastUpdated: true,
  cleanUrls: true,

  // Performance optimizations
  vite: {
    build: {
      minify: 'terser',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'mermaid': ['mermaid']
          }
        }
      }
    },
    ssr: {
      noExternal: ['vitepress-plugin-mermaid']
    }
  },

  // Site metadata
  sitemap: {
    hostname: 'https://carreau.app'
  },

  head: [
    // SEO Meta Tags
    ['meta', { name: 'keywords', content: 'pétanque, petanque, boules, elite training, mental game, flow state, sports psychology, competition training, pétanque academy, carreau' }],
    ['meta', { name: 'author', content: 'Patrik Wiik' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],

    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Pétanque Academy' }],
    ['meta', { property: 'og:title', content: 'Pétanque Academy - Elite Player Development' }],
    ['meta', { property: 'og:description', content: 'Master the mental game of pétanque. Comprehensive education platform with 8 modules covering flow states, mental strength, tactics, and elite performance. Available in 10 languages.' }],
    ['meta', { property: 'og:url', content: 'https://carreau.app' }],
    ['meta', { property: 'og:image', content: 'https://carreau.app/img.png' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],

    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Pétanque Academy - Elite Player Development' }],
    ['meta', { name: 'twitter:description', content: 'Master the mental game of pétanque. 8 comprehensive modules, practical tools, and elite training methods.' }],
    ['meta', { name: 'twitter:image', content: 'https://carreau.app/img.png' }],

    // Additional SEO
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],

    // Canonical URL
    ['link', { rel: 'canonical', href: 'https://carreau.app' }],

    // Favicon
    ['link', { rel: 'icon', type: 'image/png', href: '/img.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/img.png' }],

    // Google AdSense Verification Meta Tag
    ['meta', { name: 'google-adsense-account', content: 'ca-pub-2291330857070799' }],

    // Google Analytics
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-JG6034BPGE' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JG6034BPGE');
    `],

    // Google AdSense
    ['script', {
      async: '',
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2291330857070799',
      crossorigin: 'anonymous'
    }]
  ],

  locales: {
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Ambition', link: '/en/ambition' },
          { text: 'News', link: '/en/news/' },
          {
            text: 'Resources',
            items: [
              { text: 'Blog', link: '/en/blog/' },
              { text: 'Case Studies', link: '/en/case-studies' },
              { text: 'Testimonials', link: '/en/testimonials' }
            ]
          },
          {
            text: 'Tools',
            items: [
              { text: 'Workshop', link: '/en/workshop' },
              { text: 'Training Camp', link: '/en/training-camp' },
              { text: 'Training Session', link: '/en/training-session' },
              { text: 'Goal Template', link: '/en/goal-template' },
              { text: 'Diary Template', link: '/en/diary-template' }
            ]
          },
          { text: 'Education', link: '/en/education/' },
          { text: 'Technical Advice', link: '/en/technical/' },
          { text: 'Food', link: '/en/food' },
          { text: 'About', link: '/en/about' }
        ]
      }
    },
    da: {
      label: 'Dansk',
      lang: 'da',
      link: '/da/',
      themeConfig: {
        nav: [
          { text: 'Hjem', link: '/da/' },
          { text: 'Ambition', link: '/da/ambition' },
          { text: 'Nyheder', link: '/da/news/' },
          {
            text: 'Værktøjer',
            items: [
              { text: 'Workshop', link: '/da/workshop' },
              { text: 'Træningslejr', link: '/da/training-camp' },
              { text: 'Træningssession', link: '/da/training-session' },
              { text: 'Målskabelon', link: '/da/goal-template' },
              { text: 'Dagbogsskabelon', link: '/da/diary-template' }
            ]
          },
          { text: 'Uddannelse', link: '/da/education/' },
          { text: 'Teknisk Rådgivning', link: '/da/technical/' },
          { text: 'Mad', link: '/da/food' },
          { text: 'Om', link: '/da/about' }
        ]
      }
    },
    de: {
      label: 'Deutsch',
      lang: 'de',
      link: '/de/',
      themeConfig: {
        nav: [
          { text: 'Startseite', link: '/de/' },
          { text: 'Ambition', link: '/de/ambition' },
          { text: 'Neuigkeiten', link: '/de/news/' },
          {
            text: 'Werkzeuge',
            items: [
              { text: 'Workshop', link: '/de/workshop' },
              { text: 'Trainingslager', link: '/de/training-camp' },
              { text: 'Trainingseinheit', link: '/de/training-session' },
              { text: 'Zielvorlage', link: '/de/goal-template' },
              { text: 'Tagebuchvorlage', link: '/de/diary-template' }
            ]
          },
          { text: 'Bildung', link: '/de/education/' },
          { text: 'Technische Beratung', link: '/de/technical/' },
          { text: 'Ernährung', link: '/de/food' },
          { text: 'Über', link: '/de/about' }
        ]
      }
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/',
      themeConfig: {
        nav: [
          { text: 'Inicio', link: '/es/' },
          { text: 'Ambición', link: '/es/ambition' },
          { text: 'Noticias', link: '/es/news/' },
          {
            text: 'Herramientas',
            items: [
              { text: 'Taller', link: '/es/workshop' },
              { text: 'Campamento de Entrenamiento', link: '/es/training-camp' },
              { text: 'Sesión de Entrenamiento', link: '/es/training-session' },
              { text: 'Plantilla de Objetivos', link: '/es/goal-template' },
              { text: 'Plantilla de Diario', link: '/es/diary-template' }
            ]
          },
          { text: 'Educación', link: '/es/education/' },
          { text: 'Consejo Técnico', link: '/es/technical/' },
          { text: 'Comida', link: '/es/food' },
          { text: 'Acerca de', link: '/es/about' }
        ]
      }
    },
    fr: {
      label: 'Français',
      lang: 'fr',
      link: '/fr/',
      themeConfig: {
        nav: [
          { text: 'Accueil', link: '/fr/' },
          { text: 'Ambition', link: '/fr/ambition' },
          { text: 'Actualités', link: '/fr/news/' },
          {
            text: 'Outils',
            items: [
              { text: 'Atelier', link: '/fr/workshop' },
              { text: 'Stage d\'Entraînement', link: '/fr/training-camp' },
              { text: 'Séance d\'Entraînement', link: '/fr/training-session' },
              { text: 'Modèle d\'Objectifs', link: '/fr/goal-template' },
              { text: 'Modèle de Journal', link: '/fr/diary-template' }
            ]
          },
          { text: 'Éducation', link: '/fr/education/' },
          { text: 'Conseils Techniques', link: '/fr/technical/' },
          { text: 'Alimentation', link: '/fr/food' },
          { text: 'À propos', link: '/fr/about' }
        ]
      }
    },
    it: {
      label: 'Italiano',
      lang: 'it',
      link: '/it/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/it/' },
          { text: 'Ambizione', link: '/it/ambition' },
          { text: 'Notizie', link: '/it/news/' },
          {
            text: 'Strumenti',
            items: [
              { text: 'Workshop', link: '/it/workshop' },
              { text: 'Campo di Allenamento', link: '/it/training-camp' },
              { text: 'Sessione di Allenamento', link: '/it/training-session' },
              { text: 'Modello di Obiettivi', link: '/it/goal-template' },
              { text: 'Modello di Diario', link: '/it/diary-template' }
            ]
          },
          { text: 'Educazione', link: '/it/education/' },
          { text: 'Consigli Tecnici', link: '/it/technical/' },
          { text: 'Cibo', link: '/it/food' },
          { text: 'Chi siamo', link: '/it/about' }
        ]
      }
    },
    nl: {
      label: 'Nederlands',
      lang: 'nl',
      link: '/nl/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/nl/' },
          { text: 'Ambitie', link: '/nl/ambition' },
          { text: 'Nieuws', link: '/nl/news/' },
          {
            text: 'Hulpmiddelen',
            items: [
              { text: 'Workshop', link: '/nl/workshop' },
              { text: 'Trainingskamp', link: '/nl/training-camp' },
              { text: 'Trainingssessie', link: '/nl/training-session' },
              { text: 'Doelsjabloon', link: '/nl/goal-template' },
              { text: 'Dagboeksjabloon', link: '/nl/diary-template' }
            ]
          },
          { text: 'Educatie', link: '/nl/education/' },
          { text: 'Technisch Advies', link: '/nl/technical/' },
          { text: 'Voeding', link: '/nl/food' }
        ]
      }
    },
    no: {
      label: 'Norsk',
      lang: 'no',
      link: '/no/',
      themeConfig: {
        nav: [
          { text: 'Hjem', link: '/no/' },
          { text: 'Ambisjon', link: '/no/ambition' },
          { text: 'Nyheter', link: '/no/news/' },
          {
            text: 'Verktøy',
            items: [
              { text: 'Workshop', link: '/no/workshop' },
              { text: 'Treningsleir', link: '/no/training-camp' },
              { text: 'Treningsøkt', link: '/no/training-session' },
              { text: 'Målmal', link: '/no/goal-template' },
              { text: 'Dagbokmal', link: '/no/diary-template' }
            ]
          },
          { text: 'Utdanning', link: '/no/education/' },
          { text: 'Teknisk Råd', link: '/no/technical/' },
          { text: 'Mat', link: '/no/food' },
          { text: 'Om', link: '/no/about' }
        ]
      }
    },
    pt: {
      label: 'Português',
      lang: 'pt',
      link: '/pt/',
      themeConfig: {
        nav: [
          { text: 'Início', link: '/pt/' },
          { text: 'Ambição', link: '/pt/ambition' },
          { text: 'Notícias', link: '/pt/news/' },
          {
            text: 'Ferramentas',
            items: [
              { text: 'Workshop', link: '/pt/workshop' },
              { text: 'Campo de Treinamento', link: '/pt/training-camp' },
              { text: 'Sessão de Treinamento', link: '/pt/training-session' },
              { text: 'Modelo de Objetivos', link: '/pt/goal-template' },
              { text: 'Modelo de Diário', link: '/pt/diary-template' }
            ]
          },
          { text: 'Educação', link: '/pt/education/' },
          { text: 'Conselho Técnico', link: '/pt/technical/' },
          { text: 'Comida', link: '/pt/food' },
          { text: 'Sobre', link: '/pt/about' }
        ]
      }
    },
    sv: {
      label: 'Svenska',
      lang: 'sv',
      link: '/sv/',
      themeConfig: {
        nav: [
          { text: 'Hem', link: '/sv/' },
          { text: 'Ambition', link: '/sv/ambition' },
          { text: 'Nyheter', link: '/sv/news/' },
          {
            text: 'Verktyg',
            items: [
              { text: 'Workshop', link: '/sv/workshop' },
              { text: 'Träningsläger', link: '/sv/training-camp' },
              { text: 'Träningspass', link: '/sv/training-session' },
              { text: 'Målmall', link: '/sv/goal-template' },
              { text: 'Dagboksmall', link: '/sv/diary-template' }
            ]
          },
          { text: 'Utbildning', link: '/sv/education/' },
          { text: 'Teknisk Rådgivning', link: '/sv/technical/' },
          { text: 'Mat', link: '/sv/food' },
          { text: 'Om', link: '/sv/about' }
        ]
      }
    }
  },

  themeConfig: {
    sidebar: getSidebar()
  },

  // Mermaid configuration
  mermaid: {
    theme: 'base',
    themeVariables: {
      primaryColor: '#3b82f6',
      primaryTextColor: '#fff',
      primaryBorderColor: '#2563eb',
      lineColor: '#64748b',
      secondaryColor: '#8b5cf6',
      tertiaryColor: '#f59e0b',
      background: '#1e293b',
      mainBkg: '#3b82f6',
      secondBkg: '#8b5cf6',
      tertiaryBkg: '#f59e0b',
      textColor: '#fff',
      border1: '#2563eb',
      border2: '#1e40af',
      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
      fontSize: '16px'
    },
    flowchart: {
      htmlLabels: true,
      useMaxWidth: true
    }
  },
  mermaidPlugin: {
    class: "mermaid"
  },

  // Transform head for per-page meta tags and hreflang
  transformHead: ({ pageData }) => {
    const head = []
    const canonicalUrl = `https://carreau.app${pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')}`

    // Add canonical URL for each page
    head.push(['link', { rel: 'canonical', href: canonicalUrl }])

    // Add hreflang tags for multi-language support
    const languages = ['en', 'da', 'de', 'es', 'fr', 'it', 'nl', 'no', 'pt', 'sv']
    const pathWithoutLang = pageData.relativePath.replace(/^(en|da|de|es|fr|it|nl|no|pt|sv)\//, '')

    // Add hreflang for each language
    languages.forEach(lang => {
      const hrefLangUrl = `https://carreau.app/${lang}/${pathWithoutLang.replace(/index\.md$/, '').replace(/\.md$/, '')}`
      head.push(['link', { rel: 'alternate', hreflang: lang, href: hrefLangUrl }])
    })

    // Add x-default hreflang pointing to English
    const defaultUrl = `https://carreau.app/en/${pathWithoutLang.replace(/index\.md$/, '').replace(/\.md$/, '')}`
    head.push(['link', { rel: 'alternate', hreflang: 'x-default', href: defaultUrl }])

    // Add page-specific Open Graph tags
    if (pageData.frontmatter.description) {
      head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }])
      head.push(['meta', { name: 'description', content: pageData.frontmatter.description }])
    }

    if (pageData.title) {
      head.push(['meta', { property: 'og:title', content: `${pageData.title} | Pétanque Academy` }])
    }

    head.push(['meta', { property: 'og:url', content: canonicalUrl }])

    return head
  }
}))

function getSidebar() {
  return {
    // English
    '/en/education/': getEducationSidebar('en', {
      education: 'Education',
      overview: 'Overview',
      theZone: 'The Zone',
      introduction: 'Introduction',
      technicalVsFlow: 'Technical vs Flow Training',
      enteringZone: 'Entering the Zone',
      mindfulness: 'Mindfulness',
      techniques: 'Techniques',
      dailyPractice: 'Daily Practice',
      goalSetting: 'Goal Setting',
      smartGoals: 'SMART Goals',
      planning: 'Planning Your Development',
      mentalStrength: 'Mental Strength',
      handlingPressure: 'Handling Pressure',
      preShotRoutine: 'Pre-Shot Routine',
      teamDynamics: 'Team Dynamics',
      communication: 'Communication',
      tactics: 'Tactics',
      probability: 'Probability-Based Decisions',
      trainingMethods: 'Training Methods',
      trainingDrills: 'Training Drills',
      nutrition: 'Nutrition',
      fuelingPerformance: 'Fueling Performance'
    }),
    '/en/technical/': getTechnicalSidebar('en', {
      technicalAdvice: 'Technical Advice',
      overview: 'Overview',
      paletteOfThrows: 'Palette of Throws'
    }),

    // Danish
    '/da/education/': getEducationSidebar('da', {
      education: 'Uddannelse',
      overview: 'Oversigt',
      theZone: 'Zonen',
      introduction: 'Introduktion',
      technicalVsFlow: 'Teknisk vs Flow Træning',
      enteringZone: 'Komme ind i Zonen',
      mindfulness: 'Mindfulness',
      techniques: 'Teknikker',
      dailyPractice: 'Daglig Praksis',
      goalSetting: 'Målsætning',
      smartGoals: 'SMART Mål',
      planning: 'Planlægning af Din Udvikling',
      mentalStrength: 'Mental Styrke',
      handlingPressure: 'Håndtering af Pres',
      preShotRoutine: 'Før-Kast Rutine',
      teamDynamics: 'Teamdynamik',
      communication: 'Kommunikation',
      tactics: 'Taktik',
      probability: 'Sandsynlighedsbaserede Beslutninger',
      trainingMethods: 'Træningsmetoder',
      trainingDrills: 'Træningsøvelser',
      nutrition: 'Ernæring',
      fuelingPerformance: 'Brændstof til Præstation'
    }),
    '/da/technical/': getTechnicalSidebar('da', {
      technicalAdvice: 'Teknisk Rådgivning',
      overview: 'Oversigt',
      paletteOfThrows: 'Palet af Kast'
    }),

    // German
    '/de/education/': getEducationSidebar('de', {
      education: 'Bildung',
      overview: 'Übersicht',
      theZone: 'Die Zone',
      introduction: 'Einführung',
      technicalVsFlow: 'Technisches vs Flow-Training',
      enteringZone: 'In die Zone Eintreten',
      mindfulness: 'Achtsamkeit',
      techniques: 'Techniken',
      dailyPractice: 'Tägliche Praxis',
      goalSetting: 'Zielsetzung',
      smartGoals: 'SMART Ziele',
      planning: 'Planung Ihrer Entwicklung',
      mentalStrength: 'Mentale Stärke',
      handlingPressure: 'Umgang mit Druck',
      preShotRoutine: 'Vor-Wurf-Routine',
      teamDynamics: 'Teamdynamik',
      communication: 'Kommunikation',
      tactics: 'Taktik',
      probability: 'Wahrscheinlichkeitsbasierte Entscheidungen',
      trainingMethods: 'Trainingsmethoden',
      trainingDrills: 'Trainingsübungen',
      nutrition: 'Ernährung',
      fuelingPerformance: 'Leistung Tanken'
    }),
    '/de/technical/': getTechnicalSidebar('de', {
      technicalAdvice: 'Technische Beratung',
      overview: 'Übersicht',
      paletteOfThrows: 'Palette der Würfe'
    }),

    // Spanish
    '/es/education/': getEducationSidebar('es', {
      education: 'Educación',
      overview: 'Resumen',
      theZone: 'La Zona',
      introduction: 'Introducción',
      technicalVsFlow: 'Entrenamiento Técnico vs Flow',
      enteringZone: 'Entrando en la Zona',
      mindfulness: 'Atención Plena',
      techniques: 'Técnicas',
      dailyPractice: 'Práctica Diaria',
      goalSetting: 'Establecimiento de Objetivos',
      smartGoals: 'Objetivos SMART',
      planning: 'Planificación de Tu Desarrollo',
      mentalStrength: 'Fuerza Mental',
      handlingPressure: 'Manejo de la Presión',
      preShotRoutine: 'Rutina Pre-Lanzamiento',
      teamDynamics: 'Dinámica de Equipo',
      communication: 'Comunicación',
      tactics: 'Táctica',
      probability: 'Decisiones Basadas en Probabilidad',
      trainingMethods: 'Métodos de Entrenamiento',
      trainingDrills: 'Ejercicios de Entrenamiento',
      nutrition: 'Nutrición',
      fuelingPerformance: 'Alimentando el Rendimiento'
    }),
    '/es/technical/': getTechnicalSidebar('es', {
      technicalAdvice: 'Consejo Técnico',
      overview: 'Resumen',
      paletteOfThrows: 'Paleta de Lanzamientos'
    }),

    // French
    '/fr/education/': getEducationSidebar('fr', {
      education: 'Éducation',
      overview: 'Aperçu',
      theZone: 'La Zone',
      introduction: 'Introduction',
      technicalVsFlow: 'Entraînement Technique vs Flow',
      enteringZone: 'Entrer dans la Zone',
      mindfulness: 'Pleine Conscience',
      techniques: 'Techniques',
      dailyPractice: 'Pratique Quotidienne',
      goalSetting: 'Définition des Objectifs',
      smartGoals: 'Objectifs SMART',
      planning: 'Planification de Votre Développement',
      mentalStrength: 'Force Mentale',
      handlingPressure: 'Gérer la Pression',
      preShotRoutine: 'Routine Pré-Lancer',
      teamDynamics: 'Dynamique d\'Équipe',
      communication: 'Communication',
      tactics: 'Tactique',
      probability: 'Décisions Basées sur la Probabilité',
      trainingMethods: 'Méthodes d\'Entraînement',
      trainingDrills: 'Exercices d\'Entraînement',
      nutrition: 'Nutrition',
      fuelingPerformance: 'Alimenter la Performance'
    }),
    '/fr/technical/': getTechnicalSidebar('fr', {
      technicalAdvice: 'Conseils Techniques',
      overview: 'Aperçu',
      paletteOfThrows: 'Palette des Lancers'
    }),

    // Italian
    '/it/education/': getEducationSidebar('it', {
      education: 'Educazione',
      overview: 'Panoramica',
      theZone: 'La Zona',
      introduction: 'Introduzione',
      technicalVsFlow: 'Allenamento Tecnico vs Flow',
      enteringZone: 'Entrare nella Zona',
      mindfulness: 'Consapevolezza',
      techniques: 'Tecniche',
      dailyPractice: 'Pratica Quotidiana',
      goalSetting: 'Definizione degli Obiettivi',
      smartGoals: 'Obiettivi SMART',
      planning: 'Pianificazione del Tuo Sviluppo',
      mentalStrength: 'Forza Mentale',
      handlingPressure: 'Gestione della Pressione',
      preShotRoutine: 'Routine Pre-Lancio',
      teamDynamics: 'Dinamiche di Squadra',
      communication: 'Comunicazione',
      tactics: 'Tattica',
      probability: 'Decisioni Basate sulla Probabilità',
      trainingMethods: 'Metodi di Allenamento',
      trainingDrills: 'Esercizi di Allenamento',
      nutrition: 'Nutrizione',
      fuelingPerformance: 'Alimentare la Performance'
    }),
    '/it/technical/': getTechnicalSidebar('it', {
      technicalAdvice: 'Consigli Tecnici',
      overview: 'Panoramica',
      paletteOfThrows: 'Tavolozza dei Lanci'
    }),

    // Dutch
    '/nl/education/': getEducationSidebar('nl', {
      education: 'Educatie',
      overview: 'Overzicht',
      theZone: 'De Zone',
      introduction: 'Introductie',
      technicalVsFlow: 'Technische vs Flow Training',
      enteringZone: 'De Zone Betreden',
      mindfulness: 'Mindfulness',
      techniques: 'Technieken',
      dailyPractice: 'Dagelijkse Praktijk',
      goalSetting: 'Doelen Stellen',
      smartGoals: 'SMART Doelen',
      planning: 'Planning van Je Ontwikkeling',
      mentalStrength: 'Mentale Kracht',
      handlingPressure: 'Omgaan met Druk',
      preShotRoutine: 'Pre-Worp Routine',
      teamDynamics: 'Teamdynamiek',
      communication: 'Communicatie',
      tactics: 'Tactiek',
      probability: 'Waarschijnlijkheidsgebaseerde Beslissingen',
      trainingMethods: 'Trainingsmethoden',
      trainingDrills: 'Trainingsoefeningen',
      nutrition: 'Voeding',
      fuelingPerformance: 'Prestaties Voeden'
    }),
    '/nl/technical/': getTechnicalSidebar('nl', {
      technicalAdvice: 'Technisch Advies',
      overview: 'Overzicht',
      paletteOfThrows: 'Palet van Worpen'
    }),

    // Norwegian
    '/no/education/': getEducationSidebar('no', {
      education: 'Utdanning',
      overview: 'Oversikt',
      theZone: 'Sonen',
      introduction: 'Introduksjon',
      technicalVsFlow: 'Teknisk vs Flow Trening',
      enteringZone: 'Komme inn i Sonen',
      mindfulness: 'Mindfulness',
      techniques: 'Teknikker',
      dailyPractice: 'Daglig Praksis',
      goalSetting: 'Målsetting',
      smartGoals: 'SMART Mål',
      planning: 'Planlegging av Din Utvikling',
      mentalStrength: 'Mental Styrke',
      handlingPressure: 'Håndtering av Press',
      preShotRoutine: 'Før-Kast Rutine',
      teamDynamics: 'Teamdynamikk',
      communication: 'Kommunikasjon',
      tactics: 'Taktikk',
      probability: 'Sannsynlighetsbaserte Beslutninger',
      trainingMethods: 'Treningsmetoder',
      trainingDrills: 'Treningsøvelser',
      nutrition: 'Ernæring',
      fuelingPerformance: 'Drivstoff for Prestasjon'
    }),
    '/no/technical/': getTechnicalSidebar('no', {
      technicalAdvice: 'Teknisk Råd',
      overview: 'Oversikt',
      paletteOfThrows: 'Palett av Kast'
    }),

    // Portuguese
    '/pt/education/': getEducationSidebar('pt', {
      education: 'Educação',
      overview: 'Visão Geral',
      theZone: 'A Zona',
      introduction: 'Introdução',
      technicalVsFlow: 'Treinamento Técnico vs Flow',
      enteringZone: 'Entrando na Zona',
      mindfulness: 'Atenção Plena',
      techniques: 'Técnicas',
      dailyPractice: 'Prática Diária',
      goalSetting: 'Definição de Objetivos',
      smartGoals: 'Objetivos SMART',
      planning: 'Planejamento do Seu Desenvolvimento',
      mentalStrength: 'Força Mental',
      handlingPressure: 'Lidando com a Pressão',
      preShotRoutine: 'Rotina Pré-Lançamento',
      teamDynamics: 'Dinâmica de Equipe',
      communication: 'Comunicação',
      tactics: 'Tática',
      probability: 'Decisões Baseadas em Probabilidade',
      trainingMethods: 'Métodos de Treinamento',
      trainingDrills: 'Exercícios de Treinamento',
      nutrition: 'Nutrição',
      fuelingPerformance: 'Alimentando o Desempenho'
    }),
    '/pt/technical/': getTechnicalSidebar('pt', {
      technicalAdvice: 'Conselho Técnico',
      overview: 'Visão Geral',
      paletteOfThrows: 'Paleta de Lançamentos'
    }),

    // Swedish
    '/sv/education/': getEducationSidebar('sv', {
      education: 'Utbildning',
      overview: 'Översikt',
      theZone: 'Zonen',
      introduction: 'Introduktion',
      technicalVsFlow: 'Teknisk vs Flow Träning',
      enteringZone: 'Komma in i Zonen',
      mindfulness: 'Mindfulness',
      techniques: 'Tekniker',
      dailyPractice: 'Daglig Praktik',
      goalSetting: 'Målsättning',
      smartGoals: 'SMART Mål',
      planning: 'Planering av Din Utveckling',
      mentalStrength: 'Mental Styrka',
      handlingPressure: 'Hantering av Press',
      preShotRoutine: 'Före-Kast Rutin',
      teamDynamics: 'Teamdynamik',
      communication: 'Kommunikation',
      tactics: 'Taktik',
      probability: 'Sannolikhetsbaserade Beslut',
      trainingMethods: 'Träningsmetoder',
      trainingDrills: 'Träningsövningar',
      nutrition: 'Näring',
      fuelingPerformance: 'Bränsle för Prestanda'
    }),
    '/sv/technical/': getTechnicalSidebar('sv', {
      technicalAdvice: 'Teknisk Rådgivning',
      overview: 'Översikt',
      paletteOfThrows: 'Palett av Kast'
    })
  }
}

function getEducationSidebar(lang: string, labels: any) {
  return [
    {
      text: labels.education,
      items: [
        { text: labels.overview, link: `/${lang}/education/` }
      ]
    },
    {
      text: labels.theZone,
      collapsed: false,
      items: [
        { text: labels.introduction, link: `/${lang}/education/the-zone/` },
        { text: labels.technicalVsFlow, link: `/${lang}/education/the-zone/technical-vs-flow` },
        { text: labels.enteringZone, link: `/${lang}/education/the-zone/entering-the-zone` }
      ]
    },
    {
      text: labels.mindfulness,
      collapsed: false,
      items: [
        { text: labels.introduction, link: `/${lang}/education/mindfulness/` },
        { text: labels.techniques, link: `/${lang}/education/mindfulness/techniques` },
        { text: labels.dailyPractice, link: `/${lang}/education/mindfulness/daily-practice` }
      ]
    },
    {
      text: labels.goalSetting,
      collapsed: false,
      items: [
        { text: labels.introduction, link: `/${lang}/education/goals/` },
        { text: labels.smartGoals, link: `/${lang}/education/goals/smart-goals` },
        { text: labels.planning, link: `/${lang}/education/goals/planning` }
      ]
    },
    {
      text: labels.mentalStrength,
      collapsed: false,
      items: [
        { text: labels.introduction, link: `/${lang}/education/mental-strength/` },
        { text: labels.handlingPressure, link: `/${lang}/education/mental-strength/handling-pressure` },
        { text: labels.preShotRoutine, link: `/${lang}/education/mental-strength/pre-shot-routine` }
      ]
    },
    {
      text: labels.teamDynamics,
      collapsed: false,
      items: [
        { text: labels.introduction, link: `/${lang}/education/team-player/` },
        { text: labels.communication, link: `/${lang}/education/team-player/communication` }
      ]
    },
    {
      text: labels.tactics,
      collapsed: false,
      items: [
        { text: labels.introduction, link: `/${lang}/education/tactics/` },
        { text: labels.probability, link: `/${lang}/education/tactics/probability` }
      ]
    },
    {
      text: labels.trainingMethods,
      collapsed: false,
      items: [
        { text: labels.introduction, link: `/${lang}/education/training/` },
        { text: labels.trainingDrills, link: `/${lang}/education/training/drills` }
      ]
    },
    {
      text: labels.nutrition,
      collapsed: false,
      items: [
        { text: labels.fuelingPerformance, link: `/${lang}/education/nutrition/` }
      ]
    }
  ]
}

function getTechnicalSidebar(lang: string, labels: any) {
  return [
    {
      text: labels.technicalAdvice,
      items: [
        { text: labels.overview, link: `/${lang}/technical/` },
        { text: labels.paletteOfThrows, link: `/${lang}/technical/throws` }
      ]
    }
  ]
}

