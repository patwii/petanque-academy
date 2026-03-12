import DefaultTheme from 'vitepress/theme'
import './mermaid-dark.css'
import './custom-containers.css'
import './assessment.css'
import StructuredData from './components/StructuredData.vue'
import AssessmentForm from './components/AssessmentForm.vue'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('StructuredData', StructuredData)
    app.component('AssessmentForm', AssessmentForm)
  }
}

