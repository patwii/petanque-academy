import DefaultTheme from 'vitepress/theme'
import './mermaid-dark.css'
import './custom-containers.css'
import AdBanner from './components/AdBanner.vue'
import AdSidebar from './components/AdSidebar.vue'
import AdInArticle from './components/AdInArticle.vue'
import StructuredData from './components/StructuredData.vue'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Register ad components globally
    app.component('AdBanner', AdBanner)
    app.component('AdSidebar', AdSidebar)
    app.component('AdInArticle', AdInArticle)
    app.component('StructuredData', StructuredData)
  }
}

