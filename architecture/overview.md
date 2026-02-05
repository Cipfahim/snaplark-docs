# Architecture Overview

This document provides a comprehensive view of Snaplark's architecture, explaining how all components work together layer by layer.

## System Architecture Diagram

The following diagram shows the complete system architecture with all layers:

```mermaid
graph TB
    subgraph UserLayer["👤 USER LAYER"]
        USER[("User")]
        SHORTCUT["⌨️ Global Shortcuts<br/>Cmd+Option+S / Cmd+Option+R"]
        TRAY["🔲 System Tray Icon"]
        UI["🖥️ App Windows"]
    end

    subgraph ElectronApp["⚡ ELECTRON APPLICATION"]
        subgraph MainProc["🟢 MAIN PROCESS (Node.js)"]
            direction TB
            MAIN["main.js<br/>━━━━━━━━━━━<br/>• App Lifecycle<br/>• IPC Handlers<br/>• Protocol Handler"]

            subgraph Services["📦 SERVICES"]
                WM["WindowManager<br/>━━━━━━━━━━━<br/>Creates & manages<br/>all windows"]
                SS["ScreenshotService<br/>━━━━━━━━━━━<br/>Screen capture<br/>& processing"]
                VRS["VideoRecordingService<br/>━━━━━━━━━━━<br/>Recording setup<br/>& coordination"]
                SM["ShortcutManager<br/>━━━━━━━━━━━<br/>Global & local<br/>keyboard shortcuts"]
                TRAY_SVC["SystemTray<br/>━━━━━━━━━━━<br/>Tray icon<br/>& menu"]
                NS["NotificationService<br/>━━━━━━━━━━━<br/>Upload progress<br/>& alerts"]
                STORE_SVC["StoreService<br/>━━━━━━━━━━━<br/>Cross-window<br/>state sync"]
            end
        end

        subgraph Bridge["🔐 SECURITY BRIDGE"]
            PRELOAD["preload.js<br/>━━━━━━━━━━━<br/>contextBridge<br/>• Exposes limited API<br/>• Validates requests<br/>• No direct Node access"]
        end

        subgraph RendererProc["🔵 RENDERER PROCESSES (Chromium)"]
            direction TB
            subgraph Windows["🪟 WINDOWS"]
                MAIN_WIN["Main Window<br/>━━━━━━━━━<br/>Quick menu<br/>User info"]
                SS_WIN["Screenshot Window<br/>━━━━━━━━━<br/>Selection UI<br/>Per display"]
                REC_WIN["Recording Window<br/>━━━━━━━━━<br/>Recording UI<br/>Per display"]
                SETTINGS["Settings Window<br/>━━━━━━━━━<br/>Configuration"]
                NOTIF["Notifications<br/>━━━━━━━━━<br/>Upload progress"]
            end

            subgraph VueApp["🟩 VUE.JS APPLICATION"]
                ROUTER["Vue Router<br/>━━━━━━━━━<br/>Route management"]
                PINIA["Pinia Store<br/>━━━━━━━━━<br/>Reactive state"]
                COMPONENTS["Components<br/>━━━━━━━━━<br/>UI elements"]
                KONVA["Konva Editor<br/>━━━━━━━━━<br/>Annotation tools"]
            end
        end
    end

    subgraph StorageLayer["💾 STORAGE LAYER"]
        ESTORE[("electron-store<br/>━━━━━━━━━<br/>Encrypted JSON<br/>Persistent config")]
        DISK[("Local Disk<br/>━━━━━━━━━<br/>Screenshots<br/>Videos")]
        TEMP[("Temp Files<br/>━━━━━━━━━<br/>Recording chunks")]
    end

    subgraph ExternalLayer["☁️ EXTERNAL SERVICES"]
        OS["🖥️ Operating System<br/>━━━━━━━━━<br/>• Screen capture<br/>• Permissions<br/>• Clipboard"]
        API["🌐 Snaplark API<br/>━━━━━━━━━<br/>• Authentication<br/>• Upload endpoints<br/>• User data"]
        S3["📦 S3 Storage<br/>━━━━━━━━━<br/>• Media files<br/>• App releases<br/>• Auto-updates"]
    end

    %% User interactions
    USER --> SHORTCUT
    USER --> TRAY
    USER --> UI

    %% Shortcut/Tray to Main
    SHORTCUT --> SM
    TRAY --> TRAY_SVC

    %% Main process connections
    MAIN --> WM
    MAIN --> SS
    MAIN --> VRS
    MAIN --> SM
    MAIN --> TRAY_SVC
    MAIN --> NS
    MAIN --> STORE_SVC

    %% IPC Bridge
    MainProc <--> |"IPC Messages"| PRELOAD
    PRELOAD <--> |"contextBridge API"| RendererProc

    %% Renderer internal
    Windows --> VueApp
    ROUTER --> PINIA
    PINIA --> COMPONENTS
    COMPONENTS --> KONVA

    %% Storage connections
    STORE_SVC --> ESTORE
    SS --> DISK
    VRS --> TEMP
    TEMP --> DISK

    %% External connections
    SS --> OS
    VRS --> OS
    SM --> OS
    PINIA --> API
    API --> S3

    %% Styling
    classDef userLayer fill:#e1f5fe,stroke:#01579b
    classDef mainProc fill:#c8e6c9,stroke:#2e7d32
    classDef bridge fill:#fff3e0,stroke:#e65100
    classDef renderer fill:#e3f2fd,stroke:#1565c0
    classDef storage fill:#f3e5f5,stroke:#7b1fa2
    classDef external fill:#fce4ec,stroke:#c2185b
```

