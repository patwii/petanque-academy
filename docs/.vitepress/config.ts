import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: "Pétanque Academy",
  description: "Elite player development - From technique to flow",
  ignoreDeadLinks: true,

  // SEO and Site Configuration
  lang: 'en',
  lastUpdated: false,
  cleanUrls: true,

  // Performance optimizations
  vite: {
    server: {
      port: 5173,
      strictPort: false
    },
    build: {
      minify: 'terser',
      cssMinify: true
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

    // Google Analytics
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-JG6034BPGE' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JG6034BPGE');
    `]
  ],

  locales: {
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: '🎯 Assessment', link: '/en/assessment/' },
          { text: 'Ambition', link: '/en/ambition' },
          {
            text: 'Learn',
            items: [
              { text: '📚 Education Hub', link: '/en/education/' },
              {
                text: '🧠 Mental Game (600p)',
                items: [
                  { text: 'Overview', link: '/en/education/mental-game/' },
                  { text: 'The Zone', link: '/en/education/mental-game/the-zone/' },
                  { text: 'Mental Strength', link: '/en/education/mental-game/mental-strength/' },
                  { text: 'Mindfulness', link: '/en/education/mental-game/mindfulness/' }
                ]
              },
              {
                text: '🔥 Motivation (500p)',
                items: [
                  { text: 'Goals & Motivation', link: '/en/education/motivation/' }
                ]
              },
              {
                text: '😴 Sleep (400p)',
                items: [
                  { text: 'Sleep & Recovery', link: '/en/education/sleep/' }
                ]
              },
              {
                text: '🪞 Self-Awareness (400p)',
                items: [
                  { text: 'Self-Awareness', link: '/en/education/self-awareness/' }
                ]
              },
              {
                text: '🥗 Nutrition (300p)',
                items: [
                  { text: 'Fueling Performance', link: '/en/education/nutrition/' }
                ]
              },
              {
                text: '🤝 Team Dynamics (300p)',
                items: [
                  { text: 'Team Player', link: '/en/education/team-dynamics/' }
                ]
              },
              {
                text: '💆 Tension (300p)',
                items: [
                  { text: 'Tension Management', link: '/en/education/tension/' }
                ]
              },
              {
                text: '🎯 Technique (100p)',
                items: [
                  { text: 'Technical Advice', link: '/en/education/technique/' },
                  { text: 'Training Methods', link: '/en/education/technique/training/' },
                  { text: 'Tactics', link: '/en/education/technique/tactics/' }
                ]
              }
            ]
          },
          {
            text: 'Guides',
            items: [
              { text: '📋 All Guides', link: '/en/guides/' },
              { text: '🌱 Mental Journey (Beginners)', link: '/en/guides/mental-journey/' },
              { text: '🎯 Workshop', link: '/en/guides/workshop/' },
              { text: '🏕️ Training Camp', link: '/en/guides/training-camp/' },
              { text: '🔄 Training Session', link: '/en/guides/training-session/' },
              {
                text: '📄 Templates',
                items: [
                  { text: 'Sleep Tracker', link: '/en/guides/templates/sleep-tracker' },
                  { text: 'Pre-Competition Checklist', link: '/en/guides/templates/pre-competition-checklist' },
                  { text: 'Peer Feedback', link: '/en/guides/templates/peer-feedback' },
                  { text: 'Team Agreement', link: '/en/guides/templates/team-agreement' },
                  { text: 'Tension Release Card', link: '/en/guides/templates/tension-quick-card' },
                  { text: 'Nutrition Planner', link: '/en/guides/templates/nutrition-planner' },
                  { text: 'Goal Template', link: '/en/guides/templates/goal-template' },
                  { text: 'Diary Template', link: '/en/guides/templates/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Articles',
            items: [
              { text: '📝 All Articles', link: '/en/articles/' },
              {
                text: '🧠 Mental Game',
                items: [
                  { text: 'Flow State Science', link: '/en/articles/flow-state-science' },
                  { text: 'Inner Critic', link: '/en/articles/inner-critic' },
                  { text: 'Pre-Shot Routines', link: '/en/articles/pre-shot-routines' },
                  { text: 'Pressure Management', link: '/en/articles/pressure-management' },
                  { text: 'Mindfulness in Competition', link: '/en/articles/mindfulness-competition' }
                ]
              },
              {
                text: '🔥 Motivation & Resilience',
                items: [
                  { text: 'Elite Goal Setting', link: '/en/articles/elite-goal-setting' },
                  { text: 'Mental Resilience', link: '/en/articles/mental-resilience' },
                  { text: 'Mental vs Technical', link: '/en/articles/mental-vs-technical' }
                ]
              },
              {
                text: '🤝 Team Dynamics',
                items: [
                  { text: 'Team Communication', link: '/en/articles/team-communication' },
                  { text: 'Team Chemistry', link: '/en/articles/team-chemistry' },
                  { text: 'Team Leadership', link: '/en/articles/team-leadership' }
                ]
              },
              {
                text: '⚡ Performance Factors',
                items: [
                  { text: 'Sleep & Performance', link: '/en/articles/sleep-performance' },
                  { text: 'Nutrition for Competition', link: '/en/articles/nutrition-competition' },
                  { text: 'Self-Awareness', link: '/en/articles/self-awareness-development' },
                  { text: 'Tension & Precision', link: '/en/articles/tension-precision' }
                ]
              },
              {
                text: '🎯 Training',
                items: [
                  { text: 'Mental Training Mistakes', link: '/en/articles/mental-training-mistakes' },
                  { text: 'Practice Structure', link: '/en/articles/practice-structure' },
                  { text: 'Competition Prep', link: '/en/articles/competition-prep' }
                ]
              }
            ]
          },
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
          { text: '🎯 Vurdering', link: '/da/assessment/' },
          { text: 'Ambition', link: '/da/ambition' },
          {
            text: 'Lær',
            items: [
              { text: '📚 Uddannelseshub', link: '/da/education/' },
              {
                text: '🧠 Mentalt Spil (600p)',
                items: [
                  { text: 'Oversigt', link: '/da/education/mental-game/' },
                  { text: 'Zonen', link: '/da/education/mental-game/the-zone/' },
                  { text: 'Mental Styrke', link: '/da/education/mental-game/mental-strength/' },
                  { text: 'Mindfulness', link: '/da/education/mental-game/mindfulness/' }
                ]
              },
              {
                text: '🔥 Motivation (500p)',
                items: [
                  { text: 'Mål & Motivation', link: '/da/education/motivation/' }
                ]
              },
              {
                text: '😴 Søvn (400p)',
                items: [
                  { text: 'Søvn & Restitution', link: '/da/education/sleep/' }
                ]
              },
              {
                text: '🪞 Selvbevidsthed (400p)',
                items: [
                  { text: 'Selvbevidsthed', link: '/da/education/self-awareness/' }
                ]
              },
              {
                text: '🥗 Ernæring (300p)',
                items: [
                  { text: 'Præstationsernæring', link: '/da/education/nutrition/' }
                ]
              },
              {
                text: '🤝 Teamdynamik (300p)',
                items: [
                  { text: 'Holdspiller', link: '/da/education/team-dynamics/' }
                ]
              },
              {
                text: '💆 Spænding (300p)',
                items: [
                  { text: 'Spændingshåndtering', link: '/da/education/tension/' }
                ]
              },
              {
                text: '🎯 Teknik (100p)',
                items: [
                  { text: 'Teknisk Rådgivning', link: '/da/education/technique/' },
                  { text: 'Træningsmetoder', link: '/da/education/technique/training/' },
                  { text: 'Taktik', link: '/da/education/technique/tactics/' }
                ]
              }
            ]
          },
          {
            text: 'Guider',
            items: [
              { text: '📋 Alle Guider', link: '/da/guides/' },
              { text: '🌱 Mental Rejse (Begyndere)', link: '/da/guides/mental-journey/' },
              { text: '🎯 Workshop', link: '/da/guides/workshop/' },
              { text: '🏕️ Træningslejr', link: '/da/guides/training-camp/' },
              { text: '🔄 Træningssession', link: '/da/guides/training-session/' },
              {
                text: '📄 Skabeloner',
                items: [
                  { text: 'Søvnsporing', link: '/da/guides/templates/sleep-tracker' },
                  { text: 'Før-konkurrence Tjekliste', link: '/da/guides/templates/pre-competition-checklist' },
                  { text: 'Peer Feedback', link: '/da/guides/templates/peer-feedback' },
                  { text: 'Holdaftale', link: '/da/guides/templates/team-agreement' },
                  { text: 'Spændingskort', link: '/da/guides/templates/tension-quick-card' },
                  { text: 'Ernæringsplanlægger', link: '/da/guides/templates/nutrition-planner' },
                  { text: 'Målskabelon', link: '/da/guides/templates/goal-template' },
                  { text: 'Dagbogsskabelon', link: '/da/guides/templates/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Artikler',
            items: [
              { text: '📝 Alle Artikler', link: '/da/articles/' },
              {
                text: '🧠 Mentalt Spil',
                items: [
                  { text: 'Flow-tilstandens Videnskab', link: '/da/articles/flow-state-science' },
                  { text: 'Den Indre Kritiker', link: '/da/articles/inner-critic' },
                  { text: 'Pre-Shot Rutiner', link: '/da/articles/pre-shot-routines' },
                  { text: 'Pressehåndtering', link: '/da/articles/pressure-management' },
                  { text: 'Mindfulness i Konkurrence', link: '/da/articles/mindfulness-competition' }
                ]
              },
              {
                text: '🔥 Motivation & Robusthed',
                items: [
                  { text: 'Elite Målsætning', link: '/da/articles/elite-goal-setting' },
                  { text: 'Mental Robusthed', link: '/da/articles/mental-resilience' },
                  { text: 'Mental vs Teknisk', link: '/da/articles/mental-vs-technical' }
                ]
              },
              {
                text: '🤝 Teamdynamik',
                items: [
                  { text: 'Teamkommunikation', link: '/da/articles/team-communication' },
                  { text: 'Teamkemi', link: '/da/articles/team-chemistry' },
                  { text: 'Teamledelse', link: '/da/articles/team-leadership' }
                ]
              },
              {
                text: '⚡ Præstationsfaktorer',
                items: [
                  { text: 'Søvn & Præstation', link: '/da/articles/sleep-performance' },
                  { text: 'Ernæring til Konkurrence', link: '/da/articles/nutrition-competition' },
                  { text: 'Selvbevidsthed', link: '/da/articles/self-awareness-development' },
                  { text: 'Spænding & Præcision', link: '/da/articles/tension-precision' }
                ]
              },
              {
                text: '🎯 Træning',
                items: [
                  { text: 'Mentale Træningsfejl', link: '/da/articles/mental-training-mistakes' },
                  { text: 'Træningsstruktur', link: '/da/articles/practice-structure' },
                  { text: 'Konkurrenceforberedelse', link: '/da/articles/competition-prep' }
                ]
              }
            ]
          },
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
          { text: '🎯 Bewertung', link: '/de/assessment/' },
          { text: 'Ambition', link: '/de/ambition' },
          {
            text: 'Lernen',
            items: [
              { text: '📚 Bildungszentrum', link: '/de/education/' },
              {
                text: '🧠 Mentales Spiel (600p)',
                items: [
                  { text: 'Übersicht', link: '/de/education/mental-game/' },
                  { text: 'Die Zone', link: '/de/education/mental-game/the-zone/' },
                  { text: 'Mentale Stärke', link: '/de/education/mental-game/mental-strength/' },
                  { text: 'Achtsamkeit', link: '/de/education/mental-game/mindfulness/' }
                ]
              },
              {
                text: '🔥 Motivation (500p)',
                items: [
                  { text: 'Ziele & Motivation', link: '/de/education/motivation/' }
                ]
              },
              {
                text: '😴 Schlaf (400p)',
                items: [
                  { text: 'Schlaf & Erholung', link: '/de/education/sleep/' }
                ]
              },
              {
                text: '🪞 Selbstwahrnehmung (400p)',
                items: [
                  { text: 'Selbstwahrnehmung', link: '/de/education/self-awareness/' }
                ]
              },
              {
                text: '🥗 Ernährung (300p)',
                items: [
                  { text: 'Leistungsernährung', link: '/de/education/nutrition/' }
                ]
              },
              {
                text: '🤝 Teamdynamik (300p)',
                items: [
                  { text: 'Teamspieler', link: '/de/education/team-dynamics/' }
                ]
              },
              {
                text: '💆 Spannung (300p)',
                items: [
                  { text: 'Spannungsmanagement', link: '/de/education/tension/' }
                ]
              },
              {
                text: '🎯 Technik (100p)',
                items: [
                  { text: 'Technische Beratung', link: '/de/education/technique/' },
                  { text: 'Trainingsmethoden', link: '/de/education/technique/training/' },
                  { text: 'Taktik', link: '/de/education/technique/tactics/' }
                ]
              }
            ]
          },
          {
            text: 'Anleitungen',
            items: [
              { text: '📋 Alle Anleitungen', link: '/de/guides/' },
              { text: '🌱 Mentale Reise (Anfänger)', link: '/de/guides/mental-journey/' },
              { text: '🎯 Workshop', link: '/de/guides/workshop/' },
              { text: '🏕️ Trainingslager', link: '/de/guides/training-camp/' },
              { text: '🔄 Trainingseinheit', link: '/de/guides/training-session/' },
              {
                text: '📄 Vorlagen',
                items: [
                  { text: 'Schlaf-Tracker', link: '/de/guides/templates/sleep-tracker' },
                  { text: 'Vor-Wettkampf Checkliste', link: '/de/guides/templates/pre-competition-checklist' },
                  { text: 'Peer-Feedback', link: '/de/guides/templates/peer-feedback' },
                  { text: 'Team-Vereinbarung', link: '/de/guides/templates/team-agreement' },
                  { text: 'Spannungskarte', link: '/de/guides/templates/tension-quick-card' },
                  { text: 'Ernährungsplaner', link: '/de/guides/templates/nutrition-planner' },
                  { text: 'Zielvorlage', link: '/de/guides/templates/goal-template' },
                  { text: 'Tagebuchvorlage', link: '/de/guides/templates/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Artikel',
            items: [
              { text: '📝 Alle Artikel', link: '/de/articles/' },
              {
                text: '🧠 Mentales Spiel',
                items: [
                  { text: 'Flow-Zustand Wissenschaft', link: '/de/articles/flow-state-science' },
                  { text: 'Der Innere Kritiker', link: '/de/articles/inner-critic' },
                  { text: 'Pre-Shot Routinen', link: '/de/articles/pre-shot-routines' },
                  { text: 'Druckbewältigung', link: '/de/articles/pressure-management' },
                  { text: 'Achtsamkeit im Wettkampf', link: '/de/articles/mindfulness-competition' }
                ]
              },
              {
                text: '🔥 Motivation & Belastbarkeit',
                items: [
                  { text: 'Elite Zielsetzung', link: '/de/articles/elite-goal-setting' },
                  { text: 'Mentale Belastbarkeit', link: '/de/articles/mental-resilience' },
                  { text: 'Mental vs Technisch', link: '/de/articles/mental-vs-technical' }
                ]
              },
              {
                text: '🤝 Teamdynamik',
                items: [
                  { text: 'Teamkommunikation', link: '/de/articles/team-communication' },
                  { text: 'Teamchemie', link: '/de/articles/team-chemistry' },
                  { text: 'Teamführung', link: '/de/articles/team-leadership' }
                ]
              },
              {
                text: '⚡ Leistungsfaktoren',
                items: [
                  { text: 'Schlaf & Leistung', link: '/de/articles/sleep-performance' },
                  { text: 'Ernährung für Wettkampf', link: '/de/articles/nutrition-competition' },
                  { text: 'Selbstwahrnehmung', link: '/de/articles/self-awareness-development' },
                  { text: 'Spannung & Präzision', link: '/de/articles/tension-precision' }
                ]
              },
              {
                text: '🎯 Training',
                items: [
                  { text: 'Mentale Trainingsfehler', link: '/de/articles/mental-training-mistakes' },
                  { text: 'Trainingsstruktur', link: '/de/articles/practice-structure' },
                  { text: 'Wettkampfvorbereitung', link: '/de/articles/competition-prep' }
                ]
              }
            ]
          },
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
          { text: '🎯 Evaluación', link: '/es/assessment/' },
          { text: 'Ambición', link: '/es/ambition' },
          {
            text: 'Aprender',
            items: [
              { text: '📚 Centro Educativo', link: '/es/education/' },
              {
                text: '🧠 Juego Mental (600p)',
                items: [
                  { text: 'Resumen', link: '/es/education/mental-game/' },
                  { text: 'La Zona', link: '/es/education/mental-game/the-zone/' },
                  { text: 'Fortaleza Mental', link: '/es/education/mental-game/mental-strength/' },
                  { text: 'Mindfulness', link: '/es/education/mental-game/mindfulness/' }
                ]
              },
              {
                text: '🔥 Motivación (500p)',
                items: [
                  { text: 'Metas & Motivación', link: '/es/education/motivation/' }
                ]
              },
              {
                text: '😴 Sueño (400p)',
                items: [
                  { text: 'Sueño & Recuperación', link: '/es/education/sleep/' }
                ]
              },
              {
                text: '🪞 Autoconciencia (400p)',
                items: [
                  { text: 'Autoconciencia', link: '/es/education/self-awareness/' }
                ]
              },
              {
                text: '🥗 Nutrición (300p)',
                items: [
                  { text: 'Nutrición para Rendimiento', link: '/es/education/nutrition/' }
                ]
              },
              {
                text: '🤝 Dinámica de Equipo (300p)',
                items: [
                  { text: 'Jugador de Equipo', link: '/es/education/team-dynamics/' }
                ]
              },
              {
                text: '💆 Tensión (300p)',
                items: [
                  { text: 'Gestión de Tensión', link: '/es/education/tension/' }
                ]
              },
              {
                text: '🎯 Técnica (100p)',
                items: [
                  { text: 'Consejo Técnico', link: '/es/education/technique/' },
                  { text: 'Métodos de Entrenamiento', link: '/es/education/technique/training/' },
                  { text: 'Táctica', link: '/es/education/technique/tactics/' }
                ]
              }
            ]
          },
          {
            text: 'Guías',
            items: [
              { text: '📋 Todas las Guías', link: '/es/guides/' },
              { text: '🌱 Viaje Mental (Principiantes)', link: '/es/guides/mental-journey/' },
              { text: '🎯 Taller', link: '/es/guides/workshop/' },
              { text: '🏕️ Campamento', link: '/es/guides/training-camp/' },
              { text: '🔄 Sesión de Entrenamiento', link: '/es/guides/training-session/' },
              {
                text: '📄 Plantillas',
                items: [
                  { text: 'Registro de Sueño', link: '/es/guides/templates/sleep-tracker' },
                  { text: 'Lista Pre-Competición', link: '/es/guides/templates/pre-competition-checklist' },
                  { text: 'Retroalimentación', link: '/es/guides/templates/peer-feedback' },
                  { text: 'Acuerdo de Equipo', link: '/es/guides/templates/team-agreement' },
                  { text: 'Tarjeta de Tensión', link: '/es/guides/templates/tension-quick-card' },
                  { text: 'Planificador Nutrición', link: '/es/guides/templates/nutrition-planner' },
                  { text: 'Plantilla de Objetivos', link: '/es/guides/templates/goal-template' },
                  { text: 'Plantilla de Diario', link: '/es/guides/templates/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Artículos',
            items: [
              { text: '📝 Todos los Artículos', link: '/es/articles/' },
              {
                text: '🧠 Juego Mental',
                items: [
                  { text: 'Ciencia del Estado Flow', link: '/es/articles/flow-state-science' },
                  { text: 'El Crítico Interior', link: '/es/articles/inner-critic' },
                  { text: 'Rutinas Pre-Tiro', link: '/es/articles/pre-shot-routines' },
                  { text: 'Gestión de Presión', link: '/es/articles/pressure-management' },
                  { text: 'Mindfulness en Competición', link: '/es/articles/mindfulness-competition' }
                ]
              },
              {
                text: '🔥 Motivación & Resiliencia',
                items: [
                  { text: 'Establecimiento de Metas Elite', link: '/es/articles/elite-goal-setting' },
                  { text: 'Resiliencia Mental', link: '/es/articles/mental-resilience' },
                  { text: 'Mental vs Técnico', link: '/es/articles/mental-vs-technical' }
                ]
              },
              {
                text: '🤝 Dinámica de Equipo',
                items: [
                  { text: 'Comunicación de Equipo', link: '/es/articles/team-communication' },
                  { text: 'Química de Equipo', link: '/es/articles/team-chemistry' },
                  { text: 'Liderazgo de Equipo', link: '/es/articles/team-leadership' }
                ]
              },
              {
                text: '⚡ Factores de Rendimiento',
                items: [
                  { text: 'Sueño & Rendimiento', link: '/es/articles/sleep-performance' },
                  { text: 'Nutrición para Competición', link: '/es/articles/nutrition-competition' },
                  { text: 'Autoconciencia', link: '/es/articles/self-awareness-development' },
                  { text: 'Tensión & Precisión', link: '/es/articles/tension-precision' }
                ]
              },
              {
                text: '🎯 Entrenamiento',
                items: [
                  { text: 'Errores de Entrenamiento Mental', link: '/es/articles/mental-training-mistakes' },
                  { text: 'Estructura de Práctica', link: '/es/articles/practice-structure' },
                  { text: 'Preparación para Competición', link: '/es/articles/competition-prep' }
                ]
              }
            ]
          },
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
          { text: '🎯 Évaluation', link: '/fr/assessment/' },
          { text: 'Ambition', link: '/fr/ambition' },
          {
            text: 'Apprendre',
            items: [
              { text: '📚 Centre Éducatif', link: '/fr/education/' },
              {
                text: '🧠 Jeu Mental (600p)',
                items: [
                  { text: 'Aperçu', link: '/fr/education/mental-game/' },
                  { text: 'La Zone', link: '/fr/education/mental-game/the-zone/' },
                  { text: 'Force Mentale', link: '/fr/education/mental-game/mental-strength/' },
                  { text: 'Pleine Conscience', link: '/fr/education/mental-game/mindfulness/' }
                ]
              },
              {
                text: '🔥 Motivation (500p)',
                items: [
                  { text: 'Objectifs & Motivation', link: '/fr/education/motivation/' }
                ]
              },
              {
                text: '😴 Sommeil (400p)',
                items: [
                  { text: 'Sommeil & Récupération', link: '/fr/education/sleep/' }
                ]
              },
              {
                text: '🪞 Conscience de Soi (400p)',
                items: [
                  { text: 'Conscience de Soi', link: '/fr/education/self-awareness/' }
                ]
              },
              {
                text: '🥗 Nutrition (300p)',
                items: [
                  { text: 'Nutrition Performance', link: '/fr/education/nutrition/' }
                ]
              },
              {
                text: '🤝 Dynamique d\'Équipe (300p)',
                items: [
                  { text: 'Joueur d\'Équipe', link: '/fr/education/team-dynamics/' }
                ]
              },
              {
                text: '💆 Tension (300p)',
                items: [
                  { text: 'Gestion de la Tension', link: '/fr/education/tension/' }
                ]
              },
              {
                text: '🎯 Technique (100p)',
                items: [
                  { text: 'Conseils Techniques', link: '/fr/education/technique/' },
                  { text: 'Méthodes d\'Entraînement', link: '/fr/education/technique/training/' },
                  { text: 'Tactique', link: '/fr/education/technique/tactics/' }
                ]
              }
            ]
          },
          {
            text: 'Guides',
            items: [
              { text: '📋 Tous les Guides', link: '/fr/guides/' },
              { text: '🌱 Parcours Mental (Débutants)', link: '/fr/guides/mental-journey/' },
              { text: '🎯 Atelier', link: '/fr/guides/workshop/' },
              { text: '🏕️ Stage', link: '/fr/guides/training-camp/' },
              { text: '🔄 Séance d\'Entraînement', link: '/fr/guides/training-session/' },
              {
                text: '📄 Modèles',
                items: [
                  { text: 'Suivi du Sommeil', link: '/fr/guides/templates/sleep-tracker' },
                  { text: 'Liste Pré-Compétition', link: '/fr/guides/templates/pre-competition-checklist' },
                  { text: 'Feedback entre Pairs', link: '/fr/guides/templates/peer-feedback' },
                  { text: 'Accord d\'Équipe', link: '/fr/guides/templates/team-agreement' },
                  { text: 'Carte de Tension', link: '/fr/guides/templates/tension-quick-card' },
                  { text: 'Planificateur Nutrition', link: '/fr/guides/templates/nutrition-planner' },
                  { text: 'Modèle d\'Objectifs', link: '/fr/guides/templates/goal-template' },
                  { text: 'Modèle de Journal', link: '/fr/guides/templates/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Articles',
            items: [
              { text: '📝 Tous les Articles', link: '/fr/articles/' },
              {
                text: '🧠 Jeu Mental',
                items: [
                  { text: 'Science de l\'État Flow', link: '/fr/articles/flow-state-science' },
                  { text: 'Le Critique Intérieur', link: '/fr/articles/inner-critic' },
                  { text: 'Routines Pré-Tir', link: '/fr/articles/pre-shot-routines' },
                  { text: 'Gestion de la Pression', link: '/fr/articles/pressure-management' },
                  { text: 'Pleine Conscience en Compétition', link: '/fr/articles/mindfulness-competition' }
                ]
              },
              {
                text: '🔥 Motivation & Résilience',
                items: [
                  { text: 'Définition d\'Objectifs Elite', link: '/fr/articles/elite-goal-setting' },
                  { text: 'Résilience Mentale', link: '/fr/articles/mental-resilience' },
                  { text: 'Mental vs Technique', link: '/fr/articles/mental-vs-technical' }
                ]
              },
              {
                text: '🤝 Dynamique d\'Équipe',
                items: [
                  { text: 'Communication d\'Équipe', link: '/fr/articles/team-communication' },
                  { text: 'Chimie d\'Équipe', link: '/fr/articles/team-chemistry' },
                  { text: 'Leadership d\'Équipe', link: '/fr/articles/team-leadership' }
                ]
              },
              {
                text: '⚡ Facteurs de Performance',
                items: [
                  { text: 'Sommeil & Performance', link: '/fr/articles/sleep-performance' },
                  { text: 'Nutrition pour Compétition', link: '/fr/articles/nutrition-competition' },
                  { text: 'Conscience de Soi', link: '/fr/articles/self-awareness-development' },
                  { text: 'Tension & Précision', link: '/fr/articles/tension-precision' }
                ]
              },
              {
                text: '🎯 Entraînement',
                items: [
                  { text: 'Erreurs d\'Entraînement Mental', link: '/fr/articles/mental-training-mistakes' },
                  { text: 'Structure de Pratique', link: '/fr/articles/practice-structure' },
                  { text: 'Préparation Compétition', link: '/fr/articles/competition-prep' }
                ]
              }
            ]
          },
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
          { text: '🎯 Valutazione', link: '/it/assessment/' },
          { text: 'Ambizione', link: '/it/ambition' },
          {
            text: 'Imparare',
            items: [
              { text: '📚 Centro Educativo', link: '/it/education/' },
              {
                text: '🧠 Gioco Mentale (600p)',
                items: [
                  { text: 'Panoramica', link: '/it/education/mental-game/' },
                  { text: 'La Zona', link: '/it/education/mental-game/the-zone/' },
                  { text: 'Forza Mentale', link: '/it/education/mental-game/mental-strength/' },
                  { text: 'Mindfulness', link: '/it/education/mental-game/mindfulness/' }
                ]
              },
              {
                text: '🔥 Motivazione (500p)',
                items: [
                  { text: 'Obiettivi & Motivazione', link: '/it/education/motivation/' }
                ]
              },
              {
                text: '😴 Sonno (400p)',
                items: [
                  { text: 'Sonno & Recupero', link: '/it/education/sleep/' }
                ]
              },
              {
                text: '🪞 Autoconsapevolezza (400p)',
                items: [
                  { text: 'Autoconsapevolezza', link: '/it/education/self-awareness/' }
                ]
              },
              {
                text: '🥗 Nutrizione (300p)',
                items: [
                  { text: 'Nutrizione per la Performance', link: '/it/education/nutrition/' }
                ]
              },
              {
                text: '🤝 Dinamiche di Squadra (300p)',
                items: [
                  { text: 'Giocatore di Squadra', link: '/it/education/team-dynamics/' }
                ]
              },
              {
                text: '💆 Tensione (300p)',
                items: [
                  { text: 'Gestione della Tensione', link: '/it/education/tension/' }
                ]
              },
              {
                text: '🎯 Tecnica (100p)',
                items: [
                  { text: 'Consigli Tecnici', link: '/it/education/technique/' },
                  { text: 'Metodi di Allenamento', link: '/it/education/technique/training/' },
                  { text: 'Tattica', link: '/it/education/technique/tactics/' }
                ]
              }
            ]
          },
          {
            text: 'Guide',
            items: [
              { text: '📋 Tutte le Guide', link: '/it/guides/' },
              { text: '🌱 Percorso Mentale (Principianti)', link: '/it/guides/mental-journey/' },
              { text: '🎯 Workshop', link: '/it/guides/workshop/' },
              { text: '🏕️ Campo di Allenamento', link: '/it/guides/training-camp/' },
              { text: '🔄 Sessione di Allenamento', link: '/it/guides/training-session/' },
              {
                text: '📄 Modelli',
                items: [
                  { text: 'Monitoraggio Sonno', link: '/it/guides/templates/sleep-tracker' },
                  { text: 'Checklist Pre-Gara', link: '/it/guides/templates/pre-competition-checklist' },
                  { text: 'Feedback tra Pari', link: '/it/guides/templates/peer-feedback' },
                  { text: 'Accordo di Squadra', link: '/it/guides/templates/team-agreement' },
                  { text: 'Scheda Tensione', link: '/it/guides/templates/tension-quick-card' },
                  { text: 'Pianificatore Nutrizione', link: '/it/guides/templates/nutrition-planner' },
                  { text: 'Modello di Obiettivi', link: '/it/guides/templates/goal-template' },
                  { text: 'Modello di Diario', link: '/it/guides/templates/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Articoli',
            items: [
              { text: '📝 Tutti gli Articoli', link: '/it/articles/' },
              {
                text: '🧠 Gioco Mentale',
                items: [
                  { text: 'Scienza dello Stato Flow', link: '/it/articles/flow-state-science' },
                  { text: 'Il Critico Interiore', link: '/it/articles/inner-critic' },
                  { text: 'Routine Pre-Tiro', link: '/it/articles/pre-shot-routines' },
                  { text: 'Gestione della Pressione', link: '/it/articles/pressure-management' },
                  { text: 'Mindfulness in Gara', link: '/it/articles/mindfulness-competition' }
                ]
              },
              {
                text: '🔥 Motivazione & Resilienza',
                items: [
                  { text: 'Definizione Obiettivi Elite', link: '/it/articles/elite-goal-setting' },
                  { text: 'Resilienza Mentale', link: '/it/articles/mental-resilience' },
                  { text: 'Mentale vs Tecnico', link: '/it/articles/mental-vs-technical' }
                ]
              },
              {
                text: '🤝 Dinamiche di Squadra',
                items: [
                  { text: 'Comunicazione di Squadra', link: '/it/articles/team-communication' },
                  { text: 'Chimica di Squadra', link: '/it/articles/team-chemistry' },
                  { text: 'Leadership di Squadra', link: '/it/articles/team-leadership' }
                ]
              },
              {
                text: '⚡ Fattori di Performance',
                items: [
                  { text: 'Sonno & Performance', link: '/it/articles/sleep-performance' },
                  { text: 'Nutrizione per Gara', link: '/it/articles/nutrition-competition' },
                  { text: 'Autoconsapevolezza', link: '/it/articles/self-awareness-development' },
                  { text: 'Tensione & Precisione', link: '/it/articles/tension-precision' }
                ]
              },
              {
                text: '🎯 Allenamento',
                items: [
                  { text: 'Errori Allenamento Mentale', link: '/it/articles/mental-training-mistakes' },
                  { text: 'Struttura della Pratica', link: '/it/articles/practice-structure' },
                  { text: 'Preparazione alla Gara', link: '/it/articles/competition-prep' }
                ]
              }
            ]
          },
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
          { text: '🎯 Beoordeling', link: '/nl/assessment/' },
          { text: 'Ambitie', link: '/nl/ambition' },
          {
            text: 'Leren',
            items: [
              { text: '📚 Educatief Centrum', link: '/nl/education/' },
              {
                text: '🧠 Mentaal Spel (600p)',
                items: [
                  { text: 'Overzicht', link: '/nl/education/mental-game/' },
                  { text: 'De Zone', link: '/nl/education/mental-game/the-zone/' },
                  { text: 'Mentale Kracht', link: '/nl/education/mental-game/mental-strength/' },
                  { text: 'Mindfulness', link: '/nl/education/mental-game/mindfulness/' }
                ]
              },
              {
                text: '🔥 Motivatie (500p)',
                items: [
                  { text: 'Doelen & Motivatie', link: '/nl/education/motivation/' }
                ]
              },
              {
                text: '😴 Slaap (400p)',
                items: [
                  { text: 'Slaap & Herstel', link: '/nl/education/sleep/' }
                ]
              },
              {
                text: '🪞 Zelfbewustzijn (400p)',
                items: [
                  { text: 'Zelfbewustzijn', link: '/nl/education/self-awareness/' }
                ]
              },
              {
                text: '🥗 Voeding (300p)',
                items: [
                  { text: 'Prestatievoeding', link: '/nl/education/nutrition/' }
                ]
              },
              {
                text: '🤝 Teamdynamiek (300p)',
                items: [
                  { text: 'Teamspeler', link: '/nl/education/team-dynamics/' }
                ]
              },
              {
                text: '💆 Spanning (300p)',
                items: [
                  { text: 'Spanningsbeheer', link: '/nl/education/tension/' }
                ]
              },
              {
                text: '🎯 Techniek (100p)',
                items: [
                  { text: 'Technisch Advies', link: '/nl/education/technique/' },
                  { text: 'Trainingsmethoden', link: '/nl/education/technique/training/' },
                  { text: 'Tactiek', link: '/nl/education/technique/tactics/' }
                ]
              }
            ]
          },
          {
            text: 'Gidsen',
            items: [
              { text: '📋 Alle Gidsen', link: '/nl/guides/' },
              { text: '🌱 Mentale Reis (Beginners)', link: '/nl/guides/mental-journey/' },
              { text: '🎯 Workshop', link: '/nl/guides/workshop/' },
              { text: '🏕️ Trainingskamp', link: '/nl/guides/training-camp/' },
              { text: '🔄 Trainingssessie', link: '/nl/guides/training-session/' },
              {
                text: '📄 Sjablonen',
                items: [
                  { text: 'Slaaptracker', link: '/nl/guides/templates/sleep-tracker' },
                  { text: 'Pre-Wedstrijd Checklist', link: '/nl/guides/templates/pre-competition-checklist' },
                  { text: 'Peer Feedback', link: '/nl/guides/templates/peer-feedback' },
                  { text: 'Teamovereenkomst', link: '/nl/guides/templates/team-agreement' },
                  { text: 'Spanningskaart', link: '/nl/guides/templates/tension-quick-card' },
                  { text: 'Voedingsplanner', link: '/nl/guides/templates/nutrition-planner' },
                  { text: 'Doelsjabloon', link: '/nl/guides/templates/goal-template' },
                  { text: 'Dagboeksjabloon', link: '/nl/guides/templates/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Artikelen',
            items: [
              { text: '📝 Alle Artikelen', link: '/nl/articles/' },
              {
                text: '🧠 Mentaal Spel',
                items: [
                  { text: 'Flow State Wetenschap', link: '/nl/articles/flow-state-science' },
                  { text: 'De Innerlijke Criticus', link: '/nl/articles/inner-critic' },
                  { text: 'Pre-Shot Routines', link: '/nl/articles/pre-shot-routines' },
                  { text: 'Drukbeheer', link: '/nl/articles/pressure-management' },
                  { text: 'Mindfulness in Wedstrijd', link: '/nl/articles/mindfulness-competition' }
                ]
              },
              {
                text: '🔥 Motivatie & Veerkracht',
                items: [
                  { text: 'Elite Doelen Stellen', link: '/nl/articles/elite-goal-setting' },
                  { text: 'Mentale Veerkracht', link: '/nl/articles/mental-resilience' },
                  { text: 'Mentaal vs Technisch', link: '/nl/articles/mental-vs-technical' }
                ]
              },
              {
                text: '🤝 Teamdynamiek',
                items: [
                  { text: 'Teamcommunicatie', link: '/nl/articles/team-communication' },
                  { text: 'Teamchemie', link: '/nl/articles/team-chemistry' },
                  { text: 'Teamleiderschap', link: '/nl/articles/team-leadership' }
                ]
              },
              {
                text: '⚡ Prestatiefactoren',
                items: [
                  { text: 'Slaap & Prestatie', link: '/nl/articles/sleep-performance' },
                  { text: 'Voeding voor Wedstrijd', link: '/nl/articles/nutrition-competition' },
                  { text: 'Zelfbewustzijn', link: '/nl/articles/self-awareness-development' },
                  { text: 'Spanning & Precisie', link: '/nl/articles/tension-precision' }
                ]
              },
              {
                text: '🎯 Training',
                items: [
                  { text: 'Mentale Trainingsfouten', link: '/nl/articles/mental-training-mistakes' },
                  { text: 'Trainingsstructuur', link: '/nl/articles/practice-structure' },
                  { text: 'Wedstrijdvoorbereiding', link: '/nl/articles/competition-prep' }
                ]
              }
            ]
          },
          { text: 'Over', link: '/nl/about' }
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
          { text: '🎯 Vurdering', link: '/no/assessment/' },
          { text: 'Ambisjon', link: '/no/ambition' },
          {
            text: 'Lære',
            items: [
              { text: '📚 Utdanningssenter', link: '/no/education/' },
              {
                text: '🧠 Mentalt Spill (600p)',
                items: [
                  { text: 'Oversikt', link: '/no/education/mental-game/' },
                  { text: 'Sonen', link: '/no/education/mental-game/the-zone/' },
                  { text: 'Mental Styrke', link: '/no/education/mental-game/mental-strength/' },
                  { text: 'Mindfulness', link: '/no/education/mental-game/mindfulness/' }
                ]
              },
              {
                text: '🔥 Motivasjon (500p)',
                items: [
                  { text: 'Mål & Motivasjon', link: '/no/education/motivation/' }
                ]
              },
              {
                text: '😴 Søvn (400p)',
                items: [
                  { text: 'Søvn & Restitusjon', link: '/no/education/sleep/' }
                ]
              },
              {
                text: '🪞 Selvbevissthet (400p)',
                items: [
                  { text: 'Selvbevissthet', link: '/no/education/self-awareness/' }
                ]
              },
              {
                text: '🥗 Ernæring (300p)',
                items: [
                  { text: 'Prestasjonsernæring', link: '/no/education/nutrition/' }
                ]
              },
              {
                text: '🤝 Teamdynamikk (300p)',
                items: [
                  { text: 'Lagspiller', link: '/no/education/team-dynamics/' }
                ]
              },
              {
                text: '💆 Spenning (300p)',
                items: [
                  { text: 'Spenningshåndtering', link: '/no/education/tension/' }
                ]
              },
              {
                text: '🎯 Teknikk (100p)',
                items: [
                  { text: 'Teknisk Råd', link: '/no/education/technique/' },
                  { text: 'Treningsmetoder', link: '/no/education/technique/training/' },
                  { text: 'Taktikk', link: '/no/education/technique/tactics/' }
                ]
              }
            ]
          },
          {
            text: 'Guider',
            items: [
              { text: '📋 Alle Guider', link: '/no/guides/' },
              { text: '🌱 Mental Reise (Nybegynnere)', link: '/no/guides/mental-journey/' },
              { text: '🎯 Workshop', link: '/no/guides/workshop/' },
              { text: '🏕️ Treningsleir', link: '/no/guides/training-camp/' },
              { text: '🔄 Treningsøkt', link: '/no/guides/training-session/' },
              {
                text: '📄 Maler',
                items: [
                  { text: 'Søvnsporing', link: '/no/guides/templates/sleep-tracker' },
                  { text: 'Før-konkurranse Sjekkliste', link: '/no/guides/templates/pre-competition-checklist' },
                  { text: 'Tilbakemelding', link: '/no/guides/templates/peer-feedback' },
                  { text: 'Lagavtale', link: '/no/guides/templates/team-agreement' },
                  { text: 'Spenningskort', link: '/no/guides/templates/tension-quick-card' },
                  { text: 'Ernæringsplanlegger', link: '/no/guides/templates/nutrition-planner' },
                  { text: 'Målmal', link: '/no/guides/templates/goal-template' },
                  { text: 'Dagbokmal', link: '/no/guides/templates/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Artikler',
            items: [
              { text: '📝 Alle Artikler', link: '/no/articles/' },
              {
                text: '🧠 Mentalt Spill',
                items: [
                  { text: 'Flow-tilstandens Vitenskap', link: '/no/articles/flow-state-science' },
                  { text: 'Den Indre Kritikeren', link: '/no/articles/inner-critic' },
                  { text: 'Pre-Shot Rutiner', link: '/no/articles/pre-shot-routines' },
                  { text: 'Presshåndtering', link: '/no/articles/pressure-management' },
                  { text: 'Mindfulness i Konkurranse', link: '/no/articles/mindfulness-competition' }
                ]
              },
              {
                text: '🔥 Motivasjon & Utholdenhet',
                items: [
                  { text: 'Elite Målsetting', link: '/no/articles/elite-goal-setting' },
                  { text: 'Mental Utholdenhet', link: '/no/articles/mental-resilience' },
                  { text: 'Mentalt vs Teknisk', link: '/no/articles/mental-vs-technical' }
                ]
              },
              {
                text: '🤝 Teamdynamikk',
                items: [
                  { text: 'Lagkommunikasjon', link: '/no/articles/team-communication' },
                  { text: 'Lagkjemi', link: '/no/articles/team-chemistry' },
                  { text: 'Laglederskap', link: '/no/articles/team-leadership' }
                ]
              },
              {
                text: '⚡ Prestasjonsfaktorer',
                items: [
                  { text: 'Søvn & Prestasjon', link: '/no/articles/sleep-performance' },
                  { text: 'Ernæring for Konkurranse', link: '/no/articles/nutrition-competition' },
                  { text: 'Selvbevissthet', link: '/no/articles/self-awareness-development' },
                  { text: 'Spenning & Presisjon', link: '/no/articles/tension-precision' }
                ]
              },
              {
                text: '🎯 Trening',
                items: [
                  { text: 'Mentale Treningsfeil', link: '/no/articles/mental-training-mistakes' },
                  { text: 'Treningsstruktur', link: '/no/articles/practice-structure' },
                  { text: 'Konkurranseforberedelse', link: '/no/articles/competition-prep' }
                ]
              }
            ]
          },
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
          { text: '🎯 Avaliação', link: '/pt/assessment/' },
          { text: 'Ambição', link: '/pt/ambition' },
          {
            text: 'Aprender',
            items: [
              { text: '📚 Centro Educacional', link: '/pt/education/' },
              {
                text: '🧠 Jogo Mental (600p)',
                items: [
                  { text: 'Visão Geral', link: '/pt/education/mental-game/' },
                  { text: 'A Zona', link: '/pt/education/mental-game/the-zone/' },
                  { text: 'Força Mental', link: '/pt/education/mental-game/mental-strength/' },
                  { text: 'Mindfulness', link: '/pt/education/mental-game/mindfulness/' }
                ]
              },
              {
                text: '🔥 Motivação (500p)',
                items: [
                  { text: 'Metas & Motivação', link: '/pt/education/motivation/' }
                ]
              },
              {
                text: '😴 Sono (400p)',
                items: [
                  { text: 'Sono & Recuperação', link: '/pt/education/sleep/' }
                ]
              },
              {
                text: '🪞 Autoconsciência (400p)',
                items: [
                  { text: 'Autoconsciência', link: '/pt/education/self-awareness/' }
                ]
              },
              {
                text: '🥗 Nutrição (300p)',
                items: [
                  { text: 'Nutrição de Performance', link: '/pt/education/nutrition/' }
                ]
              },
              {
                text: '🤝 Dinâmica de Equipe (300p)',
                items: [
                  { text: 'Jogador de Equipe', link: '/pt/education/team-dynamics/' }
                ]
              },
              {
                text: '💆 Tensão (300p)',
                items: [
                  { text: 'Gestão de Tensão', link: '/pt/education/tension/' }
                ]
              },
              {
                text: '🎯 Técnica (100p)',
                items: [
                  { text: 'Conselho Técnico', link: '/pt/education/technique/' },
                  { text: 'Métodos de Treinamento', link: '/pt/education/technique/training/' },
                  { text: 'Tática', link: '/pt/education/technique/tactics/' }
                ]
              }
            ]
          },
          {
            text: 'Guias',
            items: [
              { text: '📋 Todos os Guias', link: '/pt/guides/' },
              { text: '🌱 Jornada Mental (Iniciantes)', link: '/pt/guides/mental-journey/' },
              { text: '🎯 Workshop', link: '/pt/guides/workshop/' },
              { text: '🏕️ Campo de Treinamento', link: '/pt/guides/training-camp/' },
              { text: '🔄 Sessão de Treinamento', link: '/pt/guides/training-session/' },
              {
                text: '📄 Modelos',
                items: [
                  { text: 'Rastreador de Sono', link: '/pt/guides/templates/sleep-tracker' },
                  { text: 'Checklist Pré-Competição', link: '/pt/guides/templates/pre-competition-checklist' },
                  { text: 'Feedback entre Pares', link: '/pt/guides/templates/peer-feedback' },
                  { text: 'Acordo de Equipe', link: '/pt/guides/templates/team-agreement' },
                  { text: 'Cartão de Tensão', link: '/pt/guides/templates/tension-quick-card' },
                  { text: 'Planejador de Nutrição', link: '/pt/guides/templates/nutrition-planner' },
                  { text: 'Modelo de Objetivos', link: '/pt/guides/templates/goal-template' },
                  { text: 'Modelo de Diário', link: '/pt/guides/templates/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Artigos',
            items: [
              { text: '📝 Todos os Artigos', link: '/pt/articles/' },
              {
                text: '🧠 Jogo Mental',
                items: [
                  { text: 'Ciência do Estado Flow', link: '/pt/articles/flow-state-science' },
                  { text: 'O Crítico Interior', link: '/pt/articles/inner-critic' },
                  { text: 'Rotinas Pré-Tiro', link: '/pt/articles/pre-shot-routines' },
                  { text: 'Gestão de Pressão', link: '/pt/articles/pressure-management' },
                  { text: 'Mindfulness em Competição', link: '/pt/articles/mindfulness-competition' }
                ]
              },
              {
                text: '🔥 Motivação & Resiliência',
                items: [
                  { text: 'Definição de Metas Elite', link: '/pt/articles/elite-goal-setting' },
                  { text: 'Resiliência Mental', link: '/pt/articles/mental-resilience' },
                  { text: 'Mental vs Técnico', link: '/pt/articles/mental-vs-technical' }
                ]
              },
              {
                text: '🤝 Dinâmica de Equipe',
                items: [
                  { text: 'Comunicação de Equipe', link: '/pt/articles/team-communication' },
                  { text: 'Química de Equipe', link: '/pt/articles/team-chemistry' },
                  { text: 'Liderança de Equipe', link: '/pt/articles/team-leadership' }
                ]
              },
              {
                text: '⚡ Fatores de Performance',
                items: [
                  { text: 'Sono & Performance', link: '/pt/articles/sleep-performance' },
                  { text: 'Nutrição para Competição', link: '/pt/articles/nutrition-competition' },
                  { text: 'Autoconsciência', link: '/pt/articles/self-awareness-development' },
                  { text: 'Tensão & Precisão', link: '/pt/articles/tension-precision' }
                ]
              },
              {
                text: '🎯 Treinamento',
                items: [
                  { text: 'Erros de Treino Mental', link: '/pt/articles/mental-training-mistakes' },
                  { text: 'Estrutura de Prática', link: '/pt/articles/practice-structure' },
                  { text: 'Preparação para Competição', link: '/pt/articles/competition-prep' }
                ]
              }
            ]
          },
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
          { text: '🎯 Utvärdering', link: '/sv/assessment/' },
          { text: 'Ambition', link: '/sv/ambition' },
          {
            text: 'Lär dig',
            items: [
              { text: '📚 Utbildningscenter', link: '/sv/education/' },
              {
                text: '🧠 Mentalt Spel (600p)',
                items: [
                  { text: 'Översikt', link: '/sv/education/mental-game/' },
                  { text: 'Zonen', link: '/sv/education/mental-game/the-zone/' },
                  { text: 'Mental Styrka', link: '/sv/education/mental-game/mental-strength/' },
                  { text: 'Mindfulness', link: '/sv/education/mental-game/mindfulness/' }
                ]
              },
              {
                text: '🔥 Motivation (500p)',
                items: [
                  { text: 'Mål & Motivation', link: '/sv/education/motivation/' }
                ]
              },
              {
                text: '😴 Sömn (400p)',
                items: [
                  { text: 'Sömn & Återhämtning', link: '/sv/education/sleep/' }
                ]
              },
              {
                text: '🪞 Självkännedom (400p)',
                items: [
                  { text: 'Självkännedom', link: '/sv/education/self-awareness/' }
                ]
              },
              {
                text: '🥗 Näring (300p)',
                items: [
                  { text: 'Prestationsnäring', link: '/sv/education/nutrition/' }
                ]
              },
              {
                text: '🤝 Teamdynamik (300p)',
                items: [
                  { text: 'Lagspelare', link: '/sv/education/team-dynamics/' }
                ]
              },
              {
                text: '💆 Spänning (300p)',
                items: [
                  { text: 'Spänningshantering', link: '/sv/education/tension/' }
                ]
              },
              {
                text: '🎯 Teknik (100p)',
                items: [
                  { text: 'Teknisk Rådgivning', link: '/sv/education/technique/' },
                  { text: 'Träningsmetoder', link: '/sv/education/technique/training/' },
                  { text: 'Taktik', link: '/sv/education/technique/tactics/' }
                ]
              }
            ]
          },
          {
            text: 'Guider',
            items: [
              { text: '📋 Alla Guider', link: '/sv/guides/' },
              { text: '🌱 Mental Resa (Nybörjare)', link: '/sv/guides/mental-journey/' },
              { text: '🎯 Workshop', link: '/sv/guides/workshop/' },
              { text: '🏕️ Träningsläger', link: '/sv/guides/training-camp/' },
              { text: '🔄 Träningspass', link: '/sv/guides/training-session/' },
              {
                text: '📄 Mallar',
                items: [
                  { text: 'Sömnspårning', link: '/sv/guides/templates/sleep-tracker' },
                  { text: 'Checklista Före Tävling', link: '/sv/guides/templates/pre-competition-checklist' },
                  { text: 'Feedback från Lagkamrater', link: '/sv/guides/templates/peer-feedback' },
                  { text: 'Lagöverenskommelse', link: '/sv/guides/templates/team-agreement' },
                  { text: 'Spänningskort', link: '/sv/guides/templates/tension-quick-card' },
                  { text: 'Näringsplanerare', link: '/sv/guides/templates/nutrition-planner' },
                  { text: 'Målmall', link: '/sv/guides/templates/goal-template' },
                  { text: 'Dagboksmall', link: '/sv/guides/templates/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Artiklar',
            items: [
              { text: '📝 Alla Artiklar', link: '/sv/articles/' },
              {
                text: '🧠 Mentalt Spel',
                items: [
                  { text: 'Flow-tillståndets Vetenskap', link: '/sv/articles/flow-state-science' },
                  { text: 'Den Inre Kritikern', link: '/sv/articles/inner-critic' },
                  { text: 'Pre-Shot Rutiner', link: '/sv/articles/pre-shot-routines' },
                  { text: 'Presshantering', link: '/sv/articles/pressure-management' },
                  { text: 'Mindfulness i Tävling', link: '/sv/articles/mindfulness-competition' }
                ]
              },
              {
                text: '🔥 Motivation & Uthållighet',
                items: [
                  { text: 'Elite Målsättning', link: '/sv/articles/elite-goal-setting' },
                  { text: 'Mental Uthållighet', link: '/sv/articles/mental-resilience' },
                  { text: 'Mentalt vs Tekniskt', link: '/sv/articles/mental-vs-technical' }
                ]
              },
              {
                text: '🤝 Teamdynamik',
                items: [
                  { text: 'Lagkommunikation', link: '/sv/articles/team-communication' },
                  { text: 'Lagkemi', link: '/sv/articles/team-chemistry' },
                  { text: 'Lagledarskap', link: '/sv/articles/team-leadership' }
                ]
              },
              {
                text: '⚡ Prestationsfaktorer',
                items: [
                  { text: 'Sömn & Prestation', link: '/sv/articles/sleep-performance' },
                  { text: 'Näring för Tävling', link: '/sv/articles/nutrition-competition' },
                  { text: 'Självkännedom', link: '/sv/articles/self-awareness-development' },
                  { text: 'Spänning & Precision', link: '/sv/articles/tension-precision' }
                ]
              },
              {
                text: '🎯 Träning',
                items: [
                  { text: 'Mentala Träningsmisstag', link: '/sv/articles/mental-training-mistakes' },
                  { text: 'Träningsstruktur', link: '/sv/articles/practice-structure' },
                  { text: 'Tävlingsförberedelse', link: '/sv/articles/competition-prep' }
                ]
              }
            ]
          },
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
      introduction: 'Introduction',
      // Mental Game
      mentalGame: 'Mental Game',
      theZone: 'The Zone',
      technicalVsFlow: 'Technical vs Flow Training',
      enteringZone: 'Entering the Zone',
      mentalStrength: 'Mental Strength',
      handlingPressure: 'Handling Pressure',
      preShotRoutine: 'Pre-Shot Routine',
      mindfulness: 'Mindfulness',
      techniques: 'Techniques',
      dailyPractice: 'Daily Practice',
      // Motivation
      motivation: 'Motivation',
      smartGoals: 'SMART Goals',
      planning: 'Planning Your Development',
      // Sleep
      sleep: 'Sleep & Recovery',
      // Self-Awareness
      selfAwareness: 'Self-Awareness',
      // Nutrition
      nutrition: 'Nutrition',
      fuelingPerformance: 'Fueling Performance',
      // Team Dynamics
      teamDynamics: 'Team Dynamics',
      communication: 'Communication',
      // Tension
      tension: 'Tension Management',
      // Technique
      technique: 'Technique',
      paletteOfThrows: 'Palette of Throws',
      trainingMethods: 'Training Methods',
      trainingDrills: 'Training Drills',
      tactics: 'Tactics',
      probability: 'Probability-Based Decisions'
    }),
    '/en/guides/': getGuidesSidebar('en', {
      guides: 'Guides & Tools',
      overview: 'Overview',
      mentalJourney: 'Mental Journey (Beginners)',
      sessionGuide: 'Session Guide (2-3h)',
      materials: 'Downloadable Materials',
      workshop: 'Workshop',
      trainingCamp: 'Training Camp',
      trainingSession: 'Training Session',
      templates: 'Templates',
      goalTemplate: 'Goal Template',
      diaryTemplate: 'Diary Template',
      sleepTracker: 'Sleep Tracker',
      preCompetition: 'Pre-Competition Checklist',
      peerFeedback: 'Peer Feedback',
      teamAgreement: 'Team Agreement',
      tensionQuickCard: 'Tension Release Card',
      nutritionPlanner: 'Nutrition Planner'
    }),
    '/en/articles/': getArticlesSidebar('en', {
      resources: 'Resources',
      overview: 'Overview',
      blog: 'Articles',
      allArticles: 'All Articles',
      mentalGame: 'Mental Game',
      performance: 'Performance Psychology',
      teamDynamics: 'Team Dynamics',
      training: 'Training & Development',
      caseStudies: 'Case Studies',
      testimonials: 'Testimonials'
    }),

    // Danish
    '/da/education/': getEducationSidebar('da', {
      education: 'Uddannelse',
      overview: 'Oversigt',
      introduction: 'Introduktion',
      mentalGame: 'Mentalt Spil',
      theZone: 'Zonen',
      technicalVsFlow: 'Teknisk vs Flow Træning',
      enteringZone: 'Komme ind i Zonen',
      mentalStrength: 'Mental Styrke',
      handlingPressure: 'Håndtering af Pres',
      preShotRoutine: 'Før-Kast Rutine',
      mindfulness: 'Mindfulness',
      techniques: 'Teknikker',
      dailyPractice: 'Daglig Praksis',
      motivation: 'Motivation',
      smartGoals: 'SMART Mål',
      planning: 'Planlægning af Din Udvikling',
      sleep: 'Søvn & Restitution',
      selfAwareness: 'Selvbevidsthed',
      nutrition: 'Ernæring',
      fuelingPerformance: 'Brændstof til Præstation',
      teamDynamics: 'Teamdynamik',
      communication: 'Kommunikation',
      tension: 'Spændingshåndtering',
      technique: 'Teknik',
      paletteOfThrows: 'Palet af Kast',
      trainingMethods: 'Træningsmetoder',
      trainingDrills: 'Træningsøvelser',
      tactics: 'Taktik',
      probability: 'Sandsynlighedsbaserede Beslutninger'
    }),
    '/da/guides/': getGuidesSidebar('da', {
      guides: 'Guider & Værktøjer',
      overview: 'Oversigt',
      mentalJourney: 'Mental Rejse (Begyndere)',
      sessionGuide: 'Sessionsguide (2-3t)',
      materials: 'Downloadbare Materialer',
      workshop: 'Workshop',
      trainingCamp: 'Træningslejr',
      trainingSession: 'Træningssession',
      templates: 'Skabeloner',
      goalTemplate: 'Målskabelon',
      diaryTemplate: 'Dagbogskabelon',
      sleepTracker: 'Søvnsporing',
      preCompetition: 'Før-konkurrence Tjekliste',
      peerFeedback: 'Peer Feedback',
      teamAgreement: 'Holdaftale',
      tensionQuickCard: 'Spændingskort',
      nutritionPlanner: 'Ernæringsplanlægger'
    }),
    '/da/articles/': getArticlesSidebar('da', {
      resources: 'Ressourcer',
      overview: 'Oversigt',
      blog: 'Artikler',
      allArticles: 'Alle Artikler',
      mentalGame: 'Mentalt Spil',
      performance: 'Præstationspsykologi',
      teamDynamics: 'Teamdynamik',
      training: 'Træning & Udvikling',
      caseStudies: 'Casestudier',
      testimonials: 'Udtalelser'
    }),

    // German
    '/de/education/': getEducationSidebar('de', {
      education: 'Bildung',
      overview: 'Übersicht',
      introduction: 'Einführung',
      mentalGame: 'Mentales Spiel',
      theZone: 'Die Zone',
      technicalVsFlow: 'Technisches vs Flow-Training',
      enteringZone: 'In die Zone Eintreten',
      mentalStrength: 'Mentale Stärke',
      handlingPressure: 'Umgang mit Druck',
      preShotRoutine: 'Vor-Wurf-Routine',
      mindfulness: 'Achtsamkeit',
      techniques: 'Techniken',
      dailyPractice: 'Tägliche Praxis',
      motivation: 'Motivation',
      smartGoals: 'SMART Ziele',
      planning: 'Planung Ihrer Entwicklung',
      sleep: 'Schlaf & Erholung',
      selfAwareness: 'Selbstwahrnehmung',
      nutrition: 'Ernährung',
      fuelingPerformance: 'Leistung Tanken',
      teamDynamics: 'Teamdynamik',
      communication: 'Kommunikation',
      tension: 'Spannungsmanagement',
      technique: 'Technik',
      paletteOfThrows: 'Palette der Würfe',
      trainingMethods: 'Trainingsmethoden',
      trainingDrills: 'Trainingsübungen',
      tactics: 'Taktik',
      probability: 'Wahrscheinlichkeitsbasierte Entscheidungen'
    }),
    '/de/guides/': getGuidesSidebar('de', {
      guides: 'Anleitungen & Werkzeuge',
      overview: 'Übersicht',
      mentalJourney: 'Mentale Reise (Anfänger)',
      sessionGuide: 'Sitzungsanleitung (2-3h)',
      materials: 'Herunterladbare Materialien',
      workshop: 'Workshop',
      trainingCamp: 'Trainingslager',
      trainingSession: 'Trainingseinheit',
      templates: 'Vorlagen',
      goalTemplate: 'Zielvorlage',
      diaryTemplate: 'Tagebuchvorlage',
      sleepTracker: 'Schlaf-Tracker',
      preCompetition: 'Vor-Wettkampf Checkliste',
      peerFeedback: 'Peer-Feedback',
      teamAgreement: 'Team-Vereinbarung',
      tensionQuickCard: 'Spannungskarte',
      nutritionPlanner: 'Ernährungsplaner'
    }),
    '/de/articles/': getArticlesSidebar('de', {
      resources: 'Ressourcen',
      overview: 'Übersicht',
      blog: 'Artikel',
      allArticles: 'Alle Artikel',
      mentalGame: 'Mentales Spiel',
      performance: 'Leistungspsychologie',
      teamDynamics: 'Teamdynamik',
      training: 'Training & Entwicklung',
      caseStudies: 'Fallstudien',
      testimonials: 'Erfahrungsberichte'
    }),

    // Spanish
    '/es/education/': getEducationSidebar('es', {
      education: 'Educación',
      overview: 'Resumen',
      introduction: 'Introducción',
      mentalGame: 'Juego Mental',
      theZone: 'La Zona',
      technicalVsFlow: 'Entrenamiento Técnico vs Flow',
      enteringZone: 'Entrando en la Zona',
      mentalStrength: 'Fuerza Mental',
      handlingPressure: 'Manejo de la Presión',
      preShotRoutine: 'Rutina Pre-Lanzamiento',
      mindfulness: 'Atención Plena',
      techniques: 'Técnicas',
      dailyPractice: 'Práctica Diaria',
      motivation: 'Motivación',
      smartGoals: 'Objetivos SMART',
      planning: 'Planificación de Tu Desarrollo',
      sleep: 'Sueño y Recuperación',
      selfAwareness: 'Autoconocimiento',
      nutrition: 'Nutrición',
      fuelingPerformance: 'Alimentando el Rendimiento',
      teamDynamics: 'Dinámica de Equipo',
      communication: 'Comunicación',
      tension: 'Gestión de la Tensión',
      technique: 'Técnica',
      paletteOfThrows: 'Paleta de Lanzamientos',
      trainingMethods: 'Métodos de Entrenamiento',
      trainingDrills: 'Ejercicios de Entrenamiento',
      tactics: 'Táctica',
      probability: 'Decisiones Basadas en Probabilidad'
    }),
    '/es/guides/': getGuidesSidebar('es', {
      guides: 'Guías y Herramientas',
      overview: 'Resumen',
      mentalJourney: 'Viaje Mental (Principiantes)',
      sessionGuide: 'Guía de Sesión (2-3h)',
      materials: 'Materiales Descargables',
      workshop: 'Taller',
      trainingCamp: 'Campamento de Entrenamiento',
      trainingSession: 'Sesión de Entrenamiento',
      templates: 'Plantillas',
      goalTemplate: 'Plantilla de Objetivos',
      diaryTemplate: 'Plantilla de Diario',
      sleepTracker: 'Registro de Sueño',
      preCompetition: 'Lista Pre-Competición',
      peerFeedback: 'Retroalimentación entre Pares',
      teamAgreement: 'Acuerdo de Equipo',
      tensionQuickCard: 'Tarjeta de Tensión',
      nutritionPlanner: 'Planificador de Nutrición'
    }),
    '/es/articles/': getArticlesSidebar('es', {
      resources: 'Recursos',
      overview: 'Resumen',
      blog: 'Artículos',
      allArticles: 'Todos los Artículos',
      mentalGame: 'Juego Mental',
      performance: 'Psicología del Rendimiento',
      teamDynamics: 'Dinámica de Equipo',
      training: 'Entrenamiento y Desarrollo',
      caseStudies: 'Casos de Estudio',
      testimonials: 'Testimonios'
    }),

    // French
    '/fr/education/': getEducationSidebar('fr', {
      education: 'Éducation',
      overview: 'Aperçu',
      introduction: 'Introduction',
      mentalGame: 'Jeu Mental',
      theZone: 'La Zone',
      technicalVsFlow: 'Entraînement Technique vs Flow',
      enteringZone: 'Entrer dans la Zone',
      mentalStrength: 'Force Mentale',
      handlingPressure: 'Gérer la Pression',
      preShotRoutine: 'Routine Pré-Lancer',
      mindfulness: 'Pleine Conscience',
      techniques: 'Techniques',
      dailyPractice: 'Pratique Quotidienne',
      motivation: 'Motivation',
      smartGoals: 'Objectifs SMART',
      planning: 'Planification de Votre Développement',
      sleep: 'Sommeil et Récupération',
      selfAwareness: 'Conscience de Soi',
      nutrition: 'Nutrition',
      fuelingPerformance: 'Alimenter la Performance',
      teamDynamics: 'Dynamique d\'Équipe',
      communication: 'Communication',
      tension: 'Gestion de la Tension',
      technique: 'Technique',
      paletteOfThrows: 'Palette des Lancers',
      trainingMethods: 'Méthodes d\'Entraînement',
      trainingDrills: 'Exercices d\'Entraînement',
      tactics: 'Tactique',
      probability: 'Décisions Basées sur la Probabilité'
    }),
    '/fr/guides/': getGuidesSidebar('fr', {
      guides: 'Guides et Outils',
      overview: 'Aperçu',
      mentalJourney: 'Parcours Mental (Débutants)',
      sessionGuide: 'Guide de Session (2-3h)',
      materials: 'Matériaux Téléchargeables',
      workshop: 'Atelier',
      trainingCamp: 'Stage d\'Entraînement',
      trainingSession: 'Séance d\'Entraînement',
      templates: 'Modèles',
      goalTemplate: 'Modèle d\'Objectifs',
      diaryTemplate: 'Modèle de Journal',
      sleepTracker: 'Suivi du Sommeil',
      preCompetition: 'Liste Pré-Compétition',
      peerFeedback: 'Feedback entre Pairs',
      teamAgreement: 'Accord d\'Équipe',
      tensionQuickCard: 'Carte de Tension',
      nutritionPlanner: 'Planificateur Nutrition'
    }),
    '/fr/articles/': getArticlesSidebar('fr', {
      resources: 'Ressources',
      overview: 'Aperçu',
      blog: 'Articles',
      allArticles: 'Tous les Articles',
      mentalGame: 'Jeu Mental',
      performance: 'Psychologie de la Performance',
      teamDynamics: 'Dynamique d\'Équipe',
      training: 'Entraînement et Développement',
      caseStudies: 'Études de Cas',
      testimonials: 'Témoignages'
    }),

    // Italian
    '/it/education/': getEducationSidebar('it', {
      education: 'Educazione',
      overview: 'Panoramica',
      introduction: 'Introduzione',
      mentalGame: 'Gioco Mentale',
      theZone: 'La Zona',
      technicalVsFlow: 'Allenamento Tecnico vs Flow',
      enteringZone: 'Entrare nella Zona',
      mentalStrength: 'Forza Mentale',
      handlingPressure: 'Gestione della Pressione',
      preShotRoutine: 'Routine Pre-Lancio',
      mindfulness: 'Consapevolezza',
      techniques: 'Tecniche',
      dailyPractice: 'Pratica Quotidiana',
      motivation: 'Motivazione',
      smartGoals: 'Obiettivi SMART',
      planning: 'Pianificazione del Tuo Sviluppo',
      sleep: 'Sonno e Recupero',
      selfAwareness: 'Autoconsapevolezza',
      nutrition: 'Nutrizione',
      fuelingPerformance: 'Alimentare la Performance',
      teamDynamics: 'Dinamiche di Squadra',
      communication: 'Comunicazione',
      tension: 'Gestione della Tensione',
      technique: 'Tecnica',
      paletteOfThrows: 'Tavolozza dei Lanci',
      trainingMethods: 'Metodi di Allenamento',
      trainingDrills: 'Esercizi di Allenamento',
      tactics: 'Tattica',
      probability: 'Decisioni Basate sulla Probabilità'
    }),
    '/it/guides/': getGuidesSidebar('it', {
      guides: 'Guide e Strumenti',
      overview: 'Panoramica',
      mentalJourney: 'Percorso Mentale (Principianti)',
      sessionGuide: 'Guida alla Sessione (2-3h)',
      materials: 'Materiali Scaricabili',
      workshop: 'Workshop',
      trainingCamp: 'Campo di Allenamento',
      trainingSession: 'Sessione di Allenamento',
      templates: 'Modelli',
      goalTemplate: 'Modello Obiettivi',
      diaryTemplate: 'Modello Diario',
      sleepTracker: 'Monitoraggio Sonno',
      preCompetition: 'Checklist Pre-Gara',
      peerFeedback: 'Feedback tra Pari',
      teamAgreement: 'Accordo di Squadra',
      tensionQuickCard: 'Scheda Tensione',
      nutritionPlanner: 'Pianificatore Nutrizione'
    }),
    '/it/articles/': getArticlesSidebar('it', {
      resources: 'Risorse',
      overview: 'Panoramica',
      blog: 'Articoli',
      allArticles: 'Tutti gli Articoli',
      mentalGame: 'Gioco Mentale',
      performance: 'Psicologia della Prestazione',
      teamDynamics: 'Dinamiche di Squadra',
      training: 'Allenamento e Sviluppo',
      caseStudies: 'Casi Studio',
      testimonials: 'Testimonianze'
    }),

    // Dutch
    '/nl/education/': getEducationSidebar('nl', {
      education: 'Educatie',
      overview: 'Overzicht',
      introduction: 'Introductie',
      mentalGame: 'Mentaal Spel',
      theZone: 'De Zone',
      technicalVsFlow: 'Technische vs Flow Training',
      enteringZone: 'De Zone Betreden',
      mentalStrength: 'Mentale Kracht',
      handlingPressure: 'Omgaan met Druk',
      preShotRoutine: 'Pre-Worp Routine',
      mindfulness: 'Mindfulness',
      techniques: 'Technieken',
      dailyPractice: 'Dagelijkse Praktijk',
      motivation: 'Motivatie',
      smartGoals: 'SMART Doelen',
      planning: 'Planning van Je Ontwikkeling',
      sleep: 'Slaap & Herstel',
      selfAwareness: 'Zelfbewustzijn',
      nutrition: 'Voeding',
      fuelingPerformance: 'Prestaties Voeden',
      teamDynamics: 'Teamdynamiek',
      communication: 'Communicatie',
      tension: 'Spanningsbeheer',
      technique: 'Techniek',
      paletteOfThrows: 'Palet van Worpen',
      trainingMethods: 'Trainingsmethoden',
      trainingDrills: 'Trainingsoefeningen',
      tactics: 'Tactiek',
      probability: 'Waarschijnlijkheidsgebaseerde Beslissingen'
    }),
    '/nl/guides/': getGuidesSidebar('nl', {
      guides: 'Gidsen & Hulpmiddelen',
      overview: 'Overzicht',
      mentalJourney: 'Mentale Reis (Beginners)',
      sessionGuide: 'Sessiegids (2-3u)',
      materials: 'Downloadbare Materialen',
      workshop: 'Workshop',
      trainingCamp: 'Trainingskamp',
      trainingSession: 'Trainingssessie',
      templates: 'Sjablonen',
      goalTemplate: 'Doelsjabloon',
      diaryTemplate: 'Dagboeksjabloon',
      sleepTracker: 'Slaaptracker',
      preCompetition: 'Pre-Wedstrijd Checklist',
      peerFeedback: 'Peer Feedback',
      teamAgreement: 'Teamovereenkomst',
      tensionQuickCard: 'Spanningskaart',
      nutritionPlanner: 'Voedingsplanner'
    }),
    '/nl/articles/': getArticlesSidebar('nl', {
      resources: 'Bronnen',
      overview: 'Overzicht',
      blog: 'Artikelen',
      allArticles: 'Alle Artikelen',
      mentalGame: 'Mentaal Spel',
      performance: 'Prestatiepsychologie',
      teamDynamics: 'Teamdynamiek',
      training: 'Training & Ontwikkeling',
      caseStudies: 'Casestudies',
      testimonials: 'Getuigenissen'
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
    '/no/guides/': getGuidesSidebar('no', {
      guides: 'Guider & Verktøy',
      overview: 'Oversikt',
      mentalJourney: 'Mental Reise (Nybegynnere)',
      sessionGuide: 'Sesjonsguide (2-3t)',
      materials: 'Nedlastbare Materialer',
      workshop: 'Workshop',
      trainingCamp: 'Treningsleir',
      trainingSession: 'Treningsøkt',
      templates: 'Maler',
      goalTemplate: 'Målmal',
      diaryTemplate: 'Dagbokmal',
      sleepTracker: 'Søvnsporing',
      preCompetition: 'Før-konkurranse Sjekkliste',
      peerFeedback: 'Tilbakemelding fra Medspillere',
      teamAgreement: 'Lagavtale',
      tensionQuickCard: 'Spenningskort',
      nutritionPlanner: 'Ernæringsplanlegger'
    }),
    '/no/articles/': getArticlesSidebar('no', {
      resources: 'Ressurser',
      overview: 'Oversikt',
      blog: 'Artikler',
      allArticles: 'Alle Artikler',
      mentalGame: 'Mentalt Spill',
      performance: 'Prestasjonspsykologi',
      teamDynamics: 'Teamdynamikk',
      training: 'Trening & Utvikling',
      caseStudies: 'Casestudier',
      testimonials: 'Attester'
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
    '/pt/guides/': getGuidesSidebar('pt', {
      guides: 'Guias e Ferramentas',
      overview: 'Visão Geral',
      mentalJourney: 'Jornada Mental (Iniciantes)',
      sessionGuide: 'Guia de Sessão (2-3h)',
      materials: 'Materiais para Download',
      workshop: 'Workshop',
      trainingCamp: 'Campo de Treinamento',
      trainingSession: 'Sessão de Treinamento',
      templates: 'Modelos',
      goalTemplate: 'Modelo de Objetivos',
      diaryTemplate: 'Modelo de Diário',
      sleepTracker: 'Rastreador de Sono',
      preCompetition: 'Checklist Pré-Competição',
      peerFeedback: 'Feedback entre Pares',
      teamAgreement: 'Acordo de Equipe',
      tensionQuickCard: 'Cartão de Tensão',
      nutritionPlanner: 'Planejador de Nutrição'
    }),
    '/pt/articles/': getArticlesSidebar('pt', {
      resources: 'Recursos',
      overview: 'Visão Geral',
      blog: 'Artigos',
      allArticles: 'Todos os Artigos',
      mentalGame: 'Jogo Mental',
      performance: 'Psicologia do Desempenho',
      teamDynamics: 'Dinâmica de Equipe',
      training: 'Treinamento e Desenvolvimento',
      caseStudies: 'Estudos de Caso',
      testimonials: 'Depoimentos'
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
    '/sv/guides/': getGuidesSidebar('sv', {
      guides: 'Guider & Verktyg',
      overview: 'Översikt',
      mentalJourney: 'Mental Resa (Nybörjare)',
      sessionGuide: 'Sessionsguide (2-3h)',
      materials: 'Nedladdningsbara Material',
      workshop: 'Workshop',
      trainingCamp: 'Träningsläger',
      trainingSession: 'Träningspass',
      templates: 'Mallar',
      goalTemplate: 'Målmall',
      diaryTemplate: 'Dagboksmall',
      sleepTracker: 'Sömnspårning',
      preCompetition: 'Checklista Före Tävling',
      peerFeedback: 'Feedback från Lagkamrater',
      teamAgreement: 'Lagöverenskommelse',
      tensionQuickCard: 'Spänningskort',
      nutritionPlanner: 'Näringsplanerare'
    }),
    '/sv/articles/': getArticlesSidebar('sv', {
      resources: 'Resurser',
      overview: 'Översikt',
      blog: 'Artiklar',
      allArticles: 'Alla Artiklar',
      mentalGame: 'Mentalt Spel',
      performance: 'Prestationspsykologi',
      teamDynamics: 'Teamdynamik',
      training: 'Träning & Utveckling',
      caseStudies: 'Fallstudier',
      testimonials: 'Omdömen'
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
    // 🧠 MENTAL GAME (600p)
    {
      text: `🧠 ${labels.mentalGame || 'Mental Game'}`,
      collapsed: false,
      items: [
        { text: labels.overview, link: `/${lang}/education/mental-game/` },
        {
          text: labels.theZone,
          collapsed: true,
          items: [
            { text: labels.introduction, link: `/${lang}/education/mental-game/the-zone/` },
            { text: labels.technicalVsFlow, link: `/${lang}/education/mental-game/the-zone/technical-vs-flow` },
            { text: labels.enteringZone, link: `/${lang}/education/mental-game/the-zone/entering-the-zone` }
          ]
        },
        {
          text: labels.mentalStrength,
          collapsed: true,
          items: [
            { text: labels.introduction, link: `/${lang}/education/mental-game/mental-strength/` },
            { text: labels.handlingPressure, link: `/${lang}/education/mental-game/mental-strength/handling-pressure` },
            { text: labels.preShotRoutine, link: `/${lang}/education/mental-game/mental-strength/pre-shot-routine` }
          ]
        },
        {
          text: labels.mindfulness,
          collapsed: true,
          items: [
            { text: labels.introduction, link: `/${lang}/education/mental-game/mindfulness/` },
            { text: labels.techniques, link: `/${lang}/education/mental-game/mindfulness/techniques` },
            { text: labels.dailyPractice, link: `/${lang}/education/mental-game/mindfulness/daily-practice` }
          ]
        }
      ]
    },
    // 🔥 MOTIVATION (500p)
    {
      text: `🔥 ${labels.motivation || 'Motivation'}`,
      collapsed: false,
      items: [
        { text: labels.introduction, link: `/${lang}/education/motivation/` },
        { text: labels.psychologyOfMotivation || 'Psychology of Motivation', link: `/${lang}/education/motivation/motivation` },
        { text: labels.smartGoals, link: `/${lang}/education/motivation/smart-goals` },
        { text: labels.planning, link: `/${lang}/education/motivation/planning` },
        { text: labels.maintainingMotivation || 'Maintaining Motivation', link: `/${lang}/education/motivation/maintaining` }
      ]
    },
    // 😴 SLEEP (400p)
    {
      text: `😴 ${labels.sleep || 'Sleep'}`,
      collapsed: false,
      items: [
        { text: labels.introduction, link: `/${lang}/education/sleep/` },
        { text: labels.sleepHabits || 'Sleep Habits', link: `/${lang}/education/sleep/habits` },
        { text: labels.sleepCompetition || 'Sleep & Competition', link: `/${lang}/education/sleep/competition` }
      ]
    },
    // 🪞 SELF-AWARENESS (400p)
    {
      text: `🪞 ${labels.selfAwareness || 'Self-Awareness'}`,
      collapsed: false,
      items: [
        { text: labels.introduction, link: `/${lang}/education/self-awareness/` },
        { text: labels.gettingFeedback || 'Getting Feedback', link: `/${lang}/education/self-awareness/feedback` },
        { text: labels.videoAnalysis || 'Video Analysis', link: `/${lang}/education/self-awareness/video` }
      ]
    },
    // 🥗 NUTRITION (300p)
    {
      text: `🥗 ${labels.nutrition}`,
      collapsed: false,
      items: [
        { text: labels.fuelingPerformance, link: `/${lang}/education/nutrition/` }
      ]
    },
    // 🤝 TEAM DYNAMICS (300p)
    {
      text: `🤝 ${labels.teamDynamics}`,
      collapsed: false,
      items: [
        { text: labels.introduction, link: `/${lang}/education/team-dynamics/` },
        { text: labels.communication, link: `/${lang}/education/team-dynamics/communication` }
      ]
    },
    // 💆 TENSION (300p)
    {
      text: `💆 ${labels.tension || 'Tension'}`,
      collapsed: false,
      items: [
        { text: labels.introduction, link: `/${lang}/education/tension/` },
        { text: labels.tensionTechniques || 'Release Techniques', link: `/${lang}/education/tension/techniques` },
        { text: labels.tensionCompetition || 'Competition Management', link: `/${lang}/education/tension/competition` }
      ]
    },
    // 🎯 TECHNIQUE (100p)
    {
      text: `🎯 ${labels.technique || 'Technique'}`,
      collapsed: false,
      items: [
        { text: labels.overview, link: `/${lang}/education/technique/` },
        { text: labels.paletteOfThrows || 'Palette of Throws', link: `/${lang}/education/technique/throws` },
        {
          text: labels.trainingMethods,
          collapsed: true,
          items: [
            { text: labels.introduction, link: `/${lang}/education/technique/training/` },
            { text: labels.trainingDrills, link: `/${lang}/education/technique/training/drills` }
          ]
        },
        {
          text: labels.tactics,
          collapsed: true,
          items: [
            { text: labels.introduction, link: `/${lang}/education/technique/tactics/` },
            { text: labels.probability, link: `/${lang}/education/technique/tactics/probability` }
          ]
        }
      ]
    }
  ]
}

function getMentalJourneySidebar(lang: string, labels: any) {
  return [
    {
      text: labels.mentalJourney,
      items: [
        { text: labels.overview, link: `/${lang}/mental-journey/` },
        { text: labels.sessionGuide, link: `/${lang}/mental-journey/session-guide` },
        { text: labels.materials, link: `/${lang}/mental-journey/materials` }
      ]
    },
    {
      text: labels.relatedResources,
      collapsed: true,
      items: [
        { text: labels.workshop, link: `/${lang}/workshop` },
        { text: labels.trainingCamp, link: `/${lang}/training-camp` },
        { text: labels.trainingSession, link: `/${lang}/training-session` }
      ]
    }
  ]
}

function getWorkshopSidebar(lang: string, labels: any) {
  return [
    {
      text: labels.workshop,
      items: [
        { text: labels.overview, link: `/${lang}/workshop` }
      ]
    },
    {
      text: labels.quickLinks,
      collapsed: false,
      items: [
        { text: labels.forParticipants, link: `/${lang}/workshop#for-participants` },
        { text: labels.forFacilitators, link: `/${lang}/workshop#for-facilitators` }
      ]
    },
    {
      text: labels.relatedResources,
      collapsed: true,
      items: [
        { text: labels.mentalJourney, link: `/${lang}/mental-journey/` },
        { text: labels.trainingCamp, link: `/${lang}/training-camp` },
        { text: labels.trainingSession, link: `/${lang}/training-session` }
      ]
    }
  ]
}

