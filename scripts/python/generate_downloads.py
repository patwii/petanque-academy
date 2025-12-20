#!/usr/bin/env python3
"""
Generate downloadable PDF and PPTX files from markdown materials.
"""

import os
import sys
from pathlib import Path

# Check and install required packages
def install_packages():
    """Install required packages if not available."""
    packages = ['markdown2', 'reportlab', 'python-pptx']
    
    for package in packages:
        try:
            __import__(package.replace('-', '_'))
        except ImportError:
            print(f"Installing {package}...")
            os.system(f"{sys.executable} -m pip install {package} --quiet")

print("Checking dependencies...")
install_packages()

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, ListFlowable, ListItem, Table, TableStyle, KeepTogether
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.graphics.shapes import Drawing, Rect, Circle, String
from reportlab.graphics import renderPDF
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
import re

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent.parent
DOWNLOADS_BASE_DIR = PROJECT_ROOT / "docs" / "public" / "downloads"

# All supported languages
LANGUAGES = ['en', 'da', 'de', 'es', 'fr', 'it', 'nl', 'no', 'pt', 'sv']

# Language names for display
LANGUAGE_NAMES = {
    'en': 'English',
    'da': 'Danish',
    'de': 'German',
    'es': 'Spanish',
    'fr': 'French',
    'it': 'Italian',
    'nl': 'Dutch',
    'no': 'Norwegian',
    'pt': 'Portuguese',
    'sv': 'Swedish'
}

def create_decorative_header():
    """Create a decorative header graphic."""
    d = Drawing(400, 60)
    # Blue header bar
    d.add(Rect(0, 30, 400, 30, fillColor=HexColor('#3498db'), strokeColor=None))
    # Accent circles
    d.add(Circle(30, 45, 10, fillColor=HexColor('#e74c3c'), strokeColor=None))
    d.add(Circle(370, 45, 10, fillColor=HexColor('#2ecc71'), strokeColor=None))
    return d

def create_section_divider():
    """Create a decorative section divider."""
    d = Drawing(400, 20)
    d.add(Rect(0, 8, 400, 4, fillColor=HexColor('#ecf0f1'), strokeColor=None))
    d.add(Rect(180, 5, 40, 10, fillColor=HexColor('#3498db'), strokeColor=None))
    return d

