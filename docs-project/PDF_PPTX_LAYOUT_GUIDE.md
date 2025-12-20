# PDF & PPTX Layout Guide

**Perfect Layout Settings for Professional Materials**

This document contains the exact settings used to create professional, overflow-free PDF and PPTX files from markdown sources.

---

## Overview

**Script Location:** `scripts/python/generate_downloads.py`

**Key Principles:**
- ✅ No text overflow in PPTX slides
- ✅ Smart page breaks in PDFs
- ✅ Tables stay together (never split)
- ✅ Professional typography
- ✅ Excellent readability

---

## PDF Layout Settings

### Typography Styles

```python
# Title
fontSize=32, leading=38, spaceAfter=18, spaceBefore=0
alignment=TA_CENTER, fontName='Helvetica-Bold'

# Subtitle
fontSize=14, leading=18, spaceAfter=24, spaceBefore=6
alignment=TA_CENTER, fontName='Helvetica-Oblique'

# Heading (##)
fontSize=20, leading=24, spaceAfter=14, spaceBefore=24
fontName='Helvetica-Bold', backColor=HexColor('#ecf0f1')
borderPadding=10

# Subheading (###)
fontSize=16, leading=20, spaceAfter=12, spaceBefore=18
fontName='Helvetica-Bold'

# Body Text
fontSize=11, leading=18, spaceAfter=10, spaceBefore=2
alignment=TA_LEFT

# Bullet Points
fontSize=11, leading=18, spaceAfter=8, spaceBefore=2
leftIndent=20

# Highlight Box
fontSize=12, leading=18, spaceAfter=14, spaceBefore=6
textColor=HexColor('#e74c3c'), fontName='Helvetica-Bold'
backColor=HexColor('#fef5e7'), borderPadding=8

# Info Box
fontSize=11, leading=18, spaceAfter=14, spaceBefore=6
textColor=HexColor('#2c3e50'), backColor=HexColor('#d6eaf8')
borderPadding=12, borderWidth=1, borderColor=HexColor('#3498db')
```

### Table Layout

```python
# Smart column width calculation
if num_cols == 2:
    col_widths = [2.5*inch, 4*inch]
elif num_cols == 3:
    col_widths = [2*inch, 2*inch, 2.5*inch]
elif num_cols == 4:
    col_widths = [1.5*inch, 1.5*inch, 1.5*inch, 2*inch]
else:
    col_widths = [6.5*inch / num_cols] * num_cols

# Table styling
TableStyle([
    # Header row
    ('BACKGROUND', (0, 0), (-1, 0), HexColor('#3498db')),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, 0), 12),
    ('TOPPADDING', (0, 0), (-1, 0), 14),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 14),
    ('LEFTPADDING', (0, 0), (-1, 0), 12),
    ('RIGHTPADDING', (0, 0), (-1, 0), 12),
    
    # Data rows
    ('BACKGROUND', (0, 1), (-1, -1), HexColor('#ecf0f1')),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#ecf0f1'), colors.white]),
    ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
    ('FONTSIZE', (0, 1), (-1, -1), 10),
    ('TOPPADDING', (0, 1), (-1, -1), 10),
    ('BOTTOMPADDING', (0, 1), (-1, -1), 10),
    ('LEFTPADDING', (0, 1), (-1, -1), 12),
    ('RIGHTPADDING', (0, 1), (-1, -1), 12),
    
    # Borders
    ('GRID', (0, 0), (-1, -1), 1.5, HexColor('#bdc3c7')),
    ('LINEBELOW', (0, 0), (-1, 0), 2, HexColor('#2c3e50')),
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
])

# CRITICAL: Wrap table in KeepTogether to prevent page splits
elements.append(KeepTogether(t))
```

### Page Break Management

```python
# Major sections (# headings) - start on new page
if line.startswith('# '):
    if len(elements) > 10:  # Not the first section
        elements.append(PageBreak())
    elements.append(Spacer(1, 12))
    elements.append(Paragraph(line[2:], styles['CustomTitle']))
    elements.append(Spacer(1, 6))

# Tables - always keep together
elements.append(KeepTogether(table))

# Headings - keep with following content (automatic via ReportLab)
```

---

## PPTX Layout Settings

### Slide Dimensions

```python
prs.slide_width = Inches(10)
prs.slide_height = Inches(7.5)

# Content box (to prevent overflow)
content_box = Inches(0.8), Inches(1.5), Inches(8.4), Inches(5.0)
# Position: left=0.8", top=1.5", width=8.4", height=5.0"
```

### Overflow Prevention (CRITICAL)

```python
# Maximum content height: 5.0 inches = 360 points
max_lines = 12  # Hard limit
estimated_height = 0
lines_to_add = []

for line in content_lines:
    # Estimate line height based on content type
    if line.startswith('**') or line.isupper():
        line_height = 50  # Heading
    elif line.startswith('-') or line.startswith('•'):
        line_height = 35  # Bullet
    else:
        line_height = 40  # Regular text
    
    if estimated_height + line_height <= 360:  # 5 inches
        lines_to_add.append(line)
        estimated_height += line_height
    else:
        break  # Stop adding content
```

