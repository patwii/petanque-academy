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

## File Structure

- `docs/.vitepress/config.ts` - VitePress configuration with locale settings
- `docs/index.md` - Root redirect to `/en/`
- `docs/{lang}/` - Language-specific content folders