def create_pdf(md_file, output_file, title):
    """Create PDF from markdown file with enhanced styling and visuals."""
    print(f"Creating PDF: {output_file.name}")

    doc = SimpleDocTemplate(str(output_file), pagesize=letter,
                           rightMargin=72, leftMargin=72,
                           topMargin=72, bottomMargin=50)

    elements = []
    styles = getSampleStyleSheet()

    # Enhanced styles with better spacing
    styles.add(ParagraphStyle(name='CustomTitle', parent=styles['Heading1'],
                             fontSize=32, textColor=HexColor('#2c3e50'),
                             spaceAfter=18, spaceBefore=0,
                             alignment=TA_CENTER, fontName='Helvetica-Bold',
                             leading=38))
    styles.add(ParagraphStyle(name='CustomSubtitle', parent=styles['Normal'],
                             fontSize=14, textColor=HexColor('#7f8c8d'),
                             spaceAfter=24, spaceBefore=6,
                             alignment=TA_CENTER, fontName='Helvetica-Oblique',
                             leading=18))
    styles.add(ParagraphStyle(name='CustomHeading', parent=styles['Heading2'],
                             fontSize=20, textColor=HexColor('#3498db'),
                             spaceAfter=14, spaceBefore=24,
                             fontName='Helvetica-Bold',
                             borderWidth=0, borderColor=HexColor('#3498db'),
                             borderPadding=10, backColor=HexColor('#ecf0f1'),
                             leading=24))
    styles.add(ParagraphStyle(name='CustomSubheading', parent=styles['Heading3'],
                             fontSize=16, textColor=HexColor('#2c3e50'),
                             spaceAfter=12, spaceBefore=18,
                             fontName='Helvetica-Bold',
                             leading=20))
    styles.add(ParagraphStyle(name='CustomBody', parent=styles['BodyText'],
                             fontSize=11, leading=18,
                             spaceAfter=10, spaceBefore=2,
                             alignment=TA_LEFT))
    styles.add(ParagraphStyle(name='CustomBullet', parent=styles['BodyText'],
                             fontSize=11, leading=18,
                             spaceAfter=8, spaceBefore=2,
                             leftIndent=20))
    styles.add(ParagraphStyle(name='Highlight', parent=styles['BodyText'],
                             fontSize=12, leading=18,
                             spaceAfter=14, spaceBefore=6,
                             textColor=HexColor('#e74c3c'), fontName='Helvetica-Bold',
                             backColor=HexColor('#fef5e7'), borderPadding=8))
    styles.add(ParagraphStyle(name='InfoBox', parent=styles['BodyText'],
                             fontSize=11, leading=18,
                             spaceAfter=14, spaceBefore=6,
                             textColor=HexColor('#2c3e50'), fontName='Helvetica',
                             backColor=HexColor('#d6eaf8'), borderPadding=12,
                             borderWidth=1, borderColor=HexColor('#3498db')))

    # Title page with decorative elements
    elements.append(Spacer(1, 80))
    elements.append(create_decorative_header())
    elements.append(Spacer(1, 30))
    elements.append(Paragraph(title, styles['CustomTitle']))
    elements.append(Spacer(1, 20))
    elements.append(Paragraph("Pétanque Academy - Elite Player Development", styles['CustomSubtitle']))
    elements.append(Paragraph("carreau.app", styles['CustomSubtitle']))
    elements.append(Spacer(1, 40))
    elements.append(create_section_divider())
    elements.append(Spacer(1, 30))

    with open(md_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    in_table = False
    table_data = []

    for line in lines:
        line = line.strip()
        if not line or line.startswith('---') or line.startswith('```') or line.startswith('ENDOFFILE'):
            continue

        # Handle tables
        if '|' in line and not line.startswith('#'):
            if not in_table:
                in_table = True
                table_data = []
            row = [cell.strip() for cell in line.split('|')[1:-1]]
            if not all(cell.replace('-', '').strip() == '' for cell in row):  # Skip separator rows
                table_data.append(row)
            continue
        elif in_table:
            # End of table, create it with better layout and keep together
            if table_data:
                # Calculate column widths based on content
                num_cols = len(table_data[0])
                if num_cols == 2:
                    col_widths = [2.5*inch, 4*inch]
                elif num_cols == 3:
                    col_widths = [2*inch, 2*inch, 2.5*inch]
                elif num_cols == 4:
                    col_widths = [1.5*inch, 1.5*inch, 1.5*inch, 2*inch]
                else:
                    col_widths = [6.5*inch / num_cols] * num_cols

                t = Table(table_data, colWidths=col_widths)
                t.setStyle(TableStyle([
                    # Header row styling
                    ('BACKGROUND', (0, 0), (-1, 0), HexColor('#3498db')),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
                    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('FONTSIZE', (0, 0), (-1, 0), 12),
                    ('TOPPADDING', (0, 0), (-1, 0), 14),
                    ('BOTTOMPADDING', (0, 0), (-1, 0), 14),
                    ('LEFTPADDING', (0, 0), (-1, 0), 12),
                    ('RIGHTPADDING', (0, 0), (-1, 0), 12),
                    # Data rows styling
                    ('BACKGROUND', (0, 1), (-1, -1), HexColor('#ecf0f1')),
                    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [HexColor('#ecf0f1'), colors.white]),
                    ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
                    ('FONTSIZE', (0, 1), (-1, -1), 10),
                    ('TOPPADDING', (0, 1), (-1, -1), 10),
                    ('BOTTOMPADDING', (0, 1), (-1, -1), 10),
                    ('LEFTPADDING', (0, 1), (-1, -1), 12),
                    ('RIGHTPADDING', (0, 1), (-1, -1), 12),
                    # Grid and borders
                    ('GRID', (0, 0), (-1, -1), 1.5, HexColor('#bdc3c7')),
                    ('LINEBELOW', (0, 0), (-1, 0), 2, HexColor('#2c3e50')),
                ]))
                # Keep table together on same page
                elements.append(Spacer(1, 6))
                elements.append(KeepTogether(t))
                elements.append(Spacer(1, 18))
            in_table = False
            table_data = []

        if line.startswith('# '):
            # Major section - add page break before (except first)
            if len(elements) > 10:  # Not the first section
                elements.append(PageBreak())
            elements.append(Spacer(1, 12))
            elements.append(Paragraph(line[2:], styles['CustomTitle']))
            elements.append(Spacer(1, 6))
        elif line.startswith('## '):
            # Keep heading with following content
            elements.append(Spacer(1, 10))
            heading = Paragraph(line[3:], styles['CustomHeading'])
            elements.append(heading)
        elif line.startswith('### '):
            # Keep subheading with following content
            subheading = Paragraph(line[4:], styles['CustomSubheading'])
            elements.append(subheading)
        elif line.startswith('> '):
            # Blockquote - make it stand out
            clean_line = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', line[2:])
            clean_line = re.sub(r'\*([^*]+)\*', r'<i>\1</i>', clean_line)
            elements.append(Paragraph(clean_line, styles['InfoBox']))
        elif line.startswith('- ') or line.startswith('* '):
            clean_line = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', line[2:])
            clean_line = re.sub(r'✅', '✓', clean_line)
            clean_line = re.sub(r'❌', '✗', clean_line)
            try:
                elements.append(Paragraph(f"• {clean_line}", styles['CustomBody']))
            except:
                pass
        elif line.startswith('**') and line.endswith('**'):
            # Bold standalone line - make it a highlight
            clean_line = line.replace('**', '')
            try:
                elements.append(Paragraph(clean_line, styles['Highlight']))
            except:
                pass
        elif line:
            clean_line = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', line)
            clean_line = re.sub(r'\*([^*]+)\*', r'<i>\1</i>', clean_line)
            clean_line = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', clean_line)
            clean_line = re.sub(r'✅', '✓', clean_line)
            clean_line = re.sub(r'❌', '✗', clean_line)
            try:
                elements.append(Paragraph(clean_line, styles['CustomBody']))
            except:
                pass

    # Add footer to all pages
    def add_footer(canvas, doc):
        canvas.saveState()
        canvas.setFont('Helvetica', 9)
        canvas.setFillColor(HexColor('#7f8c8d'))
        canvas.drawCentredString(letter[0]/2, 30, f"Pétanque Academy • carreau.app • Page {doc.page}")
        canvas.restoreState()

    doc.build(elements, onFirstPage=add_footer, onLaterPages=add_footer)
    print(f"✅ Created: {output_file.name}")

