# AdSense Verification Fix

## What I've Added

I've added **3 verification methods** to ensure Google can verify your site:

### ✅ 1. Meta Tag (in `<head>`)
```html
<meta name="google-adsense-account" content="ca-pub-2291330857070799">
```
**Location:** `docs/.vitepress/config.ts`

### ✅ 2. AdSense Script
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2291330857070799" crossorigin="anonymous"></script>
```
**Location:** `docs/.vitepress/config.ts`

### ✅ 3. ads.txt File
```
google.com, pub-2291330857070799, DIRECT, f08c47fec0942fa0
```
**Location:** `docs/public/ads.txt`

## Next Steps - IMPORTANT!

### Step 1: Deploy Your Changes

You MUST deploy these changes to your live site for Google to verify:

```bash
# Build the site
npm run docs:build

# Deploy to your hosting (GitHub Pages, Netlify, Vercel, etc.)
git add .
git commit -m "Add AdSense verification"
git push
```

### Step 2: Wait for Deployment

- Wait 5-10 minutes for your site to rebuild and deploy
- Make sure the changes are live on your production URL

### Step 3: Verify the Files Are Accessible

Check these URLs in your browser (replace `your-domain.com` with your actual domain):

1. **Check ads.txt:**
   - Visit: `https://your-domain.com/ads.txt`
   - Should show: `google.com, pub-2291330857070799, DIRECT, f08c47fec0942fa0`

2. **Check meta tag:**
   - Visit your homepage
   - Right-click → "View Page Source"
   - Search for: `google-adsense-account`
   - Should find: `<meta name="google-adsense-account" content="ca-pub-2291330857070799">`

3. **Check AdSense script:**
   - In page source, search for: `adsbygoogle.js`
   - Should find the script tag

### Step 4: Retry Verification in AdSense

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Click **Sites** in the left menu
3. Find your site
4. Click **Verify** or **Retry verification**
5. Wait 1-2 minutes for Google to crawl your site

## Common Issues & Solutions

### Issue 1: "We couldn't verify your site"

**Cause:** Changes not deployed yet or not accessible

**Solution:**
1. Make sure you've deployed the changes
2. Clear your browser cache
3. Check that ads.txt is accessible at `https://your-domain.com/ads.txt`
4. Wait 10-15 minutes and try again

### Issue 2: ads.txt not found (404 error)

**Cause:** VitePress not copying the file to build output

**Solution:**
The `docs/public/` folder should automatically be copied to the root of your site. If not:

1. Check your VitePress config
2. Make sure `docs/public/ads.txt` exists
3. Rebuild: `npm run docs:build`
4. Check `docs/.vitepress/dist/ads.txt` exists after build

### Issue 3: Meta tag not in HTML

**Cause:** Config not updated or build cache

**Solution:**
```bash
# Clear VitePress cache
rm -rf docs/.vitepress/cache
rm -rf docs/.vitepress/dist

# Rebuild
npm run docs:build
```

### Issue 4: Still can't verify after 24 hours

**Try alternative verification:**

1. **Google Search Console Method:**
   - Add your site to [Google Search Console](https://search.google.com/search-console/)
   - Verify ownership there first
   - Then link Search Console to AdSense

2. **Contact AdSense Support:**
   - Go to AdSense → Help → Contact Us
   - Explain you've added all verification methods
   - Provide your site URL and publisher ID

## What Your Domain Is

**Important:** Make sure you're verifying the correct domain!

If your site is at:
- `https://petanque-academy.com` → Verify `petanque-academy.com`
- `https://www.petanque-academy.com` → Verify `www.petanque-academy.com`
- `https://username.github.io/petanque-academy` → Verify `username.github.io`

You need to verify the **root domain** where your site is hosted.

## Testing Checklist

Before retrying verification, check:

- [ ] Changes committed to git
- [ ] Changes pushed to GitHub (or your hosting)
- [ ] Site rebuilt and deployed
- [ ] `https://your-domain.com/ads.txt` is accessible
- [ ] Meta tag visible in page source
- [ ] AdSense script visible in page source
- [ ] Waited at least 10 minutes after deployment

## Quick Test Commands

```bash
# Test ads.txt is accessible
curl https://your-domain.com/ads.txt

# Should return:
# google.com, pub-2291330857070799, DIRECT, f08c47fec0942fa0

# Test meta tag in homepage
curl https://your-domain.com/ | grep google-adsense-account

# Should return:
# <meta name="google-adsense-account" content="ca-pub-2291330857070799">
```

## Timeline

- **Immediate:** Deploy changes
- **5-10 minutes:** Wait for deployment
- **1-2 minutes:** Retry verification in AdSense
- **Success!** Site verified ✅

If verification still fails after following all steps, the issue might be:
1. Domain not accessible to Google's crawler
2. Robots.txt blocking Google
3. Site not yet indexed by Google

Let me know if you need help with any of these steps!

