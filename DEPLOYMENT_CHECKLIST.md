# Deployment Checklist for SEO Improvements

## Pre-Deployment Verification

### 1. Test Build Locally
```bash
# Generate sitemap
npm run generate:sitemap

# Build the site
npm run docs:build

# Preview the build
npm run docs:preview
```

**Expected Results:**
- ✅ Build completes without errors
- ✅ Sitemap generated with 360 URLs
- ✅ Preview shows site correctly

### 2. Verify New Files Created
```bash
# Check new content files
ls -la docs/en/case-studies.md
ls -la docs/en/blog/index.md
ls -la docs/en/blog/mental-vs-technical.md
ls -la docs/en/testimonials.md

# Check new components
ls -la docs/.vitepress/theme/components/StructuredData.vue
ls -la docs/.vitepress/theme/Layout.vue

# Check sitemap and robots
ls -la docs/public/sitemap.xml
ls -la docs/public/robots.txt
```

**Expected Results:**
- ✅ All files exist
- ✅ No errors in file creation

---

## Deployment Steps

### Step 1: Commit Changes
```bash
git add .
git commit -m "Major SEO improvements for AdSense compliance

- Added comprehensive meta tags (SEO, Open Graph, Twitter)
- Implemented Schema.org structured data (5 types)
- Created sitemap.xml with 360 URLs and hreflang
- Added robots.txt for proper crawling
- Implemented hreflang tags for multi-language support
- Added 5,000+ words of unique content (case studies, blog, testimonials)
- Performance optimizations (minification, code splitting)
- Updated navigation with Resources section"

git push origin main
```

### Step 2: Monitor Deployment
1. Go to GitHub repository
2. Click "Actions" tab
3. Watch the deployment workflow
4. Wait for green checkmark (usually 2-5 minutes)

### Step 3: Verify Live Site
After deployment completes, check:

```
✅ https://carreau.app/sitemap.xml
✅ https://carreau.app/robots.txt
✅ https://carreau.app/en/case-studies
✅ https://carreau.app/en/blog/
✅ https://carreau.app/en/testimonials
```

---

## Post-Deployment Verification

### 1. Check Meta Tags
Visit any page and view source (Ctrl+U):

**Look for:**
- `<meta name="keywords" content="pétanque, petanque..."`
- `<meta property="og:title"...`
- `<meta name="twitter:card"...`
- `<link rel="canonical"...`
- `<link rel="alternate" hreflang="en"...`

### 2. Verify Structured Data
Use Google Rich Results Test:
```
https://search.google.com/test/rich-results
```

**Test URLs:**
- https://carreau.app/en/
- https://carreau.app/en/education/
- https://carreau.app/en/case-studies

**Expected Results:**
- ✅ Organization schema detected
- ✅ WebSite schema detected
- ✅ Article schema detected
- ✅ Breadcrumb schema detected
- ✅ No errors

### 3. Test Performance
Use PageSpeed Insights:
```
https://pagespeed.web.dev/
```

**Test URL:** https://carreau.app

**Target Scores:**
- Mobile: 85+ (good), 90+ (excellent)
- Desktop: 95+ (good), 98+ (excellent)

### 4. Verify Sitemap
```
https://carreau.app/sitemap.xml
```

**Check:**
- ✅ 360 URLs listed
- ✅ Proper XML format
- ✅ Hreflang alternates present
- ✅ Priority and changefreq set

---

## Google Search Console Setup

### 1. Submit Sitemap
1. Go to https://search.google.com/search-console
2. Select carreau.app property
3. Go to "Sitemaps" in left menu
4. Enter: `sitemap.xml`
5. Click "Submit"

**Expected Result:**
- ✅ Sitemap submitted successfully
- ✅ URLs discovered (may take 1-3 days)

### 2. Request Indexing for Key Pages
Request indexing for:
- https://carreau.app/en/
- https://carreau.app/en/education/
- https://carreau.app/en/case-studies
- https://carreau.app/en/blog/mental-vs-technical
- https://carreau.app/en/testimonials

