# Technology Stack

This document explains all technologies used in Snaplark and why they were chosen.

## Core Framework

### Electron 38.3.0

**What it is:** A framework for building cross-platform desktop applications using web technologies (HTML, CSS, JavaScript).

**Why we use it:**
- Single codebase runs on macOS, Windows, and Linux
- Access to native OS features (tray, shortcuts, screen capture)
- Chromium rendering engine for consistent UI
- Node.js integration for file system and system operations

**Key Concepts:**
- **Main Process**: Node.js process that manages windows and system interactions
- **Renderer Process**: Chromium instance that renders the UI (one per window)
- **Preload Script**: Secure bridge between main and renderer processes

### Vue 3.5.25

**What it is:** A progressive JavaScript framework for building user interfaces.

**Why we use it:**
- Composition API for better code organization
- Reactive state management
- Single-file components (`.vue` files)
- Excellent TypeScript support (if needed in future)

**Key Features Used:**
- `<script setup>` syntax for concise components
- `ref()` and `computed()` for reactivity
- `onMounted()` and `onUnmounted()` lifecycle hooks
- Composables for shared logic

## Build Tools

### Vite 5.4.21

**What it is:** A next-generation frontend build tool.

**Why we use it:**
- Lightning-fast dev server with hot module replacement (HMR)
- Optimized production builds
- Native ES modules support
- Simple configuration

**Configuration Files:**
- `vite.main.config.mjs` - Main process build
- `vite.renderer.config.mjs` - Renderer build
- `vite.preload.config.mjs` - Preload script build

### Electron Forge 7.10.2

**What it is:** A complete tool for creating, publishing, and installing Electron applications.

**Why we use it:**
- Official Electron toolchain
- Integrates with Vite
- Handles code signing and notarization
- Supports multiple installers (DMG, Squirrel, deb, rpm)
- Built-in S3 publisher

**Key Components:**
- `@electron-forge/plugin-vite` - Vite integration
- `@electron-forge/maker-*` - Platform-specific installers
- `@electron-forge/publisher-s3` - S3 publishing
- `@electron-forge/plugin-fuses` - Security configuration

## State Management

### Pinia 3.0.4

**What it is:** The official state management library for Vue.

**Why we use it:**
- Simpler API than Vuex
- Full TypeScript support
- Devtools integration
- Modular by design

**Usage in Snaplark:**
```javascript
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    settings: { /* ... */ }
  }),
  actions: {
    async login(token) { /* ... */ }
  }
})
```

### electron-store 11.0.2

**What it is:** Simple data persistence for Electron apps.

**Why we use it:**
- Persists state between app restarts
- Encryption support for sensitive data
- JSON-based storage
- Synchronous API for preload script

**Storage Location:**
- macOS: `~/Library/Application Support/Snaplark/config.json`
- Windows: `%APPDATA%/Snaplark/config.json`

## UI & Styling

### Tailwind CSS 4.1.17

**What it is:** A utility-first CSS framework.

**Why we use it:**
- Rapid UI development
- Consistent design system
- Small production bundle (unused styles removed)
- Dark mode support built-in

**Example Usage:**
```html
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>
```

## Drawing & Canvas

### Konva.js 10.0.12

**What it is:** A 2D canvas library for desktop and mobile applications.

**Why we use it:**
- High-performance canvas rendering
- Built-in shapes, transformers, and filters
- Touch and mouse event handling
- Layer management

**Features Used:**
- Shapes: `Line`, `Arrow`, `Rect`, `Ellipse`, `Text`
- Filters: `Konva.Filters.Blur` for blur tool
- `Transformer` for resizing/moving shapes
- Event handling for drawing interaction

### vue-konva 3.2.6

**What it is:** Vue wrapper for Konva.js.

**Usage in Snaplark:** We use the imperative Konva API directly for more control, but vue-konva is available for declarative components if needed.

## OCR & Text Extraction

### Tesseract.js 6.0.1

**What it is:** Pure JavaScript OCR (Optical Character Recognition) library.