## Layer-by-Layer Breakdown

### Layer 1: User Interaction

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERACTION                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ⌨️ GLOBAL SHORTCUTS          🔲 SYSTEM TRAY         🖱️ UI    │
│   ━━━━━━━━━━━━━━━━━          ━━━━━━━━━━━━          ━━━━━━━   │
│   • Cmd+Option+S              • Left-click:         • Buttons  │
│     (Screenshot)                Show main           • Menus    │
│   • Cmd+Option+R              • Right-click:        • Forms    │
│     (Recording)                 Context menu                   │
│   • Cmd+Option+Q                                               │
│     (Quick Menu)                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
```

### Layer 2: Electron Main Process

```
┌─────────────────────────────────────────────────────────────────┐
│                    MAIN PROCESS (Node.js)                        │
│                    Single process, full OS access                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   main.js    │  │ WindowManager│  │ Screenshot   │          │
│  │  ━━━━━━━━━   │  │  ━━━━━━━━━   │  │  Service     │          │
│  │ Entry point  │──│ Creates all  │──│ ━━━━━━━━━    │          │
│  │ App lifecycle│  │ windows      │  │ Captures     │          │
│  │ IPC setup    │  │ Manages them │  │ screens      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│          │                │                 │                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Shortcut    │  │   Video      │  │ Notification │          │
│  │  Manager     │  │  Recording   │  │   Service    │          │
│  │  ━━━━━━━━━   │  │  Service     │  │  ━━━━━━━━━   │          │
│  │ Registers    │  │  ━━━━━━━━━   │  │ Toast popups │          │
│  │ global keys  │  │ Recording    │  │ Upload       │          │
│  │              │  │ coordination │  │ progress     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   │ IPC (ipcMain ↔ ipcRenderer)
                                   ▼
```

### Layer 3: Security Bridge (Preload)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRELOAD SCRIPT (Bridge)                       │
│               Runs in isolated context with limited access       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   contextBridge.exposeInMainWorld('electron', {                 │
│       // Only these functions are available to renderer:        │
│       startScreenshotMode: () => ipcRenderer.invoke('...'),     │
│       takeScreenshot: (rect) => ipcRenderer.invoke('...'),      │
│       quit: () => ipcRenderer.send('quit-app'),                 │
│       // ... limited, validated API surface                     │
│   })                                                            │
│                                                                  │
│   ┌────────────────────────────────────────────────────────┐   │
│   │  ✅ ALLOWED                    ❌ BLOCKED              │   │
│   │  ─────────                     ─────────               │   │
│   │  • Specific IPC calls          • Direct fs access      │   │
│   │  • Window operations           • child_process         │   │
│   │  • Store get/set               • require()             │   │
│   │  • Defined events              • Node.js globals       │   │
│   └────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                                   │
                                   │ contextBridge (safe exposure)
                                   ▼
```

### Layer 4: Renderer Processes

