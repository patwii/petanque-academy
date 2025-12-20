# Project Cleanup and Navigation Update

## Overview

Cleaned up the project structure, updated AGENTS.md with translation instructions, and improved navigation with Education submenu and organized Tools submenu.

---

## ✅ 1. Project Cleanup

### Files Reorganized

**Created Directories:**
- `scripts/python/` - All Python scripts
- `docs-project/` - All project documentation

**Moved Files:**
- All `*.py` files → `scripts/python/`
- All documentation `*.md` files → `docs-project/`
- All `*.html` and `*.txt` files → `docs-project/`

### Final Project Structure

```
petanque-academy/
├── AGENTS.md                           # Agent instructions (UPDATED)
├── README.md                           # Project README
├── package.json                        # Node.js dependencies
├── docs/                               # VitePress site
│   ├── .vitepress/config.ts           # Config (UPDATED)
│   ├── en/ (source of truth)
│   └── [9 other languages]
├── scripts/
│   ├── generate-sitemap.js
│   └── python/
│       ├── translate_gcp.py           # Main translation script
│       └── [other Python scripts]
├── private_keys/
│   └── credentials.json               # GCP credentials
├── docs-project/                      # Project documentation
│   └── [all .md docs]
└── root-domain/                       # Root domain files
```

---

## ✅ 2. AGENTS.md Updates

### Added Translation Instructions

**New Section: "Translation Process with Python & GCP"**

Includes:
- Prerequisites (GCP credentials, Python 3.x)
- Script location: `scripts/python/translate_gcp.py`
- Usage: `python scripts/python/translate_gcp.py`
- Protected elements (code blocks, frontmatter, Mermaid, etc.)
- When to run translation

---

## ✅ 3. Navigation Improvements

### Education Menu (NEW!)

**Before:** Single link

**After:** Dropdown with 9 modules:
- Overview
- The Zone
- Mindfulness
- Goal Setting
- Mental Strength
- Team Dynamics
- Tactics
- Training Methods
- Nutrition

### Tools Menu (IMPROVED!)

**Before:** Flat list

**After:** Organized sub-sections:
```
Tools
├── Guides
│   ├── Mental Journey (Beginners)
│   ├── Workshop (Advanced)
│   ├── Training Camp
│   └── Training Session
└── Templates
    ├── Goal Template
    └── Diary Template
```

---

## 📝 Translation Usage

```bash
cd /home/patrik/esi/petanque-academy
python scripts/python/translate_gcp.py
```

---

**Status:** Complete ✅