**Why we use it:**
- Extract text from screenshots
- Works entirely client-side (no API calls)
- Supports multiple languages

**Usage Flow:**
1. User captures screenshot
2. User can trigger OCR on the captured image
3. Tesseract extracts text
4. Text is copied to clipboard or displayed

## Audio Capture

### electron-audio-loopback 1.0.6

**What it is:** Native module for capturing system audio on macOS.

**Why we use it:**
- Records system audio (not just microphone)
- Required for screen recordings with sound
- Uses macOS Core Audio tap

**Initialization:**
```javascript
import { initMain as initAudioLoopback } from 'electron-audio-loopback'

initAudioLoopback({
  forceCoreAudioTap: true,
  loopbackWithMute: false,
  sourcesOptions: { types: ['screen', 'window'] }
})
```

## HTTP Client

### Axios 1.13.2

**What it is:** Promise-based HTTP client.

**Why we use it:**
- Request/response interceptors
- Automatic token injection
- Error handling
- Upload progress tracking

**Configuration:**
```javascript
const apiClient = axios.create({
  baseURL: 'https://snaplark.com/api/v1',
  timeout: 0,              // No timeout for large uploads
  maxContentLength: Infinity,
  maxBodyLength: Infinity
})
```

## Routing

### Vue Router 4.6.3

**What it is:** Official router for Vue.js.

**Why we use it:**
- Navigate between views in the renderer
- Route guards for authentication
- Route metadata for window type identification

## Auto Updates

### update-electron-app 3.1.2

**What it is:** Automatic updates using the built-in Electron autoUpdater.

**Why we use it:**
- Simple setup for static file hosting
- Works with S3-compatible storage
- Handles download and installation

**Configuration:**
```javascript
updateElectronApp({
  updateSource: {
    type: UpdateSourceType.StaticStorage,
    baseUrl: `https://.../${process.platform}/${process.arch}`
  }
})
```

## Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `electron` | 38.3.0 | Electron framework |
| `@electron-forge/cli` | 7.10.2 | Build toolchain |
| `@electron/rebuild` | 4.0.1 | Native module rebuilding |
| `@electron/fuses` | 1.8.0 | Security fuses |
| `vite` | 5.4.21 | Build tool |
| `@vitejs/plugin-vue` | 6.0.2 | Vue support for Vite |
| `dotenv` | 17.2.3 | Environment variables |

## Production Dependencies Summary

| Category | Package | Version |
|----------|---------|---------|
| UI Framework | `vue` | 3.5.25 |
| State | `pinia` | 3.0.4 |
| Routing | `vue-router` | 4.6.3 |
| HTTP | `axios` | 1.13.2 |
| Drawing | `konva` | 10.0.12 |
| OCR | `tesseract.js` | 6.0.1 |
| Storage | `electron-store` | 11.0.2 |
| Audio | `electron-audio-loopback` | 1.0.6 |
| Updates | `update-electron-app` | 3.1.2 |
| Styling | `tailwindcss` | 4.1.17 |

## Security Features

### Electron Fuses

Fuses are compile-time flags that disable certain Electron features:

```javascript
// forge.config.js
new FusesPlugin({
  [FuseV1Options.RunAsNode]: false,                    // Prevent ELECTRON_RUN_AS_NODE
  [FuseV1Options.EnableCookieEncryption]: true,        // Encrypt cookies
  [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,  // Block NODE_OPTIONS
  [FuseV1Options.EnableNodeCliInspectArguments]: false,         // Block --inspect
  [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,  // Validate ASAR
  [FuseV1Options.OnlyLoadAppFromAsar]: true            // Only load from ASAR
})
```

### Context Isolation

The renderer process cannot access Node.js directly. All communication goes through the preload script's `contextBridge`:

```javascript
// preload.js
contextBridge.exposeInMainWorld('electron', {
  quit: () => ipcRenderer.send('quit-app'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url)
  // ... limited, explicit API surface
})
```

## Next Steps

- [Architecture Overview](/architecture/overview) - See how these technologies work together
- [Main Process](/architecture/main-process) - Deep dive into the Electron main process
