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
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split vendor chunks for better caching
            if (id.includes('node_modules')) {
              if (id.includes('vue')) {
                return 'vue'
              }
              if (id.includes('@vueuse')) {
                return 'vueuse'
              }
              // Don't manually chunk mermaid as it's handled by the plugin
              return 'vendor'
            }
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
            text: 'Education',
            items: [
              { text: 'Overview', link: '/en/education/' },
              { text: 'The Zone', link: '/en/education/the-zone/' },
              { text: 'Mindfulness', link: '/en/education/mindfulness/' },
              { text: 'Goal Setting', link: '/en/education/goals/' },
              { text: 'Mental Strength', link: '/en/education/mental-strength/' },
              { text: 'Team Dynamics', link: '/en/education/team-player/' },
              { text: 'Tactics', link: '/en/education/tactics/' },
              { text: 'Training Methods', link: '/en/education/training/' },
              { text: 'Nutrition', link: '/en/education/nutrition/' }
            ]
          },
          {
            text: 'Tools',
            items: [
              {
                text: 'Guides',
                items: [
                  { text: 'Mental Journey (Beginners)', link: '/en/mental-journey/' },
                  { text: 'Workshop (Advanced)', link: '/en/workshop' },
                  { text: 'Training Camp', link: '/en/training-camp' },
                  { text: 'Training Session', link: '/en/training-session' }
                ]
              },
              {
                text: 'Templates',
                items: [
                  { text: 'Goal Template', link: '/en/goal-template' },
                  { text: 'Diary Template', link: '/en/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Resources',
            items: [
              { text: 'Articles', link: '/en/blog/' },
              { text: 'Case Studies', link: '/en/case-studies' },
              { text: 'Testimonials', link: '/en/testimonials' }
            ]
          },
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
            text: 'Uddannelse',
            items: [
              { text: 'Oversigt', link: '/da/education/' },
              { text: 'Zonen', link: '/da/education/the-zone/' },
              { text: 'Mindfulness', link: '/da/education/mindfulness/' },
              { text: 'Målsætning', link: '/da/education/goals/' },
              { text: 'Mental Styrke', link: '/da/education/mental-strength/' },
              { text: 'Teamdynamik', link: '/da/education/team-player/' },
              { text: 'Taktik', link: '/da/education/tactics/' },
              { text: 'Træningsmetoder', link: '/da/education/training/' },
              { text: 'Ernæring', link: '/da/education/nutrition/' }
            ]
          },
          {
            text: 'Værktøjer',
            items: [
              {
                text: 'Guider',
                items: [
                  { text: 'Mental Rejse (Begyndere)', link: '/da/mental-journey/' },
                  { text: 'Workshop (Avanceret)', link: '/da/workshop' },
                  { text: 'Træningslejr', link: '/da/training-camp' },
                  { text: 'Træningssession', link: '/da/training-session' }
                ]
              },
              {
                text: 'Skabeloner',
                items: [
                  { text: 'Målskabelon', link: '/da/goal-template' },
                  { text: 'Dagbogsskabelon', link: '/da/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Ressourcer',
            items: [
              { text: 'Artikler', link: '/da/blog/' },
              { text: 'Casestudier', link: '/da/case-studies' },
              { text: 'Udtalelser', link: '/da/testimonials' }
            ]
          },
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
            text: 'Bildung',
            items: [
              { text: 'Übersicht', link: '/de/education/' },
              { text: 'Die Zone', link: '/de/education/the-zone/' },
              { text: 'Achtsamkeit', link: '/de/education/mindfulness/' },
              { text: 'Zielsetzung', link: '/de/education/goals/' },
              { text: 'Mentale Stärke', link: '/de/education/mental-strength/' },
              { text: 'Teamdynamik', link: '/de/education/team-player/' },
              { text: 'Taktik', link: '/de/education/tactics/' },
              { text: 'Trainingsmethoden', link: '/de/education/training/' },
              { text: 'Ernährung', link: '/de/education/nutrition/' }
            ]
          },
          {
            text: 'Werkzeuge',
            items: [
              {
                text: 'Anleitungen',
                items: [
                  { text: 'Mentale Reise (Anfänger)', link: '/de/mental-journey/' },
                  { text: 'Workshop (Fortgeschritten)', link: '/de/workshop' },
                  { text: 'Trainingslager', link: '/de/training-camp' },
                  { text: 'Trainingseinheit', link: '/de/training-session' }
                ]
              },
              {
                text: 'Vorlagen',
                items: [
                  { text: 'Zielvorlage', link: '/de/goal-template' },
                  { text: 'Tagebuchvorlage', link: '/de/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Ressourcen',
            items: [
              { text: 'Artikel', link: '/de/blog/' },
              { text: 'Fallstudien', link: '/de/case-studies' },
              { text: 'Erfahrungsberichte', link: '/de/testimonials' }
            ]
          },
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
            text: 'Educación',
            items: [
              { text: 'Resumen', link: '/es/education/' },
              { text: 'La Zona', link: '/es/education/the-zone/' },
              { text: 'Mindfulness', link: '/es/education/mindfulness/' },
              { text: 'Establecimiento de Metas', link: '/es/education/goals/' },
              { text: 'Fortaleza Mental', link: '/es/education/mental-strength/' },
              { text: 'Dinámica de Equipo', link: '/es/education/team-player/' },
              { text: 'Táctica', link: '/es/education/tactics/' },
              { text: 'Métodos de Entrenamiento', link: '/es/education/training/' },
              { text: 'Nutrición', link: '/es/education/nutrition/' }
            ]
          },
          {
            text: 'Herramientas',
            items: [
              {
                text: 'Guías',
                items: [
                  { text: 'Viaje Mental (Principiantes)', link: '/es/mental-journey/' },
                  { text: 'Taller (Avanzado)', link: '/es/workshop' },
                  { text: 'Campamento de Entrenamiento', link: '/es/training-camp' },
                  { text: 'Sesión de Entrenamiento', link: '/es/training-session' }
                ]
              },
              {
                text: 'Plantillas',
                items: [
                  { text: 'Plantilla de Objetivos', link: '/es/goal-template' },
                  { text: 'Plantilla de Diario', link: '/es/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Recursos',
            items: [
              { text: 'Artículos', link: '/es/blog/' },
              { text: 'Casos de Estudio', link: '/es/case-studies' },
              { text: 'Testimonios', link: '/es/testimonials' }
            ]
          },
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
            text: 'Éducation',
            items: [
              { text: 'Aperçu', link: '/fr/education/' },
              { text: 'La Zone', link: '/fr/education/the-zone/' },
              { text: 'Pleine Conscience', link: '/fr/education/mindfulness/' },
              { text: 'Définition d\'Objectifs', link: '/fr/education/goals/' },
              { text: 'Force Mentale', link: '/fr/education/mental-strength/' },
              { text: 'Dynamique d\'Équipe', link: '/fr/education/team-player/' },
              { text: 'Tactique', link: '/fr/education/tactics/' },
              { text: 'Méthodes d\'Entraînement', link: '/fr/education/training/' },
              { text: 'Nutrition', link: '/fr/education/nutrition/' }
            ]
          },
          {
            text: 'Outils',
            items: [
              {
                text: 'Guides',
                items: [
                  { text: 'Parcours Mental (Débutants)', link: '/fr/mental-journey/' },
                  { text: 'Atelier (Avancé)', link: '/fr/workshop' },
                  { text: 'Stage d\'Entraînement', link: '/fr/training-camp' },
                  { text: 'Séance d\'Entraînement', link: '/fr/training-session' }
                ]
              },
              {
                text: 'Modèles',
                items: [
                  { text: 'Modèle d\'Objectifs', link: '/fr/goal-template' },
                  { text: 'Modèle de Journal', link: '/fr/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Ressources',
            items: [
              { text: 'Articles', link: '/fr/blog/' },
              { text: 'Études de Cas', link: '/fr/case-studies' },
              { text: 'Témoignages', link: '/fr/testimonials' }
            ]
          },
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
            text: 'Educazione',
            items: [
              { text: 'Panoramica', link: '/it/education/' },
              { text: 'La Zona', link: '/it/education/the-zone/' },
              { text: 'Mindfulness', link: '/it/education/mindfulness/' },
              { text: 'Definizione degli Obiettivi', link: '/it/education/goals/' },
              { text: 'Forza Mentale', link: '/it/education/mental-strength/' },
              { text: 'Dinamiche di Squadra', link: '/it/education/team-player/' },
              { text: 'Tattica', link: '/it/education/tactics/' },
              { text: 'Metodi di Allenamento', link: '/it/education/training/' },
              { text: 'Nutrizione', link: '/it/education/nutrition/' }
            ]
          },
          {
            text: 'Strumenti',
            items: [
              {
                text: 'Guide',
                items: [
                  { text: 'Percorso Mentale (Principianti)', link: '/it/mental-journey/' },
                  { text: 'Workshop (Avanzato)', link: '/it/workshop' },
                  { text: 'Campo di Allenamento', link: '/it/training-camp' },
                  { text: 'Sessione di Allenamento', link: '/it/training-session' }
                ]
              },
              {
                text: 'Modelli',
                items: [
                  { text: 'Modello di Obiettivi', link: '/it/goal-template' },
                  { text: 'Modello di Diario', link: '/it/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Risorse',
            items: [
              { text: 'Articoli', link: '/it/blog/' },
              { text: 'Casi di Studio', link: '/it/case-studies' },
              { text: 'Testimonianze', link: '/it/testimonials' }
            ]
          },
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
            text: 'Educatie',
            items: [
              { text: 'Overzicht', link: '/nl/education/' },
              { text: 'De Zone', link: '/nl/education/the-zone/' },
              { text: 'Mindfulness', link: '/nl/education/mindfulness/' },
              { text: 'Doelen Stellen', link: '/nl/education/goals/' },
              { text: 'Mentale Kracht', link: '/nl/education/mental-strength/' },
              { text: 'Teamdynamiek', link: '/nl/education/team-player/' },
              { text: 'Tactiek', link: '/nl/education/tactics/' },
              { text: 'Trainingsmethoden', link: '/nl/education/training/' },
              { text: 'Voeding', link: '/nl/education/nutrition/' }
            ]
          },
          {
            text: 'Hulpmiddelen',
            items: [
              {
                text: 'Gidsen',
                items: [
                  { text: 'Mentale Reis (Beginners)', link: '/nl/mental-journey/' },
                  { text: 'Workshop (Gevorderd)', link: '/nl/workshop' },
                  { text: 'Trainingskamp', link: '/nl/training-camp' },
                  { text: 'Trainingssessie', link: '/nl/training-session' }
                ]
              },
              {
                text: 'Sjablonen',
                items: [
                  { text: 'Doelsjabloon', link: '/nl/goal-template' },
                  { text: 'Dagboeksjabloon', link: '/nl/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Bronnen',
            items: [
              { text: 'Artikelen', link: '/nl/blog/' },
              { text: 'Casestudies', link: '/nl/case-studies' },
              { text: 'Getuigenissen', link: '/nl/testimonials' }
            ]
          },
          { text: 'Technisch Advies', link: '/nl/technical/' },
          { text: 'Voeding', link: '/nl/food' },
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
          { text: 'Ambisjon', link: '/no/ambition' },
          { text: 'Nyheter', link: '/no/news/' },
          {
            text: 'Utdanning',
            items: [
              { text: 'Oversikt', link: '/no/education/' },
              { text: 'Sonen', link: '/no/education/the-zone/' },
              { text: 'Mindfulness', link: '/no/education/mindfulness/' },
              { text: 'Målsetting', link: '/no/education/goals/' },
              { text: 'Mental Styrke', link: '/no/education/mental-strength/' },
              { text: 'Teamdynamikk', link: '/no/education/team-player/' },
              { text: 'Taktikk', link: '/no/education/tactics/' },
              { text: 'Treningsmetoder', link: '/no/education/training/' },
              { text: 'Ernæring', link: '/no/education/nutrition/' }
            ]
          },
          {
            text: 'Verktøy',
            items: [
              {
                text: 'Guider',
                items: [
                  { text: 'Mental Reise (Nybegynnere)', link: '/no/mental-journey/' },
                  { text: 'Workshop (Avansert)', link: '/no/workshop' },
                  { text: 'Treningsleir', link: '/no/training-camp' },
                  { text: 'Treningsøkt', link: '/no/training-session' }
                ]
              },
              {
                text: 'Maler',
                items: [
                  { text: 'Målmal', link: '/no/goal-template' },
                  { text: 'Dagbokmal', link: '/no/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Ressurser',
            items: [
              { text: 'Artikler', link: '/no/blog/' },
              { text: 'Casestudier', link: '/no/case-studies' },
              { text: 'Attester', link: '/no/testimonials' }
            ]
          },
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
            text: 'Educação',
            items: [
              { text: 'Visão Geral', link: '/pt/education/' },
              { text: 'A Zona', link: '/pt/education/the-zone/' },
              { text: 'Mindfulness', link: '/pt/education/mindfulness/' },
              { text: 'Definição de Metas', link: '/pt/education/goals/' },
              { text: 'Força Mental', link: '/pt/education/mental-strength/' },
              { text: 'Dinâmica de Equipe', link: '/pt/education/team-player/' },
              { text: 'Tática', link: '/pt/education/tactics/' },
              { text: 'Métodos de Treinamento', link: '/pt/education/training/' },
              { text: 'Nutrição', link: '/pt/education/nutrition/' }
            ]
          },
          {
            text: 'Ferramentas',
            items: [
              {
                text: 'Guias',
                items: [
                  { text: 'Jornada Mental (Iniciantes)', link: '/pt/mental-journey/' },
                  { text: 'Workshop (Avançado)', link: '/pt/workshop' },
                  { text: 'Campo de Treinamento', link: '/pt/training-camp' },
                  { text: 'Sessão de Treinamento', link: '/pt/training-session' }
                ]
              },
              {
                text: 'Modelos',
                items: [
                  { text: 'Modelo de Objetivos', link: '/pt/goal-template' },
                  { text: 'Modelo de Diário', link: '/pt/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Recursos',
            items: [
              { text: 'Artigos', link: '/pt/blog/' },
              { text: 'Estudos de Caso', link: '/pt/case-studies' },
              { text: 'Depoimentos', link: '/pt/testimonials' }
            ]
          },
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
            text: 'Utbildning',
            items: [
              { text: 'Översikt', link: '/sv/education/' },
              { text: 'Zonen', link: '/sv/education/the-zone/' },
              { text: 'Mindfulness', link: '/sv/education/mindfulness/' },
              { text: 'Målsättning', link: '/sv/education/goals/' },
              { text: 'Mental Styrka', link: '/sv/education/mental-strength/' },
              { text: 'Teamdynamik', link: '/sv/education/team-player/' },
              { text: 'Taktik', link: '/sv/education/tactics/' },
              { text: 'Träningsmetoder', link: '/sv/education/training/' },
              { text: 'Näring', link: '/sv/education/nutrition/' }
            ]
          },
          {
            text: 'Verktyg',
            items: [
              {
                text: 'Guider',
                items: [
                  { text: 'Mental Resa (Nybörjare)', link: '/sv/mental-journey/' },
                  { text: 'Workshop (Avancerad)', link: '/sv/workshop' },
                  { text: 'Träningsläger', link: '/sv/training-camp' },
                  { text: 'Träningspass', link: '/sv/training-session' }
                ]
              },
              {
                text: 'Mallar',
                items: [
                  { text: 'Målmall', link: '/sv/goal-template' },
                  { text: 'Dagboksmall', link: '/sv/diary-template' }
                ]
              }
            ]
          },
          {
            text: 'Resurser',
            items: [
              { text: 'Artiklar', link: '/sv/blog/' },
              { text: 'Fallstudier', link: '/sv/case-studies' },
              { text: 'Omdömen', link: '/sv/testimonials' }
            ]
          },
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
    '/en/mental-journey/': getMentalJourneySidebar('en', {
      mentalJourney: 'Mental Journey for Beginners',
      overview: 'Getting Started',
      sessionGuide: 'Session Guide (2-3h)',
      materials: 'Downloadable Materials',
      relatedResources: 'Related Resources',
      workshop: 'Workshop (Advanced)',
      trainingCamp: 'Training Camp',
      trainingSession: 'Training Session'
    }),
    '/en/workshop': getWorkshopSidebar('en', {
      workshop: 'Workshop (Advanced)',
      overview: 'Overview',
      quickLinks: 'Quick Navigation',
      forParticipants: 'For Participants',
      forFacilitators: 'For Facilitators',
      relatedResources: 'Related Resources',
      mentalJourney: 'Mental Journey (Beginners)',
      trainingCamp: 'Training Camp',
      trainingSession: 'Training Session'
    }),
    '/en/training-camp': getTrainingCampSidebar('en', {
      trainingCamp: 'Training Camp',
      overview: 'Overview',
      quickLinks: 'Quick Navigation',
      forParticipants: 'For Participants',
      forOrganizers: 'For Organizers',
      relatedResources: 'Related Resources',
      mentalJourney: 'Mental Journey (Beginners)',
      workshop: 'Workshop (Advanced)',
      trainingSession: 'Training Session'
    }),
    '/en/blog/': getBlogSidebar('en', {
      blog: 'Articles',
      allArticles: 'All Articles',
      mentalGame: 'Mental Game',
      performance: 'Performance Psychology',
      teamDynamics: 'Team Dynamics',
      training: 'Training & Development'
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
    '/da/blog/': getBlogSidebar('da', {
      blog: 'Artikler',
      allArticles: 'Alle Artikler',
      mentalGame: 'Mentalt Spil',
      performance: 'Præstationspsykologi',
      teamDynamics: 'Teamdynamik',
      training: 'Træning & Udvikling'
    }),
    '/da/mental-journey/': getMentalJourneySidebar('da', {
      mentalJourney: 'Mental Rejse for Begyndere',
      overview: 'Kom i Gang',
      sessionGuide: 'Sessionsguide (2-3t)',
      materials: 'Downloadbare Materialer',
      relatedResources: 'Relaterede Ressourcer',
      workshop: 'Workshop (Avanceret)',
      trainingCamp: 'Træningslejr',
      trainingSession: 'Træningssession'
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
    '/de/blog/': getBlogSidebar('de', {
      blog: 'Artikel',
      allArticles: 'Alle Artikel',
      mentalGame: 'Mentales Spiel',
      performance: 'Leistungspsychologie',
      teamDynamics: 'Teamdynamik',
      training: 'Training & Entwicklung'
    }),
    '/de/mental-journey/': getMentalJourneySidebar('de', {
      mentalJourney: 'Mentale Reise für Anfänger',
      overview: 'Erste Schritte',
      sessionGuide: 'Sitzungsanleitung (2-3h)',
      materials: 'Herunterladbare Materialien',
      relatedResources: 'Verwandte Ressourcen',
      workshop: 'Workshop (Fortgeschritten)',
      trainingCamp: 'Trainingslager',
      trainingSession: 'Trainingseinheit'
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
    '/es/blog/': getBlogSidebar('es', {
      blog: 'Artículos',
      allArticles: 'Todos los Artículos',
      mentalGame: 'Juego Mental',
      performance: 'Psicología del Rendimiento',
      teamDynamics: 'Dinámica de Equipo',
      training: 'Entrenamiento y Desarrollo'
    }),
    '/es/mental-journey/': getMentalJourneySidebar('es', {
      mentalJourney: 'Viaje Mental para Principiantes',
      overview: 'Primeros Pasos',
      sessionGuide: 'Guía de Sesión (2-3h)',
      materials: 'Materiales Descargables',
      relatedResources: 'Recursos Relacionados',
      workshop: 'Taller (Avanzado)',
      trainingCamp: 'Campamento de Entrenamiento',
      trainingSession: 'Sesión de Entrenamiento'
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
    '/fr/blog/': getBlogSidebar('fr', {
      blog: 'Articles',
      allArticles: 'Tous les Articles',
      mentalGame: 'Jeu Mental',
      performance: 'Psychologie de la Performance',
      teamDynamics: 'Dynamique d\'Équipe',
      training: 'Entraînement et Développement'
    }),
    '/fr/mental-journey/': getMentalJourneySidebar('fr', {
      mentalJourney: 'Parcours Mental pour Débutants',
      overview: 'Premiers Pas',
      sessionGuide: 'Guide de Session (2-3h)',
      materials: 'Matériaux Téléchargeables',
      relatedResources: 'Ressources Connexes',
      workshop: 'Atelier (Avancé)',
      trainingCamp: 'Stage d\'Entraînement',
      trainingSession: 'Séance d\'Entraînement'
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
    '/it/blog/': getBlogSidebar('it', {
      blog: 'Articoli',
      allArticles: 'Tutti gli Articoli',
      mentalGame: 'Gioco Mentale',
      performance: 'Psicologia della Prestazione',
      teamDynamics: 'Dinamiche di Squadra',
      training: 'Allenamento e Sviluppo'
    }),
    '/it/mental-journey/': getMentalJourneySidebar('it', {
      mentalJourney: 'Percorso Mentale per Principianti',
      overview: 'Primi Passi',
      sessionGuide: 'Guida alla Sessione (2-3h)',
      materials: 'Materiali Scaricabili',
      relatedResources: 'Risorse Correlate',
      workshop: 'Workshop (Avanzato)',
      trainingCamp: 'Campo di Allenamento',
      trainingSession: 'Sessione di Allenamento'
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
    '/nl/blog/': getBlogSidebar('nl', {
      blog: 'Artikelen',
      allArticles: 'Alle Artikelen',
      mentalGame: 'Mentaal Spel',
      performance: 'Prestatiepsychologie',
      teamDynamics: 'Teamdynamiek',
      training: 'Training & Ontwikkeling'
    }),
    '/nl/mental-journey/': getMentalJourneySidebar('nl', {
      mentalJourney: 'Mentale Reis voor Beginners',
      overview: 'Aan de Slag',
      sessionGuide: 'Sessiegids (2-3u)',
      materials: 'Downloadbare Materialen',
      relatedResources: 'Gerelateerde Bronnen',
      workshop: 'Workshop (Gevorderd)',
      trainingCamp: 'Trainingskamp',
      trainingSession: 'Trainingssessie'
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
    '/no/blog/': getBlogSidebar('no', {
      blog: 'Artikler',
      allArticles: 'Alle Artikler',
      mentalGame: 'Mentalt Spill',
      performance: 'Prestasjonspsykologi',
      teamDynamics: 'Teamdynamikk',
      training: 'Trening & Utvikling'
    }),
    '/no/mental-journey/': getMentalJourneySidebar('no', {
      mentalJourney: 'Mental Reise for Nybegynnere',
      overview: 'Kom i Gang',
      sessionGuide: 'Sesjonsguide (2-3t)',
      materials: 'Nedlastbare Materialer',
      relatedResources: 'Relaterte Ressurser',
      workshop: 'Workshop (Avansert)',
      trainingCamp: 'Treningsleir',
      trainingSession: 'Treningsøkt'
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
    '/pt/blog/': getBlogSidebar('pt', {
      blog: 'Artigos',
      allArticles: 'Todos os Artigos',
      mentalGame: 'Jogo Mental',
      performance: 'Psicologia do Desempenho',
      teamDynamics: 'Dinâmica de Equipe',
      training: 'Treinamento e Desenvolvimento'
    }),
    '/pt/mental-journey/': getMentalJourneySidebar('pt', {
      mentalJourney: 'Jornada Mental para Iniciantes',
      overview: 'Primeiros Passos',
      sessionGuide: 'Guia de Sessão (2-3h)',
      materials: 'Materiais para Download',
      relatedResources: 'Recursos Relacionados',
      workshop: 'Workshop (Avançado)',
      trainingCamp: 'Campo de Treinamento',
      trainingSession: 'Sessão de Treinamento'
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
    }),
    '/sv/blog/': getBlogSidebar('sv', {
      blog: 'Artiklar',
      allArticles: 'Alla Artiklar',
      mentalGame: 'Mentalt Spel',
      performance: 'Prestationspsykologi',
      teamDynamics: 'Teamdynamik',
      training: 'Träning & Utveckling'
    }),
    '/sv/mental-journey/': getMentalJourneySidebar('sv', {
      mentalJourney: 'Mental Resa för Nybörjare',
      overview: 'Kom Igång',
      sessionGuide: 'Sessionsguide (2-3h)',
      materials: 'Nedladdningsbara Material',
      relatedResources: 'Relaterade Resurser',
      workshop: 'Workshop (Avancerad)',
      trainingCamp: 'Träningsläger',
      trainingSession: 'Träningspass'
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

function getBlogSidebar(lang: string, labels: any) {
  return [
    {
      text: labels.blog,
      items: [
        { text: labels.allArticles, link: `/${lang}/blog/` }
      ]
    },
    {
      text: labels.mentalGame,
      collapsed: false,
      items: [
        { text: 'Why Elite Players Need Mental Training', link: `/${lang}/blog/mental-vs-technical` },
        { text: 'Understanding the Inner Critic', link: `/${lang}/blog/inner-critic` },
        { text: 'Building Pre-Shot Routines', link: `/${lang}/blog/pre-shot-routines` },
        { text: 'Pressure Management', link: `/${lang}/blog/pressure-management` }
      ]
    },
    {
      text: labels.performance,
      collapsed: false,
      items: [
        { text: 'The Science Behind Flow States', link: `/${lang}/blog/flow-state-science` },
        { text: 'Mindfulness in Competition', link: `/${lang}/blog/mindfulness-competition` },
        { text: 'Goal Setting for Elite Athletes', link: `/${lang}/blog/elite-goal-setting` },
        { text: 'Mental Resilience', link: `/${lang}/blog/mental-resilience` }
      ]
    },
    {
      text: labels.teamDynamics,
      collapsed: true,
      items: [
        { text: 'Communication Under Pressure', link: `/${lang}/blog/team-communication` },
        { text: 'Building Team Chemistry', link: `/${lang}/blog/team-chemistry` },
        { text: 'Leadership in Pétanque', link: `/${lang}/blog/team-leadership` }
      ]
    },
    {
      text: labels.training,
      collapsed: true,
      items: [
        { text: '5 Mental Training Mistakes', link: `/${lang}/blog/mental-training-mistakes` },
        { text: 'Structuring Your Practice', link: `/${lang}/blog/practice-structure` },
        { text: 'Competition Preparation', link: `/${lang}/blog/competition-prep` }
      ]
    }
  ]
}

