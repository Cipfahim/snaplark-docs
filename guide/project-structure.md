# Project Structure

This document provides a complete map of the Snaplark codebase, explaining the purpose of each file and directory.

## Root Directory

```
snaplark/
├── src/                    # Source code
├── resources/              # Build resources (icons)
├── docs/                   # Documentation (VitePress)
├── out/                    # Build output (generated)
├── .vite/                  # Vite build cache (generated)
├── node_modules/           # Dependencies (generated)
├── forge.config.js         # Electron Forge configuration
├── vite.main.config.mjs    # Vite config for main process
├── vite.renderer.config.mjs # Vite config for renderer
├── vite.preload.config.mjs # Vite config for preload
├── package.json            # Project manifest
├── entitlements.plist      # macOS permissions
├── index.html              # HTML entry point
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.mjs      # PostCSS configuration
└── .env                    # Environment variables
```

## Source Directory (`src/`)

### Entry Points

```
src/
├── main.js         # Electron main process (920 lines)
├── preload.js      # Preload script - IPC bridge (166 lines)
├── renderer.js     # Vue app initialization (71 lines)
├── App.vue         # Root Vue component
├── store.js        # Pinia store definition
└── store-defaults.js # Default state values
```

#### `main.js` - Main Process Entry

The main process is the heart of the Electron application. It handles:

- App lifecycle (`whenReady`, `activate`, `window-all-closed`)
- Single instance lock enforcement
- Window creation and management
- Global shortcut registration
- System tray setup
- IPC handler registration
- Permission checking (macOS)
- Auto-update initialization
- Deep link protocol handling (`snaplark://`)

#### `preload.js` - Secure Bridge

The preload script runs in a sandboxed environment with access to both Node.js and the DOM. It creates a secure bridge:

```javascript
// Exposed APIs:
window.electron           // System operations
window.electronWindows    // Window management
window.electronNotifications // Toast notifications
window.electronStore      // Persistent storage
window.electronAuth       // Authentication handlers
window.electronConnectivity // Network status
```

#### `renderer.js` - Vue Initialization

Initializes the Vue application:
1. Creates and mounts the Vue app
2. Initializes Pinia store
3. Sets up global event listeners for shortcuts
4. Handles authentication responses

### Services (`src/services/`)

```
src/services/
├── window-manager.js       # Window lifecycle (775 lines)
├── screenshot-service.js   # Screenshot capture (761 lines)
├── video-recording-service.js # Video recording (642 lines)
├── chunk-upload-manager.js # Video upload (655 lines)
├── shortcut-manager.js     # Keyboard shortcuts (504 lines)
├── system_tray.js          # System tray (176 lines)
├── notification-service.js # Toast notifications (143 lines)
├── store-service.js        # Cross-window sync (39 lines)
└── connectivity.js         # Network status (208 lines)
```

Each service is a class that encapsulates related functionality:

| Service | Responsibility |
|---------|----------------|
| `WindowManager` | Creates, tracks, and manages all application windows |
| `ScreenshotService` | Handles screenshot capture, cropping, and processing |
| `VideoRecordingService` | Manages video recording setup and coordination |
| `ChunkUploadManager` | Handles chunked video uploads with retry logic |
| `ShortcutManager` | Registers and manages global/local keyboard shortcuts |
| `SystemTray` | Creates and manages the system tray icon and menu |
| `NotificationService` | Shows toast notifications for upload progress |
| `StoreService` | Synchronizes state across multiple windows |
| `ConnectivityService` | Monitors and reports network connectivity status |

### Components (`src/components/`)

```
src/components/
├── KonvaEditor.vue         # Drawing/annotation canvas (1066 lines)
├── VideoPlayer.vue         # Video playback component
├── VideoPreview.vue        # Recording preview
├── UploadNotification.vue  # Upload progress toast
├── SettingsHotkeyItem.vue  # Hotkey configuration row
├── SettingsSwitchItem.vue  # Toggle switch setting
├── ColorPalette.vue        # Color picker popup
├── SizeIndicatorPill.vue   # Dimension display badge
├── Toast.vue               # Toast notification
├── Tooltip.vue             # Hover tooltip
└── icons/                  # SVG icon components (28 files)
    ├── ArrowIcon.vue
    ├── BlurIcon.vue
    ├── CheckIcon.vue
    ├── DeleteIcon.vue
    ├── PencilIcon.vue
    └── ... (more icons)
```

### Views (`src/views/`)

Each view corresponds to a window type:

```
src/views/
├── MainView.vue            # Quick access menu (main window)
├── LoginView.vue           # Authentication screen
├── SettingsView.vue        # Settings (tabbed interface)
├── WelcomeView.vue         # First-run onboarding
├── ScreenshotView.vue      # Screenshot selection UI
├── VideoRecordingView.vue  # Recording setup interface
├── WebcamView.vue          # Webcam preview window
├── DesignView.vue          # Annotation editor
├── NotificationsView.vue   # Upload progress toasts
├── PermissionsView.vue     # macOS permission requests
└── RecordingOverlayView.vue # Floating recording controls
```

### Composables (`src/composables/`)

Vue composition functions for shared logic:

```
src/composables/
├── useRecorder.js          # Recording state and methods
└── useWindows.js           # Window operation helpers
```

### API (`src/api/`)

```
src/api/
└── config.js               # API client configuration (125 lines)
```

Contains:
- Base URL configuration (`https://snaplark.com/api/v1`)
- Axios client with interceptors
- Token management (get, set, remove)
- Error handling (401 auto-logout, network errors)

### Configuration (`src/config/`)

```
src/config/
└── shortcuts.js            # Shortcut definitions
```

Defines all keyboard shortcuts with:
- ID, store key, type (global/local)
- Default values for each platform
- Description for UI display

### Router (`src/router/`)

```
src/router/
└── index.js                # Vue Router configuration (138 lines)
```

Defines routes for each window type with:
- Path-to-component mapping
- Window type metadata
- Navigation guards

### Assets (`src/assets/`)

```
src/assets/
├── icons/
│   ├── icon.icns           # macOS app icon
│   ├── icon.ico            # Windows app icon
│   ├── icon.png            # Source icon
│   ├── background.png      # DMG background
│   └── loading.gif         # Windows installer loading
├── backgrounds/            # UI backgrounds
├── logo.svg               # App logo
└── main.css               # Global styles (Tailwind)
```

## Build Resources (`resources/`)

```
resources/
└── icons/
    ├── tray.png            # macOS tray icon
    └── win-tray.ico        # Windows tray icon
```

## File Size Reference

Understanding file complexity by line count:

| File | Lines | Complexity |
|------|-------|------------|
| `KonvaEditor.vue` | 1,066 | Very High |
| `main.js` | 920 | Very High |
| `window-manager.js` | 775 | High |
| `screenshot-service.js` | 761 | High |
| `chunk-upload-manager.js` | 655 | High |
| `video-recording-service.js` | 642 | High |
| `shortcut-manager.js` | 504 | Medium |
| `connectivity.js` | 208 | Medium |
| `system_tray.js` | 176 | Low |
| `preload.js` | 166 | Low |

## Next Steps

- [Technology Stack](/guide/tech-stack) - Learn about the technologies used
- [Architecture Overview](/architecture/overview) - Understand how components work together
