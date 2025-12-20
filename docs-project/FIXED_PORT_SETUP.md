# Fixed Port Configuration for Local Development

## Overview

Configured VitePress to always use port 5173 for local development, with automatic cleanup of stale processes.

---

## ✅ Changes Made

### 1. VitePress Configuration

**File:** `docs/.vitepress/config.ts`

Added server configuration to prefer port 5173:

```typescript
vite: {
  server: {
    port: 5173,
    strictPort: false  // Will try next port if 5173 is busy
  },
  // ... rest of config
}
```

### 2. Development Helper Script

**File:** `dev.sh`

Created a bash script that:
- Checks for existing VitePress dev servers
- Kills any running instances
- Frees port 5173 if needed
- Starts dev server on port 5173

### 3. NPM Script

**File:** `package.json`

Added convenient `dev` script:

```json
"scripts": {
  "dev": "./dev.sh",
  "docs:dev": "vitepress dev docs",
  ...
}
```

---

## 🚀 Usage

**Recommended (with auto-cleanup):**
```bash
npm run dev
```

**Direct (manual cleanup if needed):**
```bash
npm run docs:dev
```

---

## 🎯 Benefits

- ✅ Consistent port (5173) every time
- ✅ Automatic cleanup of stale processes
- ✅ No more port conflicts
- ✅ Easier to bookmark and remember
- ✅ Cleaner development workflow

---

## 📝 Port Information

**Default Port:** 5173  
**URL:** http://localhost:5173/

If port 5173 is in use by another application (not VitePress), it will automatically try the next available port (5174, 5175, etc.).

---

**Status:** Complete ✅
