---
layout: home

hero:
  name: "Snaplark"
  text: "Technical Documentation"
  tagline: Screenshots & Videos. Moments, captured instantly.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View Architecture
      link: /architecture/overview

features:
  - icon: "📸"
    title: Screenshot Capture
    details: Multi-display screenshot capture with magnifier, crosshair, and OCR text extraction capabilities.
  - icon: "🎬"
    title: Video Recording
    details: Screen recording with webcam overlay, microphone, and system audio capture with real-time cloud upload.
  - icon: "✏️"
    title: Annotation Tools
    details: Full-featured annotation editor with shapes, arrows, blur, text, and highlighting using Konva.js.
  - icon: "☁️"
    title: Cloud Integration
    details: Seamless cloud upload with chunk-based video streaming and automatic retry on connectivity issues.
  - icon: "⚡"
    title: Global Shortcuts
    details: Customizable global keyboard shortcuts for instant capture from anywhere.
  - icon: "🔄"
    title: Auto Updates
    details: Automatic updates via S3 storage with platform-specific installers.
---

## Quick Overview

**Snaplark** is a cross-platform desktop application built with Electron that enables users to:

- Capture screenshots with pixel-perfect precision
- Record screen videos with webcam and audio
- Annotate captures with professional drawing tools
- Upload media to the cloud instantly
- Share captures via generated links

### Current Version

- **Version:** 1.1.4
- **Platforms:** macOS (ARM64, x64), Windows (x64, ia32), Linux (deb, rpm)
- **Framework:** Electron 38.3.0

### Key Technologies

| Technology | Purpose |
|------------|---------|
| Electron | Cross-platform desktop framework |
| Vue 3 | UI framework with Composition API |
| Pinia | State management |
| Konva.js | Canvas drawing and annotation |
| Tesseract.js | OCR text extraction |
| Tailwind CSS | Styling framework |
| Vite | Build tool and dev server |
| Electron Forge | Build, package, and publish |

---

## Documentation Structure

This documentation is organized into four main sections:

1. **[Guide](/guide/getting-started)** - Getting started, project structure, and technology stack
2. **[Features](/features/screenshot)** - Detailed explanation of each feature
3. **[Architecture](/architecture/overview)** - Technical architecture and code organization
4. **[Deployment](/deployment/build-process)** - Build, signing, publishing, and updates

---

## For New Developers

If you're new to this project, we recommend reading in this order:

1. [Getting Started](/guide/getting-started) - Setup and run the project
2. [Project Structure](/guide/project-structure) - Understand the codebase layout
3. [Architecture Overview](/architecture/overview) - Understand how components interact
4. [IPC Communication](/architecture/ipc-communication) - Learn the main-renderer bridge

## For Non-Technical Readers

If you want to understand what the app does without diving into code:

1. [Screenshot Capture](/features/screenshot) - How screenshot capture works
2. [Video Recording](/features/video-recording) - How video recording works
3. [Cloud Upload](/features/cloud-upload) - How uploads are handled
4. [Auto Updates](/deployment/auto-updates) - How updates reach users