def create_pptx_from_slides(md_file, output_file):
    """Create PPTX from facilitator slides markdown with enhanced visuals."""
    print(f"Creating PPTX: {output_file.name}")

    prs = Presentation()
    prs.slide_width = Inches(10)
    prs.slide_height = Inches(7.5)

    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()

    slides_content = re.split(r'##\s+Slide\s+\d+:', content)

    # Color scheme
    colors = {
        'primary': RGBColor(52, 152, 219),    # Blue
        'secondary': RGBColor(46, 204, 113),  # Green
        'accent': RGBColor(231, 76, 60),      # Red
        'dark': RGBColor(44, 62, 80),         # Dark blue
        'light': RGBColor(236, 240, 241),     # Light gray
    }

    for idx, slide_text in enumerate(slides_content[1:], 1):
        lines = [l.strip() for l in slide_text.strip().split('\n') if l.strip() and not l.strip().startswith('---')]
        if not lines:
            continue

        slide = prs.slides.add_slide(prs.slide_layouts[6])  # Blank layout

        # Add decorative header bar
        header = slide.shapes.add_shape(
            1,  # Rectangle
            Inches(0), Inches(0), Inches(10), Inches(0.8)
        )
        header.fill.solid()
        header.fill.fore_color.rgb = colors['primary']
        header.line.fill.background()

        # Add slide number circle in corner
        circle = slide.shapes.add_shape(
            9,  # Oval
            Inches(9.2), Inches(0.1), Inches(0.6), Inches(0.6)
        )
        circle.fill.solid()
        circle.fill.fore_color.rgb = colors['accent']
        circle.line.fill.background()

        # Add slide number text
        num_box = slide.shapes.add_textbox(Inches(9.2), Inches(0.1), Inches(0.6), Inches(0.6))
        num_frame = num_box.text_frame
        num_frame.text = str(idx)
        num_frame.paragraphs[0].font.size = Pt(18)
        num_frame.paragraphs[0].font.bold = True
        num_frame.paragraphs[0].font.color.rgb = RGBColor(255, 255, 255)
        num_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
        num_frame.vertical_anchor = MSO_ANCHOR.MIDDLE

        # Extract and clean title (remove all # symbols)
        title_text = lines[0]
        # Remove all # symbols and extra spaces
        title_text = re.sub(r'#+\s*', '', title_text).strip()

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.15), Inches(8.5), Inches(0.5))
        title_frame = title_box.text_frame
        title_frame.text = title_text
        title_frame.paragraphs[0].font.size = Pt(28)
        title_frame.paragraphs[0].font.bold = True
        title_frame.paragraphs[0].font.color.rgb = RGBColor(255, 255, 255)
        title_frame.paragraphs[0].alignment = PP_ALIGN.LEFT

        # Process content lines and detect tables
        content_lines = []
        table_data = []
        in_table = False

        for line in lines[1:]:
            if line and not line.startswith('*Visit') and not line.startswith('ENDOFFILE'):
                # Detect table rows
                if '|' in line:
                    if not in_table:
                        in_table = True
                        table_data = []
                    row = [cell.strip() for cell in line.split('|')[1:-1]]
                    # Skip separator rows
                    if not all(cell.replace('-', '').strip() == '' for cell in row):
                        table_data.append(row)
                    continue
                elif in_table:
                    # End of table, add marker
                    if table_data:
                        content_lines.append(('TABLE', table_data))
                    in_table = False
                    table_data = []

                # Remove all # symbols from content
                clean_line = re.sub(r'#+\s*', '', line)
                # Clean markdown formatting
                clean_line = re.sub(r'\*\*([^*]+)\*\*', r'\1', clean_line)
                clean_line = re.sub(r'\*([^*]+)\*', r'\1', clean_line)
                clean_line = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', clean_line)
                content_lines.append(clean_line)

        # Handle table at end of content
        if in_table and table_data:
            content_lines.append(('TABLE', table_data))

        if content_lines:
            # Check if slide contains a table
            has_table = any(isinstance(item, tuple) and item[0] == 'TABLE' for item in content_lines)

            if has_table:
                # Handle table slide differently
                y_pos = Inches(1.2)

                for item in content_lines:
                    if isinstance(item, tuple) and item[0] == 'TABLE':
                        # Render table
                        table_data = item[1]
                        rows = len(table_data)
                        cols = len(table_data[0])

                        # Create table shape
                        table_shape = slide.shapes.add_table(rows, cols, Inches(0.8), y_pos, Inches(8.4), Inches(rows * 0.5))
                        table = table_shape.table

                        # Fill table with data and style
                        for row_idx, row_data in enumerate(table_data):
                            for col_idx, cell_text in enumerate(row_data):
                                cell = table.cell(row_idx, col_idx)
                                cell.text = cell_text

                                # Style header row
                                if row_idx == 0:
                                    cell.fill.solid()
                                    cell.fill.fore_color.rgb = colors['primary']
                                    for paragraph in cell.text_frame.paragraphs:
                                        paragraph.font.bold = True
                                        paragraph.font.size = Pt(14)
                                        paragraph.font.color.rgb = RGBColor(255, 255, 255)
                                        paragraph.alignment = PP_ALIGN.CENTER
                                else:
                                    # Alternate row colors
                                    if row_idx % 2 == 1:
                                        cell.fill.solid()
                                        cell.fill.fore_color.rgb = colors['light']
                                    for paragraph in cell.text_frame.paragraphs:
                                        paragraph.font.size = Pt(13)
                                        paragraph.font.color.rgb = colors['dark']
                                        paragraph.alignment = PP_ALIGN.LEFT
                                        paragraph.space_before = Pt(4)
                                        paragraph.space_after = Pt(4)
                                        paragraph.line_spacing = 1.3

                        y_pos += Inches(rows * 0.5 + 0.3)
                    else:
                        # Regular text above/below table
                        text_box = slide.shapes.add_textbox(Inches(0.8), y_pos, Inches(8.4), Inches(0.5))
                        text_frame = text_box.text_frame
                        p = text_frame.paragraphs[0]
                        p.text = item
                        p.font.size = Pt(18)
                        p.font.bold = True
                        p.font.color.rgb = colors['dark']
                        y_pos += Inches(0.6)
            else:
                # Regular text slide
                # Add content box with background
                content_bg = slide.shapes.add_shape(
                    1,  # Rectangle
                    Inches(0.5), Inches(1.2), Inches(9), Inches(5.8)
                )
                content_bg.fill.solid()
                content_bg.fill.fore_color.rgb = colors['light']
                content_bg.line.color.rgb = colors['primary']
                content_bg.line.width = Pt(2)

                # Add content text with better overflow management
                content_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(8.4), Inches(5.0))
                content_frame = content_box.text_frame
                content_frame.word_wrap = True

                # Calculate available space and limit content
                max_lines = 12  # Reduced from 15 to prevent overflow
                estimated_height = 0
                lines_to_add = []

                for line in content_lines:
                    # Estimate line height based on content type
                    if line.startswith('**') or line.isupper():
                        line_height = 50  # Heading
                    elif line.startswith('-') or line.startswith('•') or line.startswith('1.') or line.startswith('2.') or line.startswith('3.') or line.startswith('4.'):
                        line_height = 35  # Bullet
                    else:
                        line_height = 40  # Regular text

                    if estimated_height + line_height <= 360:  # 5 inches = 360 points
                        lines_to_add.append(line)
                        estimated_height += line_height
                    else:
                        break

                # Better line spacing management
                for i, line in enumerate(lines_to_add):
                    p = content_frame.add_paragraph()
                    p.text = line
                    p.level = 0

                    # Determine font size and style based on content
                    if line.startswith('**') or line.isupper():
                        # Headings/emphasis
                        p.font.size = Pt(18)  # Reduced from 20
                        p.font.bold = True
                        p.font.color.rgb = colors['dark']
                        p.space_before = Pt(10)  # Reduced from 14
                        p.space_after = Pt(8)    # Reduced from 10
                        p.line_spacing = 1.2     # Reduced from 1.3
                    elif line.startswith('-') or line.startswith('•') or line.startswith('1.') or line.startswith('2.') or line.startswith('3.') or line.startswith('4.'):
                        # Bullet points and numbered lists
                        p.font.size = Pt(15)     # Reduced from 16
                        p.font.color.rgb = colors['dark']
                        p.space_before = Pt(6)   # Reduced from 8
                        p.space_after = Pt(4)    # Reduced from 6
                        p.line_spacing = 1.3     # Reduced from 1.4
                    else:
                        # Regular text
                        p.font.size = Pt(16)     # Reduced from 18
                        p.font.color.rgb = colors['dark']
                        p.space_before = Pt(4)   # Reduced from 6
                        p.space_after = Pt(4)    # Reduced from 6
                        p.line_spacing = 1.4     # Reduced from 1.5

                    # First paragraph has no space before
                    if i == 0:
                        p.space_before = Pt(0)

        # Add footer
        footer_box = slide.shapes.add_textbox(Inches(0.5), Inches(7.1), Inches(9), Inches(0.3))
        footer_frame = footer_box.text_frame
        footer_frame.text = "Pétanque Academy • carreau.app • Elite Player Development"
        footer_frame.paragraphs[0].font.size = Pt(10)
        footer_frame.paragraphs[0].font.color.rgb = RGBColor(127, 140, 141)
        footer_frame.paragraphs[0].alignment = PP_ALIGN.CENTER

    prs.save(str(output_file))
    print(f"✅ Created: {output_file.name}")

