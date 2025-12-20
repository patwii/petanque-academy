# Performance Optimization Guide

## Implemented Optimizations

### 1. Build Configuration
- **Minification**: Enabled Terser for JavaScript minification
- **CSS Minification**: Enabled for smaller stylesheet sizes
- **Code Splitting**: Mermaid library separated into its own chunk
- **SSR Optimization**: Configured for VitePress plugin compatibility

### 2. Image Optimization
Current image: `/img.png`

**Recommendations:**
- Convert to WebP format for better compression
- Create multiple sizes for responsive images
- Add lazy loading attributes
- Consider using a CDN for image delivery

### 3. Caching Strategy
**Browser Caching Headers** (configure in hosting):
```
Cache-Control: public, max-age=31536000, immutable  # For static assets
Cache-Control: public, max-age=3600                 # For HTML pages
```

### 4. Font Optimization
Currently using system fonts (good for performance):
```css
font-family: ui-sans-serif, system-ui, sans-serif
```

**Benefits:**
- No font download required
- Instant text rendering
- Smaller page size

### 5. JavaScript Optimization
- **Lazy Loading**: VitePress automatically lazy loads routes
- **Tree Shaking**: Unused code automatically removed
- **Code Splitting**: Each page loads only required JavaScript

### 6. CSS Optimization
- **Critical CSS**: VitePress inlines critical CSS
- **Minification**: Enabled in build config
- **Scoped Styles**: Component-specific CSS reduces conflicts

## Performance Metrics to Monitor

### Core Web Vitals

1. **Largest Contentful Paint (LCP)**
   - Target: < 2.5 seconds
   - Current optimization: Minimal images, system fonts

2. **First Input Delay (FID)**
   - Target: < 100 milliseconds
   - Current optimization: Code splitting, lazy loading

3. **Cumulative Layout Shift (CLS)**
   - Target: < 0.1
   - Current optimization: No dynamic content shifts

### Additional Metrics

- **Time to First Byte (TTFB)**: Depends on hosting
- **Total Page Size**: Optimized through minification
- **Number of Requests**: Minimized through bundling

## Testing Tools

### Google PageSpeed Insights
```
https://pagespeed.web.dev/
```
Test URL: `https://carreau.app`

### WebPageTest
```
https://www.webpagetest.org/
```

### Lighthouse (Chrome DevTools)
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Run audit for Performance, SEO, Accessibility

## Hosting Recommendations

### GitHub Pages (Current)
**Pros:**
- Free hosting
- Automatic HTTPS
- Good global CDN

**Cons:**
- Limited control over headers
- No server-side caching control

### Optimization for GitHub Pages
1. Enable HTTPS (already done via CNAME)
2. Use `cleanUrls: true` (already enabled)
3. Minimize build output size

### Alternative: Netlify
**Benefits:**
- Better caching control
- Edge functions
- Automatic image optimization
- Better performance metrics

**Migration:**
1. Connect GitHub repo to Netlify
2. Build command: `npm run docs:build`
3. Publish directory: `docs/.vitepress/dist`
4. Configure custom domain

## Content Delivery Network (CDN)

### Current Setup
GitHub Pages provides basic CDN functionality.

### Cloudflare (Free Tier)
**Benefits:**
- Global CDN
- Automatic minification
- Image optimization
- DDoS protection
- Analytics

**Setup:**
1. Create Cloudflare account
2. Add carreau.app domain
3. Update nameservers
4. Enable optimization features

## Monitoring Performance

### Google Search Console
Monitor:
- Core Web Vitals report
- Page experience signals
- Mobile usability
- Index coverage

### Google Analytics
Track:
- Page load times
- Bounce rate
- User engagement
- Geographic performance

## Continuous Optimization

### Regular Checks
- [ ] Monthly PageSpeed Insights audit
- [ ] Quarterly performance review
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Review and optimize largest pages

### Future Improvements
1. **Image Optimization**
   - Convert to WebP
   - Implement responsive images
   - Add lazy loading

2. **Advanced Caching**
   - Service Worker for offline support
   - Precaching critical resources

3. **Resource Hints**
   - DNS prefetch for external resources
   - Preconnect to critical origins

4. **Bundle Optimization**
   - Analyze bundle size
   - Remove unused dependencies
   - Optimize third-party scripts

## Current Performance Status

✅ **Implemented:**
- Minification (JS & CSS)
- Code splitting
- Clean URLs
- System fonts
- Lazy loading
- Tree shaking

⏳ **Pending:**
- Image optimization
- CDN setup (optional)
- Advanced caching headers
- Service Worker (optional)

## Expected Results

With current optimizations:
- **LCP**: < 2.5s (good)
- **FID**: < 100ms (good)
- **CLS**: < 0.1 (good)
- **PageSpeed Score**: 85-95 (mobile), 95-100 (desktop)

## Next Steps

1. Deploy changes and test with PageSpeed Insights
2. Monitor Core Web Vitals in Google Search Console
3. Consider Cloudflare for additional CDN benefits
4. Optimize images if performance issues detected