```
┌─────────────────────────────────────────────────────────────────┐
│                 RENDERER PROCESSES (Chromium)                    │
│            One process per window, runs Vue.js app               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    VUE.JS APPLICATION                    │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │                                                          │   │
│  │  ┌────────────┐   ┌────────────┐   ┌────────────┐      │   │
│  │  │ Vue Router │──▶│   Pinia    │──▶│ Components │      │   │
│  │  │ ━━━━━━━━━  │   │   Store    │   │ ━━━━━━━━━  │      │   │
│  │  │ /          │   │ ━━━━━━━━━  │   │ Views      │      │   │
│  │  │ /screenshot│   │ Reactive   │   │ Buttons    │      │   │
│  │  │ /recording │   │ state      │   │ Forms      │      │   │
│  │  │ /settings  │   │ management │   │ Modals     │      │   │
│  │  └────────────┘   └────────────┘   └────────────┘      │   │
│  │                                           │              │   │
│  │                                    ┌──────▼─────┐       │   │
│  │                                    │   Konva    │       │   │
│  │                                    │   Editor   │       │   │
│  │                                    │ ━━━━━━━━━  │       │   │
│  │                                    │ Drawing    │       │   │
│  │                                    │ Annotation │       │   │
│  │                                    └────────────┘       │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Process Communication Flow

```mermaid
sequenceDiagram
    box rgb(225, 245, 254) User Layer
        participant User
    end

    box rgb(200, 230, 201) Main Process
        participant Main as main.js
        participant Service as Services
    end

    box rgb(255, 243, 224) Bridge
        participant Preload as preload.js
    end

    box rgb(227, 242, 253) Renderer
        participant Vue as Vue App
        participant UI as UI Components
    end

    Note over User,UI: 1️⃣ USER TRIGGERS ACTION
    User->>Main: Global Shortcut (Cmd+Option+S)

    Note over Main,Service: 2️⃣ MAIN PROCESS HANDLES
    Main->>Service: Invoke ScreenshotService
    Service->>Service: Capture all displays
    Service->>Main: Return captured data

    Note over Main,Preload: 3️⃣ IPC TO RENDERER
    Main->>Preload: Send via IPC channel
    Preload->>Vue: contextBridge API call

    Note over Vue,UI: 4️⃣ UI UPDATES
    Vue->>UI: Update reactive state
    UI->>UI: Render screenshot window

    Note over UI,User: 5️⃣ USER INTERACTION
    User->>UI: Select region & annotate

    Note over UI,Main: 6️⃣ SAVE/UPLOAD
    UI->>Preload: Request save
    Preload->>Main: IPC invoke
    Main->>Service: Process & save
    Service-->>User: Done notification
```

## Data Flow Architecture

### Screenshot Data Pipeline

```mermaid
flowchart LR
    subgraph Input["📥 INPUT"]
        DISPLAY["Display<br/>Screen Content"]
    end

    subgraph Capture["📸 CAPTURE"]
        DC["desktopCapturer<br/>━━━━━━━━━<br/>Electron API"]
        NATIVE["NativeImage<br/>━━━━━━━━━<br/>Buffer data"]
    end

    subgraph Process["⚙️ PROCESS"]
        CROP["Crop Region<br/>━━━━━━━━━<br/>User selection"]
        KONVA["Konva Stage<br/>━━━━━━━━━<br/>Add annotations"]
        EXPORT["Export PNG<br/>━━━━━━━━━<br/>Final image"]
    end

    subgraph Output["📤 OUTPUT"]
        CLIP["📋 Clipboard"]
        FILE["💾 Local File"]
        CLOUD["☁️ Cloud Upload"]
    end

    DISPLAY --> DC
    DC --> NATIVE
    NATIVE --> CROP
    CROP --> KONVA
    KONVA --> EXPORT
    EXPORT --> CLIP
    EXPORT --> FILE
    EXPORT --> CLOUD

    style Input fill:#e3f2fd
    style Capture fill:#f3e5f5
    style Process fill:#fff3e0
    style Output fill:#e8f5e9