def generate_for_language(lang):
    """Generate all downloadable files for a specific language."""
    downloads_dir = DOWNLOADS_BASE_DIR / lang

    # Check if the directory exists
    if not downloads_dir.exists():
        print(f"  ⚠️  Directory not found: {downloads_dir}")
        return False

    # Check if source markdown files exist
    participant_guide = downloads_dir / "participant-guide.md"
    if not participant_guide.exists():
        print(f"  ⚠️  Source files not found in {downloads_dir}")
        return False

    try:
        # Create PDFs
        create_pdf(
            downloads_dir / "participant-guide.md",
            downloads_dir / "participant-guide.pdf",
            "Mental Game Introduction - Participant Guide"
        )

        create_pdf(
            downloads_dir / "summary-sheet.md",
            downloads_dir / "summary-sheet.pdf",
            "Mental Game Quick Reference"
        )

        create_pdf(
            downloads_dir / "exercise-worksheets.md",
            downloads_dir / "exercise-worksheets.pdf",
            "Mental Game Exercise Worksheets"
        )

        # Create PPTX
        create_pptx_from_slides(
            downloads_dir / "facilitator-slides.md",
            downloads_dir / "facilitator-slides.pptx"
        )

        return True
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False


def main():
    """Generate all downloadable files for all languages."""
    print("\n🚀 Generating downloadable materials for all languages...\n")

    success_count = 0
    fail_count = 0

    for lang in LANGUAGES:
        lang_name = LANGUAGE_NAMES.get(lang, lang)
        print(f"\n📁 {lang_name} ({lang}):")

        if generate_for_language(lang):
            success_count += 1
            print(f"  ✅ Generated successfully")
        else:
            fail_count += 1

    print(f"\n{'='*50}")
    print(f"✅ Successfully generated: {success_count} languages")
    if fail_count > 0:
        print(f"⚠️  Failed/skipped: {fail_count} languages")
    print(f"\nLocation: {DOWNLOADS_BASE_DIR}\n")


if __name__ == "__main__":
    main()
