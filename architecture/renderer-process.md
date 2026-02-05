# Renderer Process

This document explains the renderer process architecture in Snaplark, including Vue.js setup, component structure, and how the UI interacts with the main process.

## Overview

Each BrowserWindow in Electron runs its own renderer process. In Snaplark, the renderer is a Vue 3 application that handles all UI rendering and user interaction.

**Entry Files:**
- `src/renderer.js` - Vue app initialization
- `src/App.vue` - Root component
- `index.html` - HTML entry point

## Initialization

```javascript
// src/renderer.js
import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { useStore } from '@/store'

// Create Pinia store with persistence
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Create and mount Vue app
createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')

// Initialize after mount
nextTick(async () => {
    const store = useStore()

    // Initialize authentication
    await store.initializeAuth()

    // Initialize connectivity monitoring
    store.initializeConnectivity()

    // Initialize cross-window store sync
    store.initializeStoreSync()

    // Setup global shortcut listeners
    setupGlobalListeners(store)
})
```

## Root Component

```vue
<!-- src/App.vue -->
<template>
    <router-view />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useStore } from '@/store'

const store = useStore()

onMounted(() => {
    // Setup any app-wide event listeners
})

onUnmounted(() => {
    // Cleanup
})
</script>
```

## Router Configuration

**Location:** `src/router/index.js`

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/MainView.vue'),
        meta: { windowType: 'main', title: 'Snaplark' }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/LoginView.vue'),
        meta: { windowType: 'main', title: 'Login - Snaplark' }
    },
    {
        path: '/screenshot',
        name: 'Screenshot',
        component: () => import('@/views/ScreenshotView.vue'),
        meta: { windowType: 'screenshot', title: 'Screenshot' }
    },
    {
        path: '/recording',
        name: 'Recording',
        component: () => import('@/views/VideoRecordingView.vue'),
        meta: { windowType: 'recording', title: 'Recording' }
    },
    // ... more routes
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// Navigation guard for authentication
router.beforeEach(async (to, from, next) => {
    const store = useStore()

    // Redirect authenticated users away from login
    if (to.name === 'Login' && store.isAuthenticated) {
        return next({ name: 'Main' })
    }

    // Require auth for main window
    if (to.meta.windowType === 'main' &&
        to.name !== 'Login' &&
        !store.isAuthenticated) {
        return next({ name: 'Login' })
    }

    next()
})

// Sync document title
router.afterEach((to) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
})

export default router
```

## Component Architecture

### View Components

Views are top-level components loaded by the router:

```
src/views/
├── MainView.vue          # Quick access menu
├── LoginView.vue         # Authentication
├── SettingsView.vue      # Configuration (tabbed)
├── WelcomeView.vue       # Onboarding
├── ScreenshotView.vue    # Selection UI
├── VideoRecordingView.vue # Recording setup
├── WebcamView.vue        # Camera preview
├── DesignView.vue        # Annotation editor
├── NotificationsView.vue # Upload toasts
├── PermissionsView.vue   # Permission requests
└── RecordingOverlayView.vue # Recording controls
```

### Reusable Components

```
src/components/
├── KonvaEditor.vue       # Drawing canvas (1066 lines)
├── VideoPlayer.vue       # Video playback
├── VideoPreview.vue      # Recording preview
├── UploadNotification.vue # Upload progress
├── SettingsHotkeyItem.vue # Hotkey input
├── SettingsSwitchItem.vue # Toggle switch
├── ColorPalette.vue      # Color picker
├── SizeIndicatorPill.vue # Dimension badge
├── Toast.vue             # Toast notification
├── Tooltip.vue           # Hover tooltip
└── icons/                # SVG icons (28 files)
```

## MainView Component

**Location:** `src/views/MainView.vue`

The main window shows:
- User avatar and account info
- Screenshot button
- Record button
- Recent captures
- Settings link

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from '@/store'
import { useWindows } from '@/composables/useWindows'

const store = useStore()
const { createWindow } = useWindows()

// Start screenshot mode
const startScreenshot = async () => {
    await window.electron.startScreenshotMode()
}

// Start recording mode
const startRecording = async () => {
    await window.electron.startVideoRecordingMode()
}

// Listen for shortcut triggers
onMounted(() => {
    window.electron.onScreenshotTrigger(() => {
        startScreenshot()
    })

    window.electron.onRecordingTrigger(() => {
        startRecording()
    })
})
</script>

<template>
    <div class="main-view">
        <!-- User info -->
        <div class="user-section">
            <img :src="store.user?.avatar" />
            <span>{{ store.user?.name }}</span>
        </div>

        <!-- Action buttons -->
        <button @click="startScreenshot">
            Screenshot
        </button>

        <button @click="startRecording">
            Record
        </button>

        <!-- Settings link -->
        <button @click="createWindow('settings')">
            Settings
        </button>
    </div>
</template>
```

