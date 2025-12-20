# How to Add Google Ads to Your Pages

## Current Status

✅ **AdSense Account:** Getting your site ready to show ads
✅ **Site Connected:** carreau.app
✅ **Ad Components:** Created and registered
⏳ **Waiting for:** Google approval (1-7 days typically)

## When Will Ads Appear?

### Timeline:
1. **Now:** "Getting your site ready to show ads"
2. **1-7 days:** Google reviews your content
3. **Email notification:** "Your site is ready to show ads"
4. **24-48 hours later:** Ads start appearing

### You'll know it's ready when:
- You receive an email from Google AdSense
- Status changes to "Ready" with green checkmark
- Test ads appear on your pages

## How to Add Ads to Pages

### Available Ad Components

You have 3 types of ad components:

1. **`<AdBanner />`** - Horizontal banner (top/bottom of pages)
2. **`<AdInArticle />`** - In-article ad (middle of content)
3. **`<AdSidebar />`** - Sidebar ad (for custom layouts)

### Where I've Already Added Ads

✅ **docs/en/ambition.md**
- Banner at top (after title)
- Banner at bottom (after content)

✅ **docs/en/food.md**
- Banner at top (after title)
- In-article ad (middle of page)

### How to Add Ads to More Pages

Simply add the component tags in your markdown files:

#### Example 1: Banner at Top

```markdown
# Your Page Title

<AdBanner />

Your content starts here...
```

#### Example 2: In-Article Ad

```markdown
## First Section

Some content here...

<AdInArticle />

## Second Section

More content here...
```

#### Example 3: Banner at Bottom

```markdown
Your content...

## Conclusion

Final thoughts...

<AdBanner />
```

### Recommended Pages to Add Ads

**High-value content pages** (add ads to these):

1. **Education pages:**
   - `docs/en/education/index.md`
   - `docs/en/education/nutrition/index.md`
   - `docs/en/education/mental-strength/index.md`
   - `docs/en/education/mindfulness/index.md`
   - `docs/en/education/tactics/index.md`

2. **Main pages:**
   - `docs/en/workshop.md`
   - `docs/en/technical/index.md`

3. **Detailed guides:**
   - `docs/en/education/goals/smart-goals.md`
   - `docs/en/education/training/drills.md`
   - `docs/en/education/mindfulness/techniques.md`

**Don't add ads to:**
- Homepage (`docs/en/index.md`) - Uses special layout
- Very short pages - Not enough content
- Navigation pages - Poor user experience

### Best Practices

#### 1. Don't Overdo It
- **Maximum 3 ads per page** (Google's recommendation)
- More ads ≠ more money (can actually reduce earnings)
- Focus on user experience

#### 2. Strategic Placement
- **Top banner:** After title, before main content
- **In-article:** After 2-3 paragraphs or sections
- **Bottom banner:** After conclusion, before footer

#### 3. Good Example Layout

```markdown
# Page Title

<AdBanner />

## Introduction
Content...

## Main Section
Content...

<AdInArticle />

## Another Section
Content...

## Conclusion
Final thoughts...

<AdBanner />
```

## Multi-Language Support

### Important: Only Add Ads to English Pages First

The ad components work in all languages, but:
1. **Start with English pages** (`docs/en/`)
2. **Test and verify** ads appear correctly
3. **Then copy to other languages** if desired

### To Add Ads to All Languages

If you want ads on all language versions:

```bash
# Example: Add banner to ambition page in all languages
for lang in da de es fr it nl no pt sv; do
  # Add your ad component to each language file
  # (You'll need to edit each file manually or use a script)
done
```

## Testing Ads

### Before Approval
- Ads won't show yet
- No errors in browser console = correctly configured
- Components are invisible until Google approves

### After Approval
1. **Clear browser cache**
2. **Visit your site:** https://academy.carreau.app
3. **Check pages where you added components**
4. **Ads should appear** within 24-48 hours

### Troubleshooting

**"I don't see ads after approval"**
- Wait 24-48 hours after approval email
- Clear browser cache
- Check AdSense dashboard for errors
- Verify components are on the page (View Page Source)

**"Ads show in some places but not others"**
- Normal - Google doesn't always have ads for every slot
- Fill rate varies by content, geography, time of day
- Some pages may not show ads if content doesn't match advertiser needs

**"I see blank spaces where ads should be"**
- Ad blocker enabled (disable to test)
- Google hasn't filled the ad slot yet
- Content policy issue (check AdSense dashboard)

## Revenue Expectations

### Realistic Estimates

With your current traffic:

| Monthly Visitors | Expected Revenue |
|-----------------|------------------|
| 1,000 | $2-10/month |
| 5,000 | $10-50/month |
| 10,000 | $20-100/month |
| 50,000 | $100-500/month |
| 100,000 | $200-1,000/month |

**Factors that affect revenue:**
- Content quality and niche
- Visitor geography (US/EU pays more)
- Engagement (time on page)
- Ad placement
- Season (higher in Q4)

### Tips to Maximize Revenue

1. **Create quality content** - More pages = more ad opportunities
2. **Focus on high-value topics** - Nutrition, training, equipment
3. **Improve SEO** - More organic traffic = more ad views
4. **Optimize placement** - Test different positions
5. **Be patient** - Revenue grows with traffic over time

## Next Steps

### Right Now:
1. ✅ Wait for Google approval email (1-7 days)
2. ✅ Add ads to 5-10 high-value pages (see recommended list above)
3. ✅ Deploy changes to production

### After Approval:
1. Monitor AdSense dashboard
2. Check which pages perform best
3. Adjust ad placement based on data
4. Add ads to more pages gradually

### Commands to Deploy

```bash
# Build the site
npm run docs:build

# Commit and push
git add .
git commit -m "Add Google Ads to content pages"
git push
```

## Questions?

- **AdSense Help:** https://support.google.com/adsense/
- **Policy Center:** https://support.google.com/adsense/answer/48182
- **Performance Reports:** https://www.google.com/adsense/ → Reports

---

**Remember:** Ads won't show until Google approves your site. Be patient, keep creating quality content, and the revenue will follow! 🎯

