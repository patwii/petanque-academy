#!/usr/bin/env python3
import re

# Read the config file
with open('docs/.vitepress/config.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the About menu item for each language
about_items = {
    'da': ("          { text: 'Mad', link: '/da/food' }", "          { text: 'Mad', link: '/da/food' },\n          { text: 'Om', link: '/da/about' }"),
    'de': ("          { text: 'Ernährung', link: '/de/food' }", "          { text: 'Ernährung', link: '/de/food' },\n          { text: 'Über', link: '/de/about' }"),
    'es': ("          { text: 'Comida', link: '/es/food' }", "          { text: 'Comida', link: '/es/food' },\n          { text: 'Acerca de', link: '/es/about' }"),
    'fr': ("          { text: 'Alimentation', link: '/fr/food' }", "          { text: 'Alimentation', link: '/fr/food' },\n          { text: 'À propos', link: '/fr/about' }"),
    'it': ("          { text: 'Cibo', link: '/it/food' }", "          { text: 'Cibo', link: '/it/food' },\n          { text: 'Chi siamo', link: '/it/about' }"),
    'nl': ("          { text: 'Voedsel', link: '/nl/food' }", "          { text: 'Voedsel', link: '/nl/food' },\n          { text: 'Over', link: '/nl/about' }"),
    'no': ("          { text: 'Mat', link: '/no/food' }", "          { text: 'Mat', link: '/no/food' },\n          { text: 'Om', link: '/no/about' }"),
    'pt': ("          { text: 'Comida', link: '/pt/food' }", "          { text: 'Comida', link: '/pt/food' },\n          { text: 'Sobre', link: '/pt/about' }"),
    'sv': ("          { text: 'Mat', link: '/sv/food' }", "          { text: 'Mat', link: '/sv/food' },\n          { text: 'Om', link: '/sv/about' }")
}

# For each language, replace the Food line with Food + About
for lang, (old_line, new_line) in about_items.items():
    content = content.replace(old_line, new_line)

# Write back
with open('docs/.vitepress/config.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Added About navigation to all languages!")