## ScreenshotView Component

**Location:** `src/views/ScreenshotView.vue`

Handles the screenshot selection UI:

```vue
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from '@/store'
import KonvaEditor from '@/components/KonvaEditor.vue'

const store = useStore()

// State
const mode = ref('selecting')  // 'selecting' | 'editing' | 'preview'
const isSelecting = ref(false)
const startPoint = ref({ x: 0, y: 0 })
const endPoint = ref({ x: 0, y: 0 })
const capturedImage = ref(null)

// Computed selection rectangle
const selectionRect = computed(() => ({
    left: Math.min(startPoint.value.x, endPoint.value.x),
    top: Math.min(startPoint.value.y, endPoint.value.y),
    width: Math.abs(endPoint.value.x - startPoint.value.x),
    height: Math.abs(endPoint.value.y - startPoint.value.y)
}))

// Settings
const showMagnifier = computed(() => store.settings.showMagnifier)
const showCrosshair = computed(() => store.settings.showCrosshair)

// Mouse handlers
const onMouseDown = (e) => {
    isSelecting.value = true
    startPoint.value = { x: e.clientX, y: e.clientY }
    endPoint.value = { x: e.clientX, y: e.clientY }
}

const onMouseMove = (e) => {
    if (isSelecting.value) {
        endPoint.value = { x: e.clientX, y: e.clientY }
    }
    updateMagnifier(e.clientX, e.clientY)
}

const onMouseUp = async (e) => {
    if (!isSelecting.value) return
    isSelecting.value = false

    if (selectionRect.value.width > 5 && selectionRect.value.height > 5) {
        // Capture the selected region
        capturedImage.value = await window.electron.takeScreenshot(selectionRect.value)
        mode.value = 'editing'
    }
}

// Save/Upload/Copy handlers
const handleSave = async () => {
    const dataUrl = konvaEditorRef.value.exportPNG()
    await window.electron.saveScreenshotDirectly({ dataUrl })
}

const handleUpload = async () => {
    const dataUrl = konvaEditorRef.value.exportPNG()
    await uploadToCloud(dataUrl)
}

const handleCopy = async () => {
    const dataUrl = konvaEditorRef.value.exportPNG()
    await window.electron.copyScreenshot(dataUrl)
}

// Keyboard shortcuts
onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
    <div class="screenshot-view" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
        <!-- Dark overlay -->
        <div class="overlay" />

        <!-- Selection rectangle -->
        <div v-if="isSelecting || mode === 'editing'" class="selection" :style="selectionRect" />

        <!-- Magnifier -->
        <div v-if="showMagnifier && isSelecting" class="magnifier" />

        <!-- Crosshairs -->
        <div v-if="showCrosshair && isSelecting" class="crosshairs" />

        <!-- Konva Editor (after selection) -->
        <KonvaEditor
            v-if="mode === 'editing'"
            ref="konvaEditorRef"
            :selection-rect="selectionRect"
            :background-src="capturedImage"
            :editable="true"
            @save="handleSave"
            @cancel="handleCancel"
        />
    </div>
</template>
```

## Composables

### useWindows

**Location:** `src/composables/useWindows.js`

