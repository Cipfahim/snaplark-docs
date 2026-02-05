# Getting Started

This guide will help you set up the Snaplark development environment and understand the basic workflow.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **Git**
- **macOS** (for macOS builds with code signing) or **Windows** (for Windows builds)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/snaplark/snaplark.git
cd snaplark
```

### 2. Install Dependencies

```bash
npm install
```

This will install all dependencies including:
- Electron 38.3.0
- Vue 3 and related packages
- Electron Forge toolchain
- Native modules (will be rebuilt for Electron)

### 3. Environment Configuration

Create a `.env` file in the project root with the following variables:

```env
# Apple Developer credentials (macOS only)
APPLE_ID=your-apple-id@email.com
APPLE_PASSWORD=app-specific-password
APPLE_TEAM_ID=YOUR_TEAM_ID
APP_IDENTITY="Developer ID Application: Your Company Name"

# AWS/S3 credentials for publishing
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_DEFAULT_REGION=usc1
AWS_BUCKET=main-storage
```

::: warning Important
Never commit the `.env` file to version control. It contains sensitive credentials.
:::

## Running the Application

### Development Mode

```bash
npm start
```

This command:
1. Starts the Vite development server
2. Launches Electron with hot-reload enabled
3. Opens DevTools for debugging

### Development Tips

- **Hot Reload**: Changes to renderer code (Vue components) will hot-reload automatically
- **Main Process Changes**: Require app restart (Ctrl+C and `npm start` again)
- **DevTools**: Available in all windows during development

## Common Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start in development mode |
| `npm run package` | Package the app (no installer) |
| `npm run make` | Create platform installers |
| `npm run publish` | Build and publish to S3 |
| `npm run rebuild` | Rebuild native modules |

## Project Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `forge.config.js` | Electron Forge build configuration |
| `vite.main.config.mjs` | Vite config for main process |
| `vite.renderer.config.mjs` | Vite config for renderer |
| `vite.preload.config.mjs` | Vite config for preload script |
| `entitlements.plist` | macOS app permissions |
| `.env` | Environment variables (not committed) |

## Verifying Setup

After running `npm start`, you should see:

1. The Snaplark app icon in your system tray
2. The main window appearing near the tray icon
3. Global shortcuts working:
   - `Cmd+Option+S` (Mac) / `Ctrl+Alt+S` (Windows) - Screenshot
   - `Cmd+Option+R` (Mac) / `Ctrl+Alt+R` (Windows) - Recording

## Troubleshooting

### Native Module Issues

If you encounter native module errors:

```bash
npm run rebuild
```

This rebuilds native modules (like `electron-audio-loopback`) for your Electron version.

### Permission Issues (macOS)

The app will prompt for permissions on first run:
- Screen Recording
- Camera
- Microphone
- Accessibility

Grant all permissions for full functionality.

### Port Conflicts

If the dev server fails to start, another process may be using the port. The Vite dev server typically uses port 5173.

## Next Steps

- [Project Structure](/guide/project-structure) - Learn the codebase organization
- [Technology Stack](/guide/tech-stack) - Understand the technologies used
- [Architecture Overview](/architecture/overview) - Deep dive into the architecture
