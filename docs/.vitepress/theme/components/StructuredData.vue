<template>
  <component :is="'script'" type="application/ld+json" v-html="structuredData"></component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { page, frontmatter } = useData()
const route = useRoute()

const structuredData = computed(() => {
  const baseUrl = 'https://carreau.app'
  const currentUrl = `${baseUrl}${route.path}`
  
  // Organization Schema
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pétanque Academy",
    "url": baseUrl,
    "logo": `${baseUrl}/img.png`,
    "description": "Elite pétanque player development platform focusing on mental game mastery, flow states, and performance psychology",
    "founder": {
      "@type": "Person",
      "name": "Patrik Wiik",
      "email": "patrik.wiik@gmail.com"
    },
    "sameAs": [
      "https://www.facebook.com/patrik.wiik"
    ]
  }
  
  // Website Schema
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pétanque Academy",
    "url": baseUrl,
    "description": "Comprehensive education platform for elite pétanque players",
    "inLanguage": ["en", "fr", "de", "es", "sv", "da", "no", "it", "nl", "pt"],
    "publisher": {
      "@type": "Organization",
      "name": "Pétanque Academy",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/img.png`
      }
    }
  }
  
  // Article/Educational Content Schema
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": frontmatter.value.title || page.value.title,
    "description": frontmatter.value.description || "Elite pétanque training content",
    "url": currentUrl,
    "datePublished": frontmatter.value.date || "2024-01-01",
    "dateModified": page.value.lastUpdated || frontmatter.value.date || "2024-01-01",
    "author": {
      "@type": "Person",
      "name": "Patrik Wiik",
      "email": "patrik.wiik@gmail.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pétanque Academy",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/img.png`
      }
    },
    "image": `${baseUrl}/img.png`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    }
  }
  
  // Educational Course Schema for education pages
  const isEducationPage = route.path.includes('/education/')
  const course = isEducationPage ? {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": frontmatter.value.title || page.value.title,
    "description": frontmatter.value.description || "Elite pétanque training module",
    "provider": {
      "@type": "Organization",
      "name": "Pétanque Academy",
      "url": baseUrl
    },
    "educationalLevel": "Advanced",
    "inLanguage": route.path.split('/')[1] || "en",
    "url": currentUrl
  } : null
  
  // Breadcrumb Schema
  const pathParts = route.path.split('/').filter(p => p)
  const breadcrumbItems = pathParts.map((part, index) => {
    const position = index + 1
    const url = `${baseUrl}/${pathParts.slice(0, position).join('/')}`
    return {
      "@type": "ListItem",
      "position": position,
      "name": part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
      "item": url
    }
  })
  
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  }
  
  // Combine all schemas
  const schemas = [organization, website, article, breadcrumb]
  if (course) {
    schemas.push(course)
  }
  
  return JSON.stringify(schemas)
})
</script>