function getTrainingCampSidebar(lang: string, labels: any) {
  return [
    {
      text: labels.trainingCamp,
      items: [
        { text: labels.overview, link: `/${lang}/training-camp` }
      ]
    },
    {
      text: labels.quickLinks,
      collapsed: false,
      items: [
        { text: labels.forParticipants, link: `/${lang}/training-camp#for-participants` },
        { text: labels.forOrganizers, link: `/${lang}/training-camp#for-organizers` }
      ]
    },
    {
      text: labels.relatedResources,
      collapsed: true,
      items: [
        { text: labels.mentalJourney, link: `/${lang}/mental-journey/` },
        { text: labels.workshop, link: `/${lang}/workshop` },
        { text: labels.trainingSession, link: `/${lang}/training-session` }
      ]
    }
  ]
}

// Note: getBlogSidebar is deprecated, use getArticlesSidebar instead
function getBlogSidebar(lang: string, labels: any) {
  return getArticlesSidebar(lang, labels)
}

function getGuidesSidebar(lang: string, labels: any) {
  return [
    {
      text: labels.guides,
      items: [
        { text: labels.overview, link: `/${lang}/guides/` }
      ]
    },
    {
      text: labels.mentalJourney,
      collapsed: false,
      items: [
        { text: labels.overview, link: `/${lang}/guides/mental-journey/` },
        { text: labels.sessionGuide, link: `/${lang}/guides/mental-journey/session-guide` },
        { text: labels.materials, link: `/${lang}/guides/mental-journey/materials` }
      ]
    },
    {
      text: labels.workshop,
      collapsed: true,
      items: [
        { text: labels.overview, link: `/${lang}/guides/workshop/` }
      ]
    },
    {
      text: labels.trainingCamp,
      collapsed: true,
      items: [
        { text: labels.overview, link: `/${lang}/guides/training-camp/` }
      ]
    },
    {
      text: labels.trainingSession,
      collapsed: true,
      items: [
        { text: labels.overview, link: `/${lang}/guides/training-session/` }
      ]
    },
    {
      text: labels.templates,
      collapsed: true,
      items: [
        { text: labels.sleepTracker, link: `/${lang}/guides/templates/sleep-tracker` },
        { text: labels.preCompetition, link: `/${lang}/guides/templates/pre-competition-checklist` },
        { text: labels.peerFeedback, link: `/${lang}/guides/templates/peer-feedback` },
        { text: labels.teamAgreement, link: `/${lang}/guides/templates/team-agreement` },
        { text: labels.tensionQuickCard, link: `/${lang}/guides/templates/tension-quick-card` },
        { text: labels.nutritionPlanner, link: `/${lang}/guides/templates/nutrition-planner` },
        { text: labels.goalTemplate, link: `/${lang}/guides/templates/goal-template` },
        { text: labels.diaryTemplate, link: `/${lang}/guides/templates/diary-template` }
      ]
    }
  ]
}

