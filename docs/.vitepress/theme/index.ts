import DefaultTheme from 'vitepress/theme'
import './mermaid-dark.css'
import './custom-containers.css'
import AdBanner from './components/AdBanner.vue'
import AdSidebar from './components/AdSidebar.vue'
import AdInArticle from './components/AdInArticle.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register ad components globally
    app.component('AdBanner', AdBanner)
    app.component('AdSidebar', AdSidebar)
    app.component('AdInArticle', AdInArticle)
  }
}

