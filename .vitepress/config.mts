import { defineConfig } from 'vitepress'

export default defineConfig({
    base: '/snaplark-docs/',
    title: 'Snaplark Documentation',
    description: 'Comprehensive documentation for Snaplark - Screenshot & Video Recording Desktop App',

    themeConfig: {
        logo: '/logo.png',

        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/getting-started' },
            { text: 'Features', link: '/features/screenshot' },
            { text: 'Architecture', link: '/architecture/overview' },
            { text: 'Deployment', link: '/deployment/build-process' }
        ],

        sidebar: {
            '/guide/': [
                {
                    text: 'Introduction',
                    items: [
                        { text: 'Getting Started', link: '/guide/getting-started' },
                        { text: 'Project Structure', link: '/guide/project-structure' },
                        { text: 'Technology Stack', link: '/guide/tech-stack' }
                    ]
                }
            ],
            '/features/': [
                {
                    text: 'Core Features',
                    items: [
                        { text: 'Screenshot Capture', link: '/features/screenshot' },
                        { text: 'Video Recording', link: '/features/video-recording' },
                        { text: 'Annotation Tools', link: '/features/annotation-tools' },
                        { text: 'Cloud Upload', link: '/features/cloud-upload' },
                        { text: 'Global Shortcuts', link: '/features/shortcuts' },
                        { text: 'System Permissions', link: '/features/permissions' }
                    ]
                }
            ],
            '/architecture/': [
                {
                    text: 'Technical Architecture',
                    items: [
                        { text: 'Overview', link: '/architecture/overview' },
                        { text: 'Main Process', link: '/architecture/main-process' },
                        { text: 'Renderer Process', link: '/architecture/renderer-process' },
                        { text: 'IPC Communication', link: '/architecture/ipc-communication' },
                        { text: 'State Management', link: '/architecture/state-management' },
                        { text: 'Window Management', link: '/architecture/window-management' }
                    ]
                }
            ],
            '/deployment/': [
                {
                    text: 'Build & Deployment',
                    items: [
                        { text: 'Build Process', link: '/deployment/build-process' },
                        { text: 'Code Signing', link: '/deployment/code-signing' },
                        { text: 'Publishing', link: '/deployment/publishing' },
                        { text: 'Auto Updates', link: '/deployment/auto-updates' }
                    ]
                }
            ]
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/snaplark/snaplark' }],

        footer: {
            message: 'Snaplark - Screenshots & Videos. Moments, captured instantly.',
            copyright: 'Copyright © 2026 Snaplark PTE Limited'
        },

        search: {
            provider: 'local'
        },

        outline: {
            level: [2, 3]
        }
    },

    markdown: {
        lineNumbers: true
    }
})
