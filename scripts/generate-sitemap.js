import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const baseUrl = 'https://carreau.app'
const languages = ['en', 'da', 'de', 'es', 'fr', 'it', 'nl', 'no', 'pt', 'sv']

// Define all pages (without language prefix)
const pages = [
  '',  // home
  'about',
  'ambition',
  'news/',
  'blog/',
  'blog/mental-vs-technical',
  'case-studies',
  'testimonials',
  'workshop',
  'training-camp',
  'training-session',
  'goal-template',
  'diary-template',
  'food',
  'education/',
  'education/the-zone/',
  'education/the-zone/technical-vs-flow',
  'education/the-zone/entering-the-zone',
  'education/mindfulness/',
  'education/mindfulness/techniques',
  'education/mindfulness/daily-practice',
  'education/goals/',
  'education/goals/smart-goals',
  'education/goals/planning',
  'education/mental-strength/',
  'education/mental-strength/handling-pressure',
  'education/mental-strength/pre-shot-routine',
  'education/team-player/',
  'education/team-player/communication',
  'education/tactics/',
  'education/tactics/probability',
  'education/training/',
  'education/training/drills',
  'education/nutrition/',
  'technical/',
  'technical/throws'
]

function generateSitemap() {
  const now = new Date().toISOString().split('T')[0]
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
  sitemap += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
  
  // Generate URLs for each page in each language
  pages.forEach(page => {
    languages.forEach(lang => {
      const url = `${baseUrl}/${lang}/${page}`
      const priority = page === '' ? '1.0' : 
                      page.includes('education/') ? '0.9' : 
                      page.includes('/') ? '0.8' : '0.7'
      const changefreq = page === '' || page === 'news/' ? 'weekly' : 'monthly'
      
      sitemap += '  <url>\n'
      sitemap += `    <loc>${url}</loc>\n`
      sitemap += `    <lastmod>${now}</lastmod>\n`
      sitemap += `    <changefreq>${changefreq}</changefreq>\n`
      sitemap += `    <priority>${priority}</priority>\n`
      
      // Add xhtml:link for alternate language versions
      languages.forEach(altLang => {
        const altUrl = `${baseUrl}/${altLang}/${page}`
        sitemap += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${altUrl}"/>\n`
      })
      
      sitemap += '  </url>\n'
    })
  })
  
  sitemap += '</urlset>'
  
  // Write to docs/public/sitemap.xml
  const outputPath = resolve(__dirname, '../docs/public/sitemap.xml')
  writeFileSync(outputPath, sitemap, 'utf-8')
  console.log(`✅ Sitemap generated at ${outputPath}`)
  console.log(`📊 Total URLs: ${pages.length * languages.length}`)
}

generateSitemap()

