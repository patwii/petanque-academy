# Google AdSense Setup Guide for Pétanque Academy

## Overview

Google Ads (AdSense) has been integrated into your VitePress site. Follow these steps to complete the setup and start earning revenue.

## Step 1: Sign Up for Google AdSense

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Click "Get Started" and sign in with your Google account
3. Fill in your website URL: `https://your-domain.com`
4. Complete the application form
5. Wait for approval (usually 1-2 weeks)

## Step 2: Get Your Publisher ID and Ad Slots

Once approved, you'll receive:
- **Publisher ID**: Format `ca-pub-XXXXXXXXXXXXXXXX` (16 digits)
- **Ad Slot IDs**: Format `YYYYYYYYYY` (10 digits) - one for each ad unit

### Creating Ad Units

1. Log into your AdSense account
2. Go to **Ads** → **By ad unit**
3. Create these ad units:
   - **Banner Ad**: Display ad (responsive)
   - **Sidebar Ad**: Display ad (responsive)
   - **In-Article Ad**: In-article ad (responsive)

## Step 3: Update Configuration Files

### Update `docs/.vitepress/config.ts`

Replace `ca-pub-XXXXXXXXXXXXXXXX` with your actual Publisher ID:

```typescript
['script', { 
  async: '', 
  src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX',
  crossorigin: 'anonymous'
}]
```

### Update Ad Components

Update these files with your Publisher ID and Ad Slot IDs:

1. **`docs/.vitepress/theme/components/AdBanner.vue`**
   - Replace `ca-pub-XXXXXXXXXXXXXXXX` with your Publisher ID
   - Replace `YYYYYYYYYY` with your Banner Ad Slot ID

2. **`docs/.vitepress/theme/components/AdSidebar.vue`**
   - Replace `ca-pub-XXXXXXXXXXXXXXXX` with your Publisher ID
   - Replace `ZZZZZZZZZZ` with your Sidebar Ad Slot ID

3. **`docs/.vitepress/theme/components/AdInArticle.vue`**
   - Replace `ca-pub-XXXXXXXXXXXXXXXX` with your Publisher ID
   - Replace `AAAAAAAAAA` with your In-Article Ad Slot ID

## Step 4: Add Ads to Your Pages

You can now add ads anywhere in your markdown files:

### Banner Ad (Top/Bottom of Page)

```markdown
# Your Page Title

<AdBanner />

Your content here...

<AdBanner />
```

### In-Article Ad (Middle of Content)

```markdown
## Section 1

Content here...

<AdInArticle />

## Section 2

More content...
```

### Sidebar Ad (Custom Layout)

For sidebar ads, you'll need to create a custom layout. See the "Advanced Setup" section below.

## Step 5: Verify Installation

1. Add the AdSense verification code to your site (if required)
2. Deploy your site
3. Visit your site and check that ads appear
4. Go to AdSense dashboard to verify ad impressions

## Best Practices for Ad Placement

### Recommended Placements

1. **Top of page** (after title): `<AdBanner />`
2. **Middle of long articles**: `<AdInArticle />`
3. **Bottom of page**: `<AdBanner />`
4. **Between sections**: `<AdInArticle />`

### Example: Education Page with Ads

```markdown
---
title: SMART Goals for Pétanque
---

# SMART Goals for Pétanque

<AdBanner />

The SMART framework transforms vague aspirations into concrete action plans...

## What is SMART?

Content here...

<AdInArticle />

## Specific

More content...

## Measurable

Even more content...

<AdBanner />
```

### Don't Overdo It!

- **Maximum 3 ads per page** for best user experience
- Space ads at least 2-3 paragraphs apart
- Don't place ads in navigation or headers
- Avoid placing ads near buttons or links (against AdSense policy)

## Advanced Setup: Custom Layout with Sidebar Ads

Create `docs/.vitepress/theme/Layout.vue`:

```vue
<template>
  <Layout>
    <template #aside-outline-after>
      <AdSidebar />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import AdSidebar from './components/AdSidebar.vue'

const { Layout } = DefaultTheme
</script>
```

Then update `docs/.vitepress/theme/index.ts`:

```typescript
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // ... existing code
  }
}
```

## Monitoring Revenue

1. Log into [AdSense Dashboard](https://www.google.com/adsense/)
2. View reports: **Reports** → **Overview**
3. Track metrics:
   - **Page views**: How many pages were viewed
   - **Impressions**: How many times ads were shown
   - **Clicks**: How many times ads were clicked
   - **CPC** (Cost Per Click): Average earnings per click
   - **RPM** (Revenue Per Mille): Earnings per 1000 impressions
   - **Estimated earnings**: Your revenue

## Typical Earnings

Revenue varies greatly based on:
- **Traffic volume**: More visitors = more revenue
- **Niche**: Sports/education typically earns $1-5 per 1000 views
- **Geography**: Visitors from US/UK/Canada earn more
- **Engagement**: Higher engagement = better ad performance

### Rough Estimates

- 1,000 monthly visitors: $2-10/month
- 10,000 monthly visitors: $20-100/month
- 100,000 monthly visitors: $200-1000/month

## Troubleshooting

### Ads Not Showing

1. **Check approval status**: Make sure AdSense approved your site
2. **Verify IDs**: Double-check Publisher ID and Ad Slot IDs
3. **Clear cache**: Clear browser cache and rebuild site
4. **Check console**: Open browser DevTools for errors
5. **Wait**: New ad units can take 10-20 minutes to activate

### Policy Violations

Avoid these common violations:
- ❌ Clicking your own ads
- ❌ Asking users to click ads
- ❌ Placing ads on error pages
- ❌ Too many ads (more than 3 per page)
- ❌ Ads near misleading content

## Next Steps

1. ✅ Sign up for AdSense
2. ✅ Get approved
3. ✅ Get your Publisher ID and Ad Slot IDs
4. ✅ Update configuration files
5. ✅ Add ads to your pages
6. ✅ Deploy and test
7. ✅ Monitor revenue

Good luck with monetization! 🎯