```

### Video Recording Pipeline

```mermaid
flowchart LR
    subgraph Sources["📥 SOURCES"]
        SCREEN["🖥️ Screen<br/>Display capture"]
        MIC["🎤 Microphone<br/>Audio input"]
        SYSAUDIO["🔊 System Audio<br/>Loopback capture"]
        WEBCAM["📷 Webcam<br/>Camera overlay"]
    end

    subgraph Recording["🎬 RECORDING"]
        STREAM["MediaStream<br/>━━━━━━━━━<br/>Combined streams"]
        RECORDER["MediaRecorder<br/>━━━━━━━━━<br/>WebM encoding"]
        CHUNKS["Chunks<br/>━━━━━━━━━<br/>~100KB each"]
    end

    subgraph Buffer["📦 BUFFERING"]
        BUFFER["5MB Buffer<br/>━━━━━━━━━<br/>S3 requirement"]
        QUEUE["Upload Queue<br/>━━━━━━━━━<br/>Ordered chunks"]
    end

    subgraph Storage["💾 STORAGE"]
        TEMP["Temp File<br/>━━━━━━━━━<br/>Disk write"]
        CLOUD["☁️ Cloud<br/>━━━━━━━━━<br/>Real-time upload"]
        FINAL["Final File<br/>━━━━━━━━━<br/>~/Pictures"]
    end

    SCREEN --> STREAM
    MIC --> STREAM
    SYSAUDIO --> STREAM
    WEBCAM -.-> |"overlay"| SCREEN

    STREAM --> RECORDER
    RECORDER --> CHUNKS

    CHUNKS --> BUFFER
    CHUNKS --> TEMP

    BUFFER --> QUEUE
    QUEUE --> CLOUD

    TEMP --> FINAL

    style Sources fill:#e3f2fd
    style Recording fill:#fff3e0
    style Buffer fill:#f3e5f5
    style Storage fill:#e8f5e9
```

## Window Hierarchy

```mermaid
flowchart TD
    subgraph App["🚀 APPLICATION START"]
        ELECTRON["Electron App"]
    end

    subgraph Always["Always Present"]
        TRAY["🔲 System Tray"]
        MAIN["🏠 Main Window<br/>━━━━━━━━━<br/>232x440px<br/>Quick menu"]
    end

    subgraph OnDemand["Created On-Demand"]
        SETTINGS["⚙️ Settings<br/>━━━━━━━━━<br/>450x485px"]
        PERMS["🔐 Permissions<br/>━━━━━━━━━<br/>400x640px"]
        WELCOME["👋 Welcome<br/>━━━━━━━━━<br/>450x455px"]
    end

    subgraph Screenshot["Screenshot Mode"]
        SS1["📸 Screenshot-1<br/>━━━━━━━━━<br/>Display 1<br/>Fullscreen"]
        SS2["📸 Screenshot-2<br/>━━━━━━━━━<br/>Display 2<br/>Fullscreen"]
        DESIGN["✏️ Design<br/>━━━━━━━━━<br/>800x600px<br/>Annotation"]
    end

    subgraph Recording["Recording Mode"]
        REC1["🎬 Recording-1<br/>━━━━━━━━━<br/>Display 1<br/>Fullscreen"]
        REC2["🎬 Recording-2<br/>━━━━━━━━━<br/>Display 2<br/>Fullscreen"]
        OVERLAY["🎛️ Overlay<br/>━━━━━━━━━<br/>280x60px<br/>Controls"]
        WEBCAM["📷 Webcam<br/>━━━━━━━━━<br/>208x208px<br/>Draggable"]
    end

    subgraph Notifications["Notifications"]
        NOTIF["📬 Notifications<br/>━━━━━━━━━<br/>420px wide<br/>Dynamic height"]
    end

    ELECTRON --> TRAY
    ELECTRON --> MAIN

    MAIN --> SETTINGS
    MAIN --> PERMS
    MAIN --> WELCOME

    MAIN --> SS1
    MAIN --> SS2
    SS1 --> DESIGN
    SS2 --> DESIGN

    MAIN --> REC1
    MAIN --> REC2
    REC1 --> OVERLAY
    REC1 --> WEBCAM
    REC2 --> OVERLAY

    MAIN --> NOTIF

    style App fill:#fff3e0
    style Always fill:#c8e6c9
    style OnDemand fill:#e3f2fd
    style Screenshot fill:#fce4ec
    style Recording fill:#f3e5f5
    style Notifications fill:#fff9c4