### Typography Settings

```python
# Headings (** or UPPERCASE)
font.size = Pt(18)
font.bold = True
space_before = Pt(10)
space_after = Pt(8)
line_spacing = 1.2

# Bullet points (-, •, 1., 2., etc.)
font.size = Pt(15)
space_before = Pt(6)
space_after = Pt(4)
line_spacing = 1.3

# Regular text
font.size = Pt(16)
space_before = Pt(4)
space_after = Pt(4)
line_spacing = 1.4

# First paragraph: space_before = Pt(0)
```

### Table Support

```python
# Create table shape
table_shape = slide.shapes.add_table(rows, cols, Inches(0.8), y_pos, Inches(8.4), Inches(rows * 0.5))

# Header row styling
cell.fill.solid()
cell.fill.fore_color.rgb = colors['primary']  # Blue
paragraph.font.bold = True
paragraph.font.size = Pt(14)
paragraph.font.color.rgb = RGBColor(255, 255, 255)
paragraph.alignment = PP_ALIGN.CENTER

# Data rows styling
if row_idx % 2 == 1:
    cell.fill.solid()
    cell.fill.fore_color.rgb = colors['light']  # Alternating gray
paragraph.font.size = Pt(13)
paragraph.alignment = PP_ALIGN.LEFT
paragraph.space_before = Pt(4)
paragraph.space_after = Pt(4)
paragraph.line_spacing = 1.3
```

---

## Color Scheme

```python
# PDF Colors
HexColor('#3498db')  # Primary blue (headers, borders)
HexColor('#2ecc71')  # Secondary green (accents)
HexColor('#e74c3c')  # Accent red (highlights)
HexColor('#2c3e50')  # Dark navy (text)
HexColor('#ecf0f1')  # Light gray (backgrounds)
HexColor('#7f8c8d')  # Medium gray (footer)
HexColor('#bdc3c7')  # Border gray (table lines)
HexColor('#d6eaf8')  # Light blue (info boxes)
HexColor('#fef5e7')  # Light yellow (highlight boxes)

# PPTX Colors
RGBColor(52, 152, 219)   # Primary blue
RGBColor(46, 204, 113)   # Secondary green
RGBColor(231, 76, 60)    # Accent red
RGBColor(44, 62, 80)     # Dark navy
RGBColor(236, 240, 241)  # Light gray
```

---

## Key Success Factors

### PDF
1. ✅ **Leading = 1.6x font size** (e.g., 11pt font → 18pt leading)
2. ✅ **Smart column widths** (not equal, proportional to content)
3. ✅ **KeepTogether for tables** (prevents page splits)
4. ✅ **PageBreak before major sections** (clean structure)
5. ✅ **Generous padding** (10-14pt in tables)
6. ✅ **Alternating row colors** (improves readability)

### PPTX
1. ✅ **Height estimation algorithm** (prevents overflow)
2. ✅ **Maximum 12 lines per slide** (hard limit)
3. ✅ **Content box = 5.0" tall** (360pt max)
4. ✅ **Smaller fonts than PDF** (16-18pt vs 18-20pt)
5. ✅ **Tighter spacing** (1.2-1.4 vs 1.5-1.6)
6. ✅ **First paragraph: no space before** (clean start)

---

## Common Pitfalls to Avoid

❌ **Don't:** Use equal column widths for all tables
✅ **Do:** Calculate proportional widths based on column count

❌ **Don't:** Allow tables to split across pages
✅ **Do:** Wrap tables in KeepTogether()

❌ **Don't:** Use same font sizes for PDF and PPTX
✅ **Do:** Use smaller fonts in PPTX (projection needs less detail)

❌ **Don't:** Add unlimited content to PPTX slides
✅ **Do:** Estimate height and stop at 360pt

❌ **Don't:** Use tight line spacing (1.0-1.2)
✅ **Do:** Use generous spacing (1.4-1.6 for readability)

---

## File Size Expectations

**PDFs:** 7-13 KB (with graphics and colors)
**PPTX:** 63-65 KB (with decorative elements)

Larger sizes indicate rich formatting - this is good!

---

## Testing Checklist

### PDF
- [ ] No tables split across pages
- [ ] Major sections start on new pages
- [ ] Headings not orphaned at page bottom
- [ ] All text readable when printed
- [ ] Page numbers in footer
- [ ] Consistent spacing throughout

### PPTX
- [ ] No text overflow on any slide
- [ ] All content visible (no cut-off)
- [ ] Tables render correctly
- [ ] Readable when projected
- [ ] Slide numbers visible
- [ ] Footer on all slides

---

**Last Updated:** 2025-12-20
**Script:** `scripts/python/generate_downloads.py`
**Status:** ✅ Production-ready

