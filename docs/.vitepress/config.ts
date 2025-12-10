import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Pétanque Academy",
  description: "Elite player development - From technique to flow",
  ignoreDeadLinks: true,

  head: [
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-JG6034BPGE' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JG6034BPGE');
    `]
  ],

  locales: {
    da: {
      label: 'Dansk',
      lang: 'da',
      link: '/da/'
    },
    de: {
      label: 'Deutsch',
      lang: 'de',
      link: '/de/'
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/'
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/'
    },
    fr: {
      label: 'Français',
      lang: 'fr',
      link: '/fr/'
    },
    it: {
      label: 'Italiano',
      lang: 'it',
      link: '/it/'
    },
    nl: {
      label: 'Nederlands',
      lang: 'nl',
      link: '/nl/'
    },
    no: {
      label: 'Norsk',
      lang: 'no',
      link: '/no/'
    },
    pt: {
      label: 'Português',
      lang: 'pt',
      link: '/pt/'
    },
    sv: {
      label: 'Svenska',
      lang: 'sv',
      link: '/sv/'
    }
  },

  themeConfig: {
    nav: [
      { text: 'Home', link: '/en/' },
      { text: 'Ambition', link: '/en/ambition' },
      { text: 'News', link: '/en/news/' },
      { text: 'Workshop', link: '/en/workshop' },
      { text: 'Education', link: '/en/education/' },
      { text: 'Technical Advice', link: '/en/technical/' },
      { text: 'Food', link: '/en/food' }
    ],

    sidebar: {
      '/en/education/': [
        {
          text: 'Education',
          items: [
            { text: 'Overview', link: '/en/education/' }
          ]
        },
        {
          text: 'The Zone',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/en/education/the-zone/' },
            { text: 'Technical vs Flow Training', link: '/en/education/the-zone/technical-vs-flow' },
            { text: 'Entering the Zone', link: '/en/education/the-zone/entering-the-zone' }
          ]
        },
        {
          text: 'Mindfulness',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/en/education/mindfulness/' },
            { text: 'Techniques', link: '/en/education/mindfulness/techniques' },
            { text: 'Daily Practice', link: '/en/education/mindfulness/daily-practice' }
          ]
        },
        {
          text: 'Goal Setting',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/en/education/goals/' },
            { text: 'SMART Goals', link: '/en/education/goals/smart-goals' },
            { text: 'Planning Your Development', link: '/en/education/goals/planning' }
          ]
        },
        {
          text: 'Mental Strength',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/en/education/mental-strength/' },
            { text: 'Handling Pressure', link: '/en/education/mental-strength/handling-pressure' },
            { text: 'Pre-Shot Routine', link: '/en/education/mental-strength/pre-shot-routine' }
          ]
        },
        {
          text: 'Team Dynamics',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/en/education/team-player/' },
            { text: 'Communication', link: '/en/education/team-player/communication' }
          ]
        },
        {
          text: 'Tactics',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/en/education/tactics/' },
            { text: 'Probability-Based Decisions', link: '/en/education/tactics/probability' }
          ]
        },
        {
          text: 'Training Methods',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/en/education/training/' },
            { text: 'Training Drills', link: '/en/education/training/drills' }
          ]
        },
        {
          text: 'Nutrition',
          collapsed: false,
          items: [
            { text: 'Fueling Performance', link: '/en/education/nutrition/' }
          ]
        }
      ],
      '/en/technical/': [
        {
          text: 'Technical Advice',
          items: [
            { text: 'Overview', link: '/en/technical/' },
            { text: 'Palette of Throws', link: '/en/technical/throws' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/petanque-academy' }
    ]
  }
})

