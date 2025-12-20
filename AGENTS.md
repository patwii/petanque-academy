# Agent Instructions

## Project Overview

This is a VitePress documentation site for Pétanque Academy - an elite player development platform.

## Multi-language Content

The site supports multiple languages with the following structure:

```
docs/
├── da/    # Danish
├── de/    # German
├── en/    # English (source of truth)
├── es/    # Spanish
├── fr/    # French
├── it/    # Italian
├── nl/    # Dutch
├── no/    # Norwegian
├── pt/    # Portuguese
└── sv/    # Swedish
```

## Language Sync Rule

**IMPORTANT: English (`docs/en/`) is the source of truth for all content.**

When any content in `docs/en/` is created, modified, or deleted:

1. **Automatically apply the same changes to ALL other language folders** (`fr`, `de`, `es`, `sv`, `da`, `no`)
2. **Translate the content** to the appropriate language
3. **Preserve the same file structure** - if a file is added/removed in `en/`, do the same in all language folders
4. **Keep formatting consistent** - maintain the same markdown structure, frontmatter, and layout

### Languages Reference

| Code | Language   | Native Name |
|------|------------|-------------|
| da   | Danish     | Dansk       |
| de   | German     | Deutsch     |
| en   | English    | English     |
| es   | Spanish    | Español     |
| fr   | French     | Français    |
| it   | Italian    | Italiano    |
| nl   | Dutch      | Nederlands  |
| no   | Norwegian  | Norsk       |
| pt   | Portuguese | Português   |
| sv   | Swedish    | Svenska     |

### Translation Guidelines

- Maintain the tone and intent of the original English content
- Use formal/professional language appropriate for elite athletes
- Keep technical pétanque terms consistent (e.g., "carreau", "portée" are often kept in French across languages)
- Translate UI elements (navigation, buttons) but keep brand name "Pétanque Academy" unchanged

## Translation Process with Python & GCP

### Prerequisites

1. **Google Cloud Translation API** credentials in `private_keys/credentials.json`
2. **Python 3.x** installed
3. **google-cloud-translate** package (auto-installed by script)

### Translation Script: `scripts/python/translate_gcp.py`

Located at `scripts/python/translate_gcp.py`. This script uses Google Cloud Translation API for high-quality translations.

**Usage:**
```bash
# From project root
python scripts/python/translate_gcp.py
```

**How it works:**
1. Reads English content from `docs/en/`
2. Preserves markdown structure, frontmatter, code blocks, and special syntax
3. Translates content to all target languages using GCP Translation API
4. Writes translated files to respective language folders (`docs/da/`, `docs/de/`, etc.)
5. Maintains file structure and formatting

**Protected Elements (Not Translated):**
- Code blocks (```...```)
- Frontmatter (---)
- Mermaid diagrams
- HTML tags
- URLs and links
- Brand name "Pétanque Academy"
- Technical terms: carreau, portée, tir, pointer, milieu, etc.

**Environment Setup:**
```bash
export GOOGLE_APPLICATION_CREDENTIALS='private_keys/credentials.json'
```

**Key Functions:**
- `translate_text_gcp(text, target_language, translate_client)` - Translates text via GCP API
- `translate_markdown_file(source_file, target_file, target_lang, translate_client)` - Handles full markdown file translation
- Preserves markdown structure while translating content

**Rate Limiting:**
- Built-in delays to respect API limits
- Batch processing for efficiency

### When to Run Translation

**Always run translation after:**
1. Creating new English content
2. Modifying existing English content
3. Restructuring navigation or file organization
4. Adding new features or sections

**Command:**
```bash
cd /home/patrik/esi/petanque-academy
python scripts/python/translate_gcp.py
```

## File Structure

```
petanque-academy/
├── AGENTS.md                           # This file - agent instructions
├── README.md                           # Project README
├── package.json                        # Node.js dependencies
├── docs/                               # VitePress documentation site
│   ├── .vitepress/
│   │   └── config.ts                   # VitePress configuration
│   ├── index.md                        # Root redirect to /en/
│   ├── en/                             # English content (source of truth)
│   ├── da/                             # Danish translations
│   ├── de/                             # German translations
│   ├── es/                             # Spanish translations
│   ├── fr/                             # French translations
│   ├── it/                             # Italian translations
│   ├── nl/                             # Dutch translations
│   ├── no/                             # Norwegian translations
│   ├── pt/                             # Portuguese translations
│   └── sv/                             # Swedish translations
├── scripts/
│   ├── generate-sitemap.js             # Sitemap generation
│   └── python/
│       └── translate_gcp.py            # GCP translation script
├── private_keys/
│   └── credentials.json                # GCP API credentials (not in git)
├── docs-project/                       # Project documentation
│   ├── SEO_IMPROVEMENTS_SUMMARY.md
│   ├── DEPLOYMENT_CHECKLIST.md
│   └── ...
└── root-domain/                        # Root domain files (carreau.app)
    ├── index.html
    ├── CNAME
    └── ads.txt
```