function getArticlesSidebar(lang: string, labels: any) {
  return [
    {
      text: labels.resources,
      items: [
        { text: labels.allArticles, link: `/${lang}/articles/` }
      ]
    },
    {
      text: labels.mentalGame,
      collapsed: false,
      items: [
        { text: 'Flow State Science', link: `/${lang}/articles/flow-state-science` },
        { text: 'Inner Critic', link: `/${lang}/articles/inner-critic` },
        { text: 'Pre-Shot Routines', link: `/${lang}/articles/pre-shot-routines` },
        { text: 'Pressure Management', link: `/${lang}/articles/pressure-management` },
        { text: 'Mindfulness in Competition', link: `/${lang}/articles/mindfulness-competition` }
      ]
    },
    {
      text: labels.performance,
      collapsed: true,
      items: [
        { text: 'Elite Goal Setting', link: `/${lang}/articles/elite-goal-setting` },
        { text: 'Mental Resilience', link: `/${lang}/articles/mental-resilience` },
        { text: 'Mental vs Technical', link: `/${lang}/articles/mental-vs-technical` }
      ]
    },
    {
      text: labels.teamDynamics,
      collapsed: true,
      items: [
        { text: 'Team Communication', link: `/${lang}/articles/team-communication` },
        { text: 'Team Chemistry', link: `/${lang}/articles/team-chemistry` },
        { text: 'Team Leadership', link: `/${lang}/articles/team-leadership` }
      ]
    },
    {
      text: labels.training,
      collapsed: true,
      items: [
        { text: 'Mental Training Mistakes', link: `/${lang}/articles/mental-training-mistakes` },
        { text: 'Practice Structure', link: `/${lang}/articles/practice-structure` },
        { text: 'Competition Prep', link: `/${lang}/articles/competition-prep` },
        { text: 'Sleep & Performance', link: `/${lang}/articles/sleep-performance` },
        { text: 'Nutrition for Competition', link: `/${lang}/articles/nutrition-competition` },
        { text: 'Self-Awareness', link: `/${lang}/articles/self-awareness-development` },
        { text: 'Tension & Precision', link: `/${lang}/articles/tension-precision` }
      ]
    }
  ]
}