```

## Service Dependencies

```mermaid
flowchart TD
    subgraph Core["🎯 CORE"]
        MAIN["main.js<br/>━━━━━━━━━<br/>Entry Point"]
    end

    subgraph Level1["Level 1: Initialized First"]
        STORE["electron-store<br/>━━━━━━━━━<br/>Persistent storage"]
        SM["ShortcutManager<br/>━━━━━━━━━<br/>Keyboard shortcuts"]
    end

    subgraph Level2["Level 2: Window Management"]
        WM["WindowManager<br/>━━━━━━━━━<br/>All windows"]
        TRAY["SystemTray<br/>━━━━━━━━━<br/>Tray icon"]
    end

    subgraph Level3["Level 3: Feature Services"]
        SS["ScreenshotService<br/>━━━━━━━━━<br/>Capture"]
        VRS["VideoRecordingService<br/>━━━━━━━━━<br/>Recording"]
        NS["NotificationService<br/>━━━━━━━━━<br/>Toasts"]
        STS["StoreService<br/>━━━━━━━━━<br/>Sync"]
    end

    subgraph Level4["Level 4: Upload"]
        CUM["ChunkUploadManager<br/>━━━━━━━━━<br/>Video upload"]
        CONN["ConnectivityService<br/>━━━━━━━━━<br/>Online/offline"]
        API["API Client<br/>━━━━━━━━━<br/>HTTP requests"]
    end

    MAIN --> STORE
    MAIN --> SM

    MAIN --> WM
    MAIN --> TRAY

    WM --> SS
    WM --> VRS
    WM --> NS
    WM --> STS

    TRAY --> WM

    VRS --> CUM
    CUM --> CONN
    CUM --> API

    SS --> WM
    VRS --> WM
    NS --> WM
    STS --> WM
    STS --> STORE

    style Core fill:#ffcdd2
    style Level1 fill:#f8bbd9
    style Level2 fill:#e1bee7
    style Level3 fill:#d1c4e9
    style Level4 fill:#c5cae9
```

## Security Model

```
┌─────────────────────────────────────────────────────────────────┐
│                      SECURITY ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  MAIN PROCESS                                            TRUSTED │
│  ━━━━━━━━━━━━                                                   │
│  ✅ Full Node.js access                                         │
│  ✅ File system operations                                      │
│  ✅ Native module access                                        │
│  ✅ System API access                                           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │   PRELOAD SCRIPT      │
                    │   ━━━━━━━━━━━━━━━     │
                    │   🔐 contextBridge    │
                    │   • Limited API       │
                    │   • Validated calls   │
                    │   • No require()      │
                    └───────────┬───────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────┐
│  RENDERER PROCESS                                    UNTRUSTED  │
│  ━━━━━━━━━━━━━━━━                                               │
│  ❌ No Node.js access                                           │
│  ❌ No file system                                              │
│  ❌ No native modules                                           │
│  ✅ Only window.electron.* APIs                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  BUILD-TIME SECURITY (Fuses)                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━                                     │
│                                                                  │
│  [DISABLED]                         [ENABLED]                   │
│  ──────────                         ─────────                   │
│  • RunAsNode: false                 • CookieEncryption: true    │
│  • NodeOptions: false               • ASARIntegrity: true       │
│  • InspectArgs: false               • OnlyLoadFromASAR: true    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## File System Layout

```
PROJECT STRUCTURE                    RUNTIME FILES
━━━━━━━━━━━━━━━━━                   ━━━━━━━━━━━━━━

snaplark/                            ~/Library/Application Support/Snaplark/
├── src/                             ├── config.json          # Settings
│   ├── main.js                      └── Cache/               # Chromium
│   ├── preload.js
│   ├── renderer.js                  ~/Pictures/Snaplark/
│   ├── services/                    ├── screenshot-*.png     # Captures
│   │   ├── window-manager.js        └── recording-*.webm     # Videos
│   │   ├── screenshot-service.js
│   │   ├── video-recording-service.js
│   │   └── ...                      $TMPDIR/
│   ├── views/                       └── snaplark-recording-* # Temp files
│   ├── components/
│   └── composables/
├── forge.config.js
└── package.json
```

## Next Steps

Now that you understand the architecture:

1. **[Main Process](/architecture/main-process)** - Deep dive into main.js and services
2. **[Renderer Process](/architecture/renderer-process)** - Vue app and components
3. **[IPC Communication](/architecture/ipc-communication)** - Message passing patterns
4. **[State Management](/architecture/state-management)** - Pinia + electron-store
5. **[Window Management](/architecture/window-management)** - Window lifecycle
