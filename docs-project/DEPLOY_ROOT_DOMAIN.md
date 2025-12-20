# Deploy carreau.app Root Domain - Quick Guide

## Step-by-Step Instructions for patwii

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. **Repository name:** `carreau-root`
3. **Public** ✅
4. **Don't** check any initialization options
5. Click **Create repository**

### Step 2: Push Code to GitHub

```bash
cd root-domain
git init
git add .
git commit -m "Initial commit - Carreau landing page with AdSense verification"
git remote add origin https://github.com/patwii/carreau-root.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to: https://github.com/patwii/carreau-root/settings/pages
2. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
   - Click **Save**
3. Under **Custom domain**:
   - Enter: `carreau.app`
   - Click **Save**
   - Wait a moment, then check **Enforce HTTPS**

### Step 4: Update DNS Settings

Go to your DNS provider (where you manage carreau.app) and add these records:

**Delete any existing A records for @ (root), then add:**

```
Type: A
Name: @ (or blank/root)
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**Keep your existing academy subdomain CNAME:**
```
Type: CNAME
Name: academy
Value: patwii.github.io
```

### Step 5: Wait for DNS Propagation

- **Time:** Usually 10-30 minutes, can take up to 48 hours
- **Check status:** https://dnschecker.org/#A/carreau.app

### Step 6: Verify Deployment

Once DNS has propagated, test these URLs:

1. **Landing page:** https://carreau.app
   - Should show the Carreau landing page
   
2. **ads.txt:** https://carreau.app/ads.txt
   - Should show: `google.com, pub-2291330857070799, DIRECT, f08c47fec0942fa0`

3. **View source:** Right-click on https://carreau.app → View Page Source
   - Search for: `google-adsense-account`
   - Should find: `<meta name="google-adsense-account" content="ca-pub-2291330857070799">`

### Step 7: Verify in AdSense

1. Go to: https://www.google.com/adsense/
2. Click **Sites** in the left menu
3. Click **Add site**
4. Enter: `carreau.app` (not http://, just the domain)
5. Click **Save and continue**
6. Choose verification method: **AdSense code** or **Meta tag**
7. Click **Verify**
8. ✅ Should verify successfully!

## Troubleshooting

### "Repository not found" when pushing
- Make sure you created the repo on GitHub first
- Check the URL: https://github.com/patwii/carreau-root

### DNS not propagating
- Wait longer (can take up to 48 hours)
- Check with: `dig carreau.app`
- Use: https://dnschecker.org/#A/carreau.app

### GitHub Pages not working
- Make sure branch is set to `main` and folder to `/`
- Check that CNAME file exists in the repo
- Wait 5-10 minutes after enabling Pages

### AdSense verification fails
- Make sure DNS has fully propagated
- Check that https://carreau.app/ads.txt is accessible
- Check that meta tag is in page source
- Wait 10-15 minutes and try again

## Summary

After completion, you'll have:

- ✅ **carreau.app** - Landing page with AdSense verification
- ✅ **academy.carreau.app** - Pétanque Academy (unchanged)
- ✅ **AdSense verified** - Can show ads on both domains
- ✅ **Both on GitHub Pages** - Easy to manage

## Quick Commands

```bash
# Navigate to root-domain folder
cd root-domain

# Deploy
git init
git add .
git commit -m "Initial commit - Carreau landing page with AdSense verification"
git remote add origin https://github.com/patwii/carreau-root.git
git branch -M main
git push -u origin main
```

That's it! 🚀