```javascript
export function useWindows() {
    const createWindow = async (type, options = {}) => {
        return await window.electronWindows.createWindow(type, options)
    }

    const closeWindow = async (type) => {
        return await window.electronWindows.closeWindow(type)
    }

    const resizeWindowTo = async (type, width, height) => {
        return await window.electronWindows.resizeWindow(type, width, height)
    }

    const showWindow = async (type) => {
        return await window.electronWindows.showWindow(type)
    }

    const hideWindow = async (type) => {
        return await window.electronWindows.hideWindow(type)
    }

    return {
        createWindow,
        closeWindow,
        resizeWindowTo,
        showWindow,
        hideWindow
    }
}
```

### useRecorder

**Location:** `src/composables/useRecorder.js`

```javascript
import { ref, reactive } from 'vue'

export function useRecorder() {
    // State
    const mode = ref('select')  // 'select' | 'record' | 'preview'
    const isRecording = ref(false)
    const recordingDuration = ref(0)
    const sources = ref([])
    const selectedSource = ref(null)
    const audioDevices = ref([])
    const videoDevices = ref([])

    // Settings
    const settings = reactive({
        microphoneEnabled: true,
        selectedMicrophoneId: null,
        systemAudioEnabled: false,
        webcamEnabled: false,
        selectedWebcamId: null
    })

    // Methods
    const refreshSources = async () => {
        sources.value = await window.electron.getSources()
    }

    const getAudioDevices = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices()
        audioDevices.value = devices.filter(d => d.kind === 'audioinput')
    }

    const getVideoDevices = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices()
        videoDevices.value = devices.filter(d => d.kind === 'videoinput')
    }

    const startRecording = async () => {
        isRecording.value = true
        // ... MediaRecorder setup
    }

    const stopRecording = async () => {
        isRecording.value = false
        // ... Stop and finalize
    }

    return {
        mode,
        isRecording,
        recordingDuration,
        sources,
        selectedSource,
        audioDevices,
        videoDevices,
        settings,
        refreshSources,
        getAudioDevices,
        getVideoDevices,
        startRecording,
        stopRecording
    }
}
```

## Accessing Electron APIs

The renderer accesses main process via preload bridge:

```javascript
// Available on window object
window.electron           // System operations
window.electronWindows    // Window management
window.electronStore      // Persistent storage
window.electronNotifications // Notifications
window.electronAuth       // Authentication
window.electronConnectivity // Network status

// Examples
await window.electron.startScreenshotMode()
await window.electronWindows.createWindow('settings')
const value = window.electronStore.get('auth_token')
window.electronStore.sync('settings', newSettings)
```

## Event Listeners

Global events from main process:

```javascript
// Shortcut triggers
window.electron.onScreenshotTrigger(callback)
window.electron.onRecordingTrigger(callback)
window.electron.onQuickMenuTrigger(callback)

// Auth events
window.electronAuth.onAuthResponse(callback)

// Store sync
window.electronStore.onUpdate(callback)

// Connectivity
window.electronConnectivity.onStatusChange(callback)
```

## Styling

Snaplark uses Tailwind CSS:

```javascript
// src/assets/main.css
@import 'tailwindcss';

/* Custom theme */
:root {
    --primary-blue: #2178FF;
    --dark-800: #1a1a2e;
    --dark-700: #252540;
}

/* Utility classes */
.animated-dashed-border {
    /* Marching ants animation */
}
```

## Error Handling

```javascript
// In components
try {
    await window.electron.takeScreenshot(rect)
} catch (error) {
    console.error('Screenshot failed:', error)
    // Show user-friendly error
    store.showToast({
        type: 'error',
        message: 'Failed to take screenshot'
    })
}
```

## DevTools

In development, DevTools are available:
- Main window: `Cmd+Option+I` / `Ctrl+Shift+I`
- Other windows: Right-click → Inspect

## Next Steps

- [IPC Communication](/architecture/ipc-communication) - How renderer talks to main
- [State Management](/architecture/state-management) - Pinia store details
- [Window Management](/architecture/window-management) - Window lifecycle