**How to:**
1. Use URL Inspection tool
2. Enter URL
3. Click "Request Indexing"

### 3. Monitor Core Web Vitals
1. Go to "Core Web Vitals" report
2. Check for issues
3. Monitor over next 2-4 weeks

---

## AdSense Review Request

### Wait Period
**Wait 1-2 weeks** after deployment before requesting review to allow:
- Google to crawl new content
- New pages to be indexed
- Core Web Vitals data to accumulate

### When Ready to Request Review

1. **Go to AdSense Dashboard**
   - https://www.google.com/adsense

2. **Navigate to Sites**
   - Click on carreau.app

3. **Request Review**
   - Click "Request Review" button

4. **Provide Context** (if there's a message field)
   ```
   I have made significant improvements to address the "low value content" concern:
   
   1. Added substantial unique content:
      - Detailed case studies (2,000+ words)
      - In-depth blog articles (1,500+ words)
      - Player testimonials and feedback
   
   2. Implemented comprehensive SEO:
      - Proper meta tags and structured data
      - Sitemap with 360 URLs
      - Multi-language support with hreflang
   
   3. Improved site performance:
      - Optimized loading speed
      - Better Core Web Vitals
   
   The site now provides substantial educational value for elite pétanque 
   players with 100+ pages of original, high-quality content across 10 languages.
   ```

---

## Monitoring Schedule

### Week 1-2 After Deployment
- [ ] Check Google Search Console daily
- [ ] Monitor indexing progress
- [ ] Verify no crawl errors
- [ ] Check Core Web Vitals data

### Week 2-3
- [ ] Request AdSense review (if not done)
- [ ] Continue monitoring Search Console
- [ ] Check for any technical issues

### Week 3-4
- [ ] Monitor AdSense review status
- [ ] Check search rankings for key terms
- [ ] Review analytics data

---

## Troubleshooting

### If Sitemap Not Found
1. Check file exists: `docs/public/sitemap.xml`
2. Verify deployment included the file
3. Clear browser cache and retry
4. Check GitHub Pages deployment logs

### If Structured Data Not Detected
1. View page source - look for `<script type="application/ld+json">`
2. Check browser console for errors
3. Verify Layout.vue is being used
4. Test with Rich Results Test tool

### If Pages Not Indexing
1. Check robots.txt allows crawling
2. Verify sitemap submitted in Search Console
3. Request indexing manually
4. Check for crawl errors in Search Console

### If Performance Score Low
1. Check for large images
2. Verify minification is working
3. Check for third-party script issues
4. Review PageSpeed recommendations

---

## Success Criteria

### Technical SEO ✅
- [x] Meta tags on all pages
- [x] Structured data implemented
- [x] Sitemap generated and submitted
- [x] Robots.txt configured
- [x] Hreflang tags working
- [x] Performance optimized

### Content Quality ✅
- [x] 5,000+ words of unique content added
- [x] Case studies with real examples
- [x] In-depth blog articles
- [x] Testimonials and social proof
- [x] Clear value proposition

### User Experience ✅
- [x] Fast loading times
- [x] Mobile-friendly
- [x] Clear navigation
- [x] Professional design
- [x] Multi-language support

---

## Expected Timeline

| Milestone | Timeline | Status |
|-----------|----------|--------|
| Deploy changes | Day 0 | ⏳ Pending |
| Google crawls sitemap | 1-3 days | ⏳ Pending |
| New content indexed | 3-7 days | ⏳ Pending |
| Request AdSense review | 7-14 days | ⏳ Pending |
| AdSense review complete | 14-28 days | ⏳ Pending |

---

## Contact & Support

**Questions?** Email: patrik.wiik@gmail.com

**Documentation:**
- `SEO_IMPROVEMENTS_SUMMARY.md` - Complete overview
- `PERFORMANCE_OPTIMIZATION.md` - Performance details
- This file - Deployment steps

---

**Ready to deploy!** 🚀

