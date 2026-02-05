import{_ as n,o as a,c as p,ag as l}from"./chunks/framework.ClfqGeJY.js";const u=JSON.parse('{"title":"Architecture Overview","description":"","frontmatter":{},"headers":[],"relativePath":"architecture/overview.md","filePath":"architecture/overview.md"}'),i={name:"architecture/overview.md"};function e(r,s,t,c,b,E){return a(),p("div",null,[...s[0]||(s[0]=[l(`<h1 id="architecture-overview" tabindex="-1">Architecture Overview <a class="header-anchor" href="#architecture-overview" aria-label="Permalink to &quot;Architecture Overview&quot;">​</a></h1><p>This document provides a comprehensive view of Snaplark&#39;s architecture, explaining how all components work together layer by layer.</p><h2 id="system-architecture-diagram" tabindex="-1">System Architecture Diagram <a class="header-anchor" href="#system-architecture-diagram" aria-label="Permalink to &quot;System Architecture Diagram&quot;">​</a></h2><p>The following diagram shows the complete system architecture with all layers:</p><div class="language-mermaid vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">graph TB</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph UserLayer[&quot;👤 USER LAYER&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        USER[(&quot;User&quot;)]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        SHORTCUT[&quot;⌨️ Global Shortcuts&lt;br/&gt;Cmd+Option+S / Cmd+Option+R&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        TRAY[&quot;🔲 System Tray Icon&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        UI[&quot;🖥️ App Windows&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph ElectronApp[&quot;⚡ ELECTRON APPLICATION&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        subgraph MainProc[&quot;🟢 MAIN PROCESS (Node.js)&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            direction TB</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            MAIN[&quot;main.js&lt;br/&gt;━━━━━━━━━━━&lt;br/&gt;• App Lifecycle&lt;br/&gt;• IPC Handlers&lt;br/&gt;• Protocol Handler&quot;]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            subgraph Services[&quot;📦 SERVICES&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                WM[&quot;WindowManager&lt;br/&gt;━━━━━━━━━━━&lt;br/&gt;Creates &amp; manages&lt;br/&gt;all windows&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                SS[&quot;ScreenshotService&lt;br/&gt;━━━━━━━━━━━&lt;br/&gt;Screen capture&lt;br/&gt;&amp; processing&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                VRS[&quot;VideoRecordingService&lt;br/&gt;━━━━━━━━━━━&lt;br/&gt;Recording setup&lt;br/&gt;&amp; coordination&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                SM[&quot;ShortcutManager&lt;br/&gt;━━━━━━━━━━━&lt;br/&gt;Global &amp; local&lt;br/&gt;keyboard shortcuts&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                TRAY_SVC[&quot;SystemTray&lt;br/&gt;━━━━━━━━━━━&lt;br/&gt;Tray icon&lt;br/&gt;&amp; menu&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                NS[&quot;NotificationService&lt;br/&gt;━━━━━━━━━━━&lt;br/&gt;Upload progress&lt;br/&gt;&amp; alerts&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                STORE_SVC[&quot;StoreService&lt;br/&gt;━━━━━━━━━━━&lt;br/&gt;Cross-window&lt;br/&gt;state sync&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        subgraph Bridge[&quot;🔐 SECURITY BRIDGE&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            PRELOAD[&quot;preload.js&lt;br/&gt;━━━━━━━━━━━&lt;br/&gt;contextBridge&lt;br/&gt;• Exposes limited API&lt;br/&gt;• Validates requests&lt;br/&gt;• No direct Node access&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        subgraph RendererProc[&quot;🔵 RENDERER PROCESSES (Chromium)&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            direction TB</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            subgraph Windows[&quot;🪟 WINDOWS&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                MAIN_WIN[&quot;Main Window&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Quick menu&lt;br/&gt;User info&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                SS_WIN[&quot;Screenshot Window&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Selection UI&lt;br/&gt;Per display&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                REC_WIN[&quot;Recording Window&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Recording UI&lt;br/&gt;Per display&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                SETTINGS[&quot;Settings Window&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Configuration&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                NOTIF[&quot;Notifications&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Upload progress&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            subgraph VueApp[&quot;🟩 VUE.JS APPLICATION&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                ROUTER[&quot;Vue Router&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Route management&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                PINIA[&quot;Pinia Store&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Reactive state&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                COMPONENTS[&quot;Components&lt;br/&gt;━━━━━━━━━&lt;br/&gt;UI elements&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                KONVA[&quot;Konva Editor&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Annotation tools&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph StorageLayer[&quot;💾 STORAGE LAYER&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ESTORE[(&quot;electron-store&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Encrypted JSON&lt;br/&gt;Persistent config&quot;)]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        DISK[(&quot;Local Disk&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Screenshots&lt;br/&gt;Videos&quot;)]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        TEMP[(&quot;Temp Files&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Recording chunks&quot;)]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph ExternalLayer[&quot;☁️ EXTERNAL SERVICES&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        OS[&quot;🖥️ Operating System&lt;br/&gt;━━━━━━━━━&lt;br/&gt;• Screen capture&lt;br/&gt;• Permissions&lt;br/&gt;• Clipboard&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        API[&quot;🌐 Snaplark API&lt;br/&gt;━━━━━━━━━&lt;br/&gt;• Authentication&lt;br/&gt;• Upload endpoints&lt;br/&gt;• User data&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        S3[&quot;📦 S3 Storage&lt;br/&gt;━━━━━━━━━&lt;br/&gt;• Media files&lt;br/&gt;• App releases&lt;br/&gt;• Auto-updates&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    %% User interactions</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    USER --&gt; SHORTCUT</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    USER --&gt; TRAY</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    USER --&gt; UI</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    %% Shortcut/Tray to Main</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    SHORTCUT --&gt; SM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    TRAY --&gt; TRAY_SVC</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    %% Main process connections</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; WM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; SS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; VRS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; SM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; TRAY_SVC</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; NS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; STORE_SVC</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    %% IPC Bridge</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MainProc &lt;--&gt; |&quot;IPC Messages&quot;| PRELOAD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    PRELOAD &lt;--&gt; |&quot;contextBridge API&quot;| RendererProc</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    %% Renderer internal</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Windows --&gt; VueApp</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ROUTER --&gt; PINIA</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    PINIA --&gt; COMPONENTS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    COMPONENTS --&gt; KONVA</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    %% Storage connections</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    STORE_SVC --&gt; ESTORE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    SS --&gt; DISK</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    VRS --&gt; TEMP</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    TEMP --&gt; DISK</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    %% External connections</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    SS --&gt; OS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    VRS --&gt; OS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    SM --&gt; OS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    PINIA --&gt; API</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    API --&gt; S3</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    %% Styling</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    classDef userLayer fill:#e1f5fe,stroke:#01579b</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    classDef mainProc fill:#c8e6c9,stroke:#2e7d32</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    classDef bridge fill:#fff3e0,stroke:#e65100</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    classDef renderer fill:#e3f2fd,stroke:#1565c0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    classDef storage fill:#f3e5f5,stroke:#7b1fa2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    classDef external fill:#fce4ec,stroke:#c2185b</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br></div></div><h2 id="layer-by-layer-breakdown" tabindex="-1">Layer-by-Layer Breakdown <a class="header-anchor" href="#layer-by-layer-breakdown" aria-label="Permalink to &quot;Layer-by-Layer Breakdown&quot;">​</a></h2><h3 id="layer-1-user-interaction" tabindex="-1">Layer 1: User Interaction <a class="header-anchor" href="#layer-1-user-interaction" aria-label="Permalink to &quot;Layer 1: User Interaction&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                        USER INTERACTION                          │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>│   ⌨️ GLOBAL SHORTCUTS          🔲 SYSTEM TRAY         🖱️ UI    │</span></span>
<span class="line"><span>│   ━━━━━━━━━━━━━━━━━          ━━━━━━━━━━━━          ━━━━━━━   │</span></span>
<span class="line"><span>│   • Cmd+Option+S              • Left-click:         • Buttons  │</span></span>
<span class="line"><span>│     (Screenshot)                Show main           • Menus    │</span></span>
<span class="line"><span>│   • Cmd+Option+R              • Right-click:        • Forms    │</span></span>
<span class="line"><span>│     (Recording)                 Context menu                   │</span></span>
<span class="line"><span>│   • Cmd+Option+Q                                               │</span></span>
<span class="line"><span>│     (Quick Menu)                                               │</span></span>
<span class="line"><span>│                                                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                                   │</span></span>
<span class="line"><span>                                   ▼</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="layer-2-electron-main-process" tabindex="-1">Layer 2: Electron Main Process <a class="header-anchor" href="#layer-2-electron-main-process" aria-label="Permalink to &quot;Layer 2: Electron Main Process&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    MAIN PROCESS (Node.js)                        │</span></span>
<span class="line"><span>│                    Single process, full OS access                │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │</span></span>
<span class="line"><span>│  │   main.js    │  │ WindowManager│  │ Screenshot   │          │</span></span>
<span class="line"><span>│  │  ━━━━━━━━━   │  │  ━━━━━━━━━   │  │  Service     │          │</span></span>
<span class="line"><span>│  │ Entry point  │──│ Creates all  │──│ ━━━━━━━━━    │          │</span></span>
<span class="line"><span>│  │ App lifecycle│  │ windows      │  │ Captures     │          │</span></span>
<span class="line"><span>│  │ IPC setup    │  │ Manages them │  │ screens      │          │</span></span>
<span class="line"><span>│  └──────────────┘  └──────────────┘  └──────────────┘          │</span></span>
<span class="line"><span>│          │                │                 │                   │</span></span>
<span class="line"><span>│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │</span></span>
<span class="line"><span>│  │  Shortcut    │  │   Video      │  │ Notification │          │</span></span>
<span class="line"><span>│  │  Manager     │  │  Recording   │  │   Service    │          │</span></span>
<span class="line"><span>│  │  ━━━━━━━━━   │  │  Service     │  │  ━━━━━━━━━   │          │</span></span>
<span class="line"><span>│  │ Registers    │  │  ━━━━━━━━━   │  │ Toast popups │          │</span></span>
<span class="line"><span>│  │ global keys  │  │ Recording    │  │ Upload       │          │</span></span>
<span class="line"><span>│  │              │  │ coordination │  │ progress     │          │</span></span>
<span class="line"><span>│  └──────────────┘  └──────────────┘  └──────────────┘          │</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                                   │</span></span>
<span class="line"><span>                                   │ IPC (ipcMain ↔ ipcRenderer)</span></span>
<span class="line"><span>                                   ▼</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="layer-3-security-bridge-preload" tabindex="-1">Layer 3: Security Bridge (Preload) <a class="header-anchor" href="#layer-3-security-bridge-preload" aria-label="Permalink to &quot;Layer 3: Security Bridge (Preload)&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    PRELOAD SCRIPT (Bridge)                       │</span></span>
<span class="line"><span>│               Runs in isolated context with limited access       │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>│   contextBridge.exposeInMainWorld(&#39;electron&#39;, {                 │</span></span>
<span class="line"><span>│       // Only these functions are available to renderer:        │</span></span>
<span class="line"><span>│       startScreenshotMode: () =&gt; ipcRenderer.invoke(&#39;...&#39;),     │</span></span>
<span class="line"><span>│       takeScreenshot: (rect) =&gt; ipcRenderer.invoke(&#39;...&#39;),      │</span></span>
<span class="line"><span>│       quit: () =&gt; ipcRenderer.send(&#39;quit-app&#39;),                 │</span></span>
<span class="line"><span>│       // ... limited, validated API surface                     │</span></span>
<span class="line"><span>│   })                                                            │</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>│   ┌────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│   │  ✅ ALLOWED                    ❌ BLOCKED              │   │</span></span>
<span class="line"><span>│   │  ─────────                     ─────────               │   │</span></span>
<span class="line"><span>│   │  • Specific IPC calls          • Direct fs access      │   │</span></span>
<span class="line"><span>│   │  • Window operations           • child_process         │   │</span></span>
<span class="line"><span>│   │  • Store get/set               • require()             │   │</span></span>
<span class="line"><span>│   │  • Defined events              • Node.js globals       │   │</span></span>
<span class="line"><span>│   └────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>                                   │</span></span>
<span class="line"><span>                                   │ contextBridge (safe exposure)</span></span>
<span class="line"><span>                                   ▼</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="layer-4-renderer-processes" tabindex="-1">Layer 4: Renderer Processes <a class="header-anchor" href="#layer-4-renderer-processes" aria-label="Permalink to &quot;Layer 4: Renderer Processes&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                 RENDERER PROCESSES (Chromium)                    │</span></span>
<span class="line"><span>│            One process per window, runs Vue.js app               │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │                    VUE.JS APPLICATION                    │   │</span></span>
<span class="line"><span>│  ├─────────────────────────────────────────────────────────┤   │</span></span>
<span class="line"><span>│  │                                                          │   │</span></span>
<span class="line"><span>│  │  ┌────────────┐   ┌────────────┐   ┌────────────┐      │   │</span></span>
<span class="line"><span>│  │  │ Vue Router │──▶│   Pinia    │──▶│ Components │      │   │</span></span>
<span class="line"><span>│  │  │ ━━━━━━━━━  │   │   Store    │   │ ━━━━━━━━━  │      │   │</span></span>
<span class="line"><span>│  │  │ /          │   │ ━━━━━━━━━  │   │ Views      │      │   │</span></span>
<span class="line"><span>│  │  │ /screenshot│   │ Reactive   │   │ Buttons    │      │   │</span></span>
<span class="line"><span>│  │  │ /recording │   │ state      │   │ Forms      │      │   │</span></span>
<span class="line"><span>│  │  │ /settings  │   │ management │   │ Modals     │      │   │</span></span>
<span class="line"><span>│  │  └────────────┘   └────────────┘   └────────────┘      │   │</span></span>
<span class="line"><span>│  │                                           │              │   │</span></span>
<span class="line"><span>│  │                                    ┌──────▼─────┐       │   │</span></span>
<span class="line"><span>│  │                                    │   Konva    │       │   │</span></span>
<span class="line"><span>│  │                                    │   Editor   │       │   │</span></span>
<span class="line"><span>│  │                                    │ ━━━━━━━━━  │       │   │</span></span>
<span class="line"><span>│  │                                    │ Drawing    │       │   │</span></span>
<span class="line"><span>│  │                                    │ Annotation │       │   │</span></span>
<span class="line"><span>│  │                                    └────────────┘       │   │</span></span>
<span class="line"><span>│  │                                                          │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="process-communication-flow" tabindex="-1">Process Communication Flow <a class="header-anchor" href="#process-communication-flow" aria-label="Permalink to &quot;Process Communication Flow&quot;">​</a></h2><div class="language-mermaid vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sequenceDiagram</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    box rgb(225, 245, 254) User Layer</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        participant User</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    box rgb(200, 230, 201) Main Process</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        participant Main as main.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        participant Service as Services</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    box rgb(255, 243, 224) Bridge</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        participant Preload as preload.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    box rgb(227, 242, 253) Renderer</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        participant Vue as Vue App</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        participant UI as UI Components</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over User,UI: 1️⃣ USER TRIGGERS ACTION</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    User-&gt;&gt;Main: Global Shortcut (Cmd+Option+S)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over Main,Service: 2️⃣ MAIN PROCESS HANDLES</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Main-&gt;&gt;Service: Invoke ScreenshotService</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Service-&gt;&gt;Service: Capture all displays</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Service-&gt;&gt;Main: Return captured data</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over Main,Preload: 3️⃣ IPC TO RENDERER</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Main-&gt;&gt;Preload: Send via IPC channel</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Preload-&gt;&gt;Vue: contextBridge API call</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over Vue,UI: 4️⃣ UI UPDATES</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Vue-&gt;&gt;UI: Update reactive state</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    UI-&gt;&gt;UI: Render screenshot window</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over UI,User: 5️⃣ USER INTERACTION</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    User-&gt;&gt;UI: Select region &amp; annotate</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Note over UI,Main: 6️⃣ SAVE/UPLOAD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    UI-&gt;&gt;Preload: Request save</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Preload-&gt;&gt;Main: IPC invoke</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Main-&gt;&gt;Service: Process &amp; save</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Service--&gt;&gt;User: Done notification</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><h2 id="data-flow-architecture" tabindex="-1">Data Flow Architecture <a class="header-anchor" href="#data-flow-architecture" aria-label="Permalink to &quot;Data Flow Architecture&quot;">​</a></h2><h3 id="screenshot-data-pipeline" tabindex="-1">Screenshot Data Pipeline <a class="header-anchor" href="#screenshot-data-pipeline" aria-label="Permalink to &quot;Screenshot Data Pipeline&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">flowchart LR</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Input[&quot;📥 INPUT&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        DISPLAY[&quot;Display&lt;br/&gt;Screen Content&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Capture[&quot;📸 CAPTURE&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        DC[&quot;desktopCapturer&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Electron API&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        NATIVE[&quot;NativeImage&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Buffer data&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Process[&quot;⚙️ PROCESS&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        CROP[&quot;Crop Region&lt;br/&gt;━━━━━━━━━&lt;br/&gt;User selection&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        KONVA[&quot;Konva Stage&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Add annotations&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        EXPORT[&quot;Export PNG&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Final image&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Output[&quot;📤 OUTPUT&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        CLIP[&quot;📋 Clipboard&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        FILE[&quot;💾 Local File&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        CLOUD[&quot;☁️ Cloud Upload&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    DISPLAY --&gt; DC</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    DC --&gt; NATIVE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    NATIVE --&gt; CROP</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    CROP --&gt; KONVA</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    KONVA --&gt; EXPORT</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    EXPORT --&gt; CLIP</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    EXPORT --&gt; FILE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    EXPORT --&gt; CLOUD</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Input fill:#e3f2fd</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Capture fill:#f3e5f5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Process fill:#fff3e0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Output fill:#e8f5e9</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h3 id="video-recording-pipeline" tabindex="-1">Video Recording Pipeline <a class="header-anchor" href="#video-recording-pipeline" aria-label="Permalink to &quot;Video Recording Pipeline&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">flowchart LR</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Sources[&quot;📥 SOURCES&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        SCREEN[&quot;🖥️ Screen&lt;br/&gt;Display capture&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        MIC[&quot;🎤 Microphone&lt;br/&gt;Audio input&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        SYSAUDIO[&quot;🔊 System Audio&lt;br/&gt;Loopback capture&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        WEBCAM[&quot;📷 Webcam&lt;br/&gt;Camera overlay&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Recording[&quot;🎬 RECORDING&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        STREAM[&quot;MediaStream&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Combined streams&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        RECORDER[&quot;MediaRecorder&lt;br/&gt;━━━━━━━━━&lt;br/&gt;WebM encoding&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        CHUNKS[&quot;Chunks&lt;br/&gt;━━━━━━━━━&lt;br/&gt;~100KB each&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Buffer[&quot;📦 BUFFERING&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        BUFFER[&quot;5MB Buffer&lt;br/&gt;━━━━━━━━━&lt;br/&gt;S3 requirement&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        QUEUE[&quot;Upload Queue&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Ordered chunks&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Storage[&quot;💾 STORAGE&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        TEMP[&quot;Temp File&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Disk write&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        CLOUD[&quot;☁️ Cloud&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Real-time upload&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        FINAL[&quot;Final File&lt;br/&gt;━━━━━━━━━&lt;br/&gt;~/Pictures&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    SCREEN --&gt; STREAM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MIC --&gt; STREAM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    SYSAUDIO --&gt; STREAM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    WEBCAM -.-&gt; |&quot;overlay&quot;| SCREEN</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    STREAM --&gt; RECORDER</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    RECORDER --&gt; CHUNKS</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    CHUNKS --&gt; BUFFER</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    CHUNKS --&gt; TEMP</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    BUFFER --&gt; QUEUE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    QUEUE --&gt; CLOUD</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    TEMP --&gt; FINAL</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Sources fill:#e3f2fd</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Recording fill:#fff3e0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Buffer fill:#f3e5f5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Storage fill:#e8f5e9</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><h2 id="window-hierarchy" tabindex="-1">Window Hierarchy <a class="header-anchor" href="#window-hierarchy" aria-label="Permalink to &quot;Window Hierarchy&quot;">​</a></h2><div class="language-mermaid vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">flowchart TD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph App[&quot;🚀 APPLICATION START&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ELECTRON[&quot;Electron App&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Always[&quot;Always Present&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        TRAY[&quot;🔲 System Tray&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        MAIN[&quot;🏠 Main Window&lt;br/&gt;━━━━━━━━━&lt;br/&gt;232x440px&lt;br/&gt;Quick menu&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph OnDemand[&quot;Created On-Demand&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        SETTINGS[&quot;⚙️ Settings&lt;br/&gt;━━━━━━━━━&lt;br/&gt;450x485px&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        PERMS[&quot;🔐 Permissions&lt;br/&gt;━━━━━━━━━&lt;br/&gt;400x640px&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        WELCOME[&quot;👋 Welcome&lt;br/&gt;━━━━━━━━━&lt;br/&gt;450x455px&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Screenshot[&quot;Screenshot Mode&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        SS1[&quot;📸 Screenshot-1&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Display 1&lt;br/&gt;Fullscreen&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        SS2[&quot;📸 Screenshot-2&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Display 2&lt;br/&gt;Fullscreen&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        DESIGN[&quot;✏️ Design&lt;br/&gt;━━━━━━━━━&lt;br/&gt;800x600px&lt;br/&gt;Annotation&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Recording[&quot;Recording Mode&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        REC1[&quot;🎬 Recording-1&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Display 1&lt;br/&gt;Fullscreen&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        REC2[&quot;🎬 Recording-2&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Display 2&lt;br/&gt;Fullscreen&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        OVERLAY[&quot;🎛️ Overlay&lt;br/&gt;━━━━━━━━━&lt;br/&gt;280x60px&lt;br/&gt;Controls&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        WEBCAM[&quot;📷 Webcam&lt;br/&gt;━━━━━━━━━&lt;br/&gt;208x208px&lt;br/&gt;Draggable&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Notifications[&quot;Notifications&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        NOTIF[&quot;📬 Notifications&lt;br/&gt;━━━━━━━━━&lt;br/&gt;420px wide&lt;br/&gt;Dynamic height&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ELECTRON --&gt; TRAY</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ELECTRON --&gt; MAIN</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; SETTINGS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; PERMS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; WELCOME</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; SS1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; SS2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    SS1 --&gt; DESIGN</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    SS2 --&gt; DESIGN</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; REC1</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; REC2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    REC1 --&gt; OVERLAY</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    REC1 --&gt; WEBCAM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    REC2 --&gt; OVERLAY</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; NOTIF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style App fill:#fff3e0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Always fill:#c8e6c9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style OnDemand fill:#e3f2fd</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Screenshot fill:#fce4ec</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Recording fill:#f3e5f5</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Notifications fill:#fff9c4</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br></div></div><h2 id="service-dependencies" tabindex="-1">Service Dependencies <a class="header-anchor" href="#service-dependencies" aria-label="Permalink to &quot;Service Dependencies&quot;">​</a></h2><div class="language-mermaid vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">flowchart TD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Core[&quot;🎯 CORE&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        MAIN[&quot;main.js&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Entry Point&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Level1[&quot;Level 1: Initialized First&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        STORE[&quot;electron-store&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Persistent storage&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        SM[&quot;ShortcutManager&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Keyboard shortcuts&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Level2[&quot;Level 2: Window Management&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        WM[&quot;WindowManager&lt;br/&gt;━━━━━━━━━&lt;br/&gt;All windows&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        TRAY[&quot;SystemTray&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Tray icon&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Level3[&quot;Level 3: Feature Services&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        SS[&quot;ScreenshotService&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Capture&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        VRS[&quot;VideoRecordingService&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Recording&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        NS[&quot;NotificationService&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Toasts&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        STS[&quot;StoreService&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Sync&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    subgraph Level4[&quot;Level 4: Upload&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        CUM[&quot;ChunkUploadManager&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Video upload&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        CONN[&quot;ConnectivityService&lt;br/&gt;━━━━━━━━━&lt;br/&gt;Online/offline&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        API[&quot;API Client&lt;br/&gt;━━━━━━━━━&lt;br/&gt;HTTP requests&quot;]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    end</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; STORE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; SM</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; WM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    MAIN --&gt; TRAY</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    WM --&gt; SS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    WM --&gt; VRS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    WM --&gt; NS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    WM --&gt; STS</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    TRAY --&gt; WM</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    VRS --&gt; CUM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    CUM --&gt; CONN</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    CUM --&gt; API</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    SS --&gt; WM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    VRS --&gt; WM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    NS --&gt; WM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    STS --&gt; WM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    STS --&gt; STORE</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Core fill:#ffcdd2</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Level1 fill:#f8bbd9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Level2 fill:#e1bee7</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Level3 fill:#d1c4e9</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style Level4 fill:#c5cae9</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br></div></div><h2 id="security-model" tabindex="-1">Security Model <a class="header-anchor" href="#security-model" aria-label="Permalink to &quot;Security Model&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                      SECURITY ARCHITECTURE                       │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  MAIN PROCESS                                            TRUSTED │</span></span>
<span class="line"><span>│  ━━━━━━━━━━━━                                                   │</span></span>
<span class="line"><span>│  ✅ Full Node.js access                                         │</span></span>
<span class="line"><span>│  ✅ File system operations                                      │</span></span>
<span class="line"><span>│  ✅ Native module access                                        │</span></span>
<span class="line"><span>│  ✅ System API access                                           │</span></span>
<span class="line"><span>└───────────────────────────────┬─────────────────────────────────┘</span></span>
<span class="line"><span>                                │</span></span>
<span class="line"><span>                    ┌───────────▼───────────┐</span></span>
<span class="line"><span>                    │   PRELOAD SCRIPT      │</span></span>
<span class="line"><span>                    │   ━━━━━━━━━━━━━━━     │</span></span>
<span class="line"><span>                    │   🔐 contextBridge    │</span></span>
<span class="line"><span>                    │   • Limited API       │</span></span>
<span class="line"><span>                    │   • Validated calls   │</span></span>
<span class="line"><span>                    │   • No require()      │</span></span>
<span class="line"><span>                    └───────────┬───────────┘</span></span>
<span class="line"><span>                                │</span></span>
<span class="line"><span>┌───────────────────────────────▼─────────────────────────────────┐</span></span>
<span class="line"><span>│  RENDERER PROCESS                                    UNTRUSTED  │</span></span>
<span class="line"><span>│  ━━━━━━━━━━━━━━━━                                               │</span></span>
<span class="line"><span>│  ❌ No Node.js access                                           │</span></span>
<span class="line"><span>│  ❌ No file system                                              │</span></span>
<span class="line"><span>│  ❌ No native modules                                           │</span></span>
<span class="line"><span>│  ✅ Only window.electron.* APIs                                 │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  BUILD-TIME SECURITY (Fuses)                                    │</span></span>
<span class="line"><span>│  ━━━━━━━━━━━━━━━━━━━━━━━━━━                                     │</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>│  [DISABLED]                         [ENABLED]                   │</span></span>
<span class="line"><span>│  ──────────                         ─────────                   │</span></span>
<span class="line"><span>│  • RunAsNode: false                 • CookieEncryption: true    │</span></span>
<span class="line"><span>│  • NodeOptions: false               • ASARIntegrity: true       │</span></span>
<span class="line"><span>│  • InspectArgs: false               • OnlyLoadFromASAR: true    │</span></span>
<span class="line"><span>│                                                                  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────────┘</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><h2 id="file-system-layout" tabindex="-1">File System Layout <a class="header-anchor" href="#file-system-layout" aria-label="Permalink to &quot;File System Layout&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>PROJECT STRUCTURE                    RUNTIME FILES</span></span>
<span class="line"><span>━━━━━━━━━━━━━━━━━                   ━━━━━━━━━━━━━━</span></span>
<span class="line"><span></span></span>
<span class="line"><span>snaplark/                            ~/Library/Application Support/Snaplark/</span></span>
<span class="line"><span>├── src/                             ├── config.json          # Settings</span></span>
<span class="line"><span>│   ├── main.js                      └── Cache/               # Chromium</span></span>
<span class="line"><span>│   ├── preload.js</span></span>
<span class="line"><span>│   ├── renderer.js                  ~/Pictures/Snaplark/</span></span>
<span class="line"><span>│   ├── services/                    ├── screenshot-*.png     # Captures</span></span>
<span class="line"><span>│   │   ├── window-manager.js        └── recording-*.webm     # Videos</span></span>
<span class="line"><span>│   │   ├── screenshot-service.js</span></span>
<span class="line"><span>│   │   ├── video-recording-service.js</span></span>
<span class="line"><span>│   │   └── ...                      $TMPDIR/</span></span>
<span class="line"><span>│   ├── views/                       └── snaplark-recording-* # Temp files</span></span>
<span class="line"><span>│   ├── components/</span></span>
<span class="line"><span>│   └── composables/</span></span>
<span class="line"><span>├── forge.config.js</span></span>
<span class="line"><span>└── package.json</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><p>Now that you understand the architecture:</p><ol><li><strong><a href="/snaplark-docs/architecture/main-process.html">Main Process</a></strong> - Deep dive into main.js and services</li><li><strong><a href="/snaplark-docs/architecture/renderer-process.html">Renderer Process</a></strong> - Vue app and components</li><li><strong><a href="/snaplark-docs/architecture/ipc-communication.html">IPC Communication</a></strong> - Message passing patterns</li><li><strong><a href="/snaplark-docs/architecture/state-management.html">State Management</a></strong> - Pinia + electron-store</li><li><strong><a href="/snaplark-docs/architecture/window-management.html">Window Management</a></strong> - Window lifecycle</li></ol>`,32)])])}const k=n(i,[["render",e]]);export{u as __pageData,k as default};
