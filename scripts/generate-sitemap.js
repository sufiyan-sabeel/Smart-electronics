const fs = require('fs')
const path = require('path')

const siteUrl = 'https://smartelectronics.demo'

const staticPages = [
  '',
  '/products',
  '/brands',
  '/offers',
  '/services',
  '/about',
  '/contact',
]

const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0]

  const urls = staticPages.map(page => {
    const url = `${siteUrl}${page === '' ? '/' : page}/`
    const priority = page === '' ? '1.0' : '0.8'
    const changefreq = page === '' ? 'daily' : 'weekly'
    
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`

  const publicDir = path.join(__dirname, 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
  console.log('sitemap.xml generated successfully!')
}

generateSitemap()