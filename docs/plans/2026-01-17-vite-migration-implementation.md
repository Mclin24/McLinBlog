# Vue + Vite Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate McLinBlog from Vue CLI to Vite with latest Vue 3, Pinia state management, and PWA support

**Architecture:** Clean migration approach - create fresh Vite project structure, migrate existing components/views/assets, replace Vuex with Pinia, configure Vite for proxy/aliases/PWA

**Tech Stack:** Vite 6.x, Vue 3.5.x, Pinia 2.x, Vue Router 4.x, TypeScript, vite-plugin-pwa, tsparticles

---

### Task 1: Initialize Vite Project Structure

**Files:**
- Create: `package.json` (replace existing)
- Create: `vite.config.ts`
- Create: `env.d.ts`
- Create: `index.html` (root level, not in public/)
- Modify: `tsconfig.json`

**Step 1: Create new package.json with Vite dependencies**

```json
{
  "name": "myblog",
  "version": "0.2.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tsparticles/vue3": "^3.0.1",
    "pinia": "^2.2.0",
    "tsparticles": "^3.3.0",
    "vue": "^3.5.13",
    "vue-router": "^4.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "@types/node": "^22.10.2",
    "sass": "^1.83.0",
    "typescript": "^5.7.2",
    "vite": "^6.0.5",
    "vite-plugin-pwa": "^0.21.1",
    "vue-tsc": "^2.2.0"
  }
}
```

**Step 2: Create vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'McLin24 Blog',
        short_name: 'McLin24',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.220.1:9090',
        changeOrigin: true
      }
    }
  }
})
```

**Step 3: Create env.d.ts for Vite types**

```typescript
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

**Step 4: Create index.html at root**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="/favicon.ico">
    <title>McLin24</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      #app {
        min-width: 1200px;
        height: 100vh;
      }
      body {
        margin: 0;
        padding: 0;
      }
      div {
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but McLin24 doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

**Step 5: Update tsconfig.json for Vite**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@views/*": ["./src/views/*"],
      "@components/*": ["./src/components/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Step 6: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

**Step 7: Install dependencies**

Run: `npm install`
Expected: All dependencies install successfully

**Step 8: Commit initial Vite setup**

```bash
git add package.json vite.config.ts env.d.ts index.html tsconfig.json tsconfig.node.json
git commit -m "feat: initialize Vite project structure"
```

---

### Task 2: Migrate Router Configuration

**Files:**
- Modify: `src/router/index.ts`

**Step 1: Update router for Vite environment**

Replace `process.env.BASE_URL` with `import.meta.env.BASE_URL`:

```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Pratice from '@/views/pratice.vue'
import Robot from '@/views/Robot.vue'
import PictureWall from '@/views/PictureWall.vue'
import VirtualScroll from '@/views/VirtualScroll.vue'
import McWallFlow from '@/views/McWallFlow.vue'
import ParticlesView from '@/views/ParticlesView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home',
        name: '',
        component: Home,
        children: []
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/pratice',
        name: 'Pratice',
        component: Pratice
    },
    {
        path: '/robot',
        name: 'Robot',
        component: Robot
    },
    {
        path: '/picture_wall',
        name: 'PictureWall',
        component: PictureWall
    },
    {
        path: '/virtual_scroll',
        name: 'VirtualScroll',
        component: VirtualScroll
    },
    {
        path: '/mc_wall_flow',
        name: 'McWallFlow',
        component: McWallFlow
    },
    {
        path: '/particles_view',
        name: 'ParticlesView',
        component: ParticlesView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router
```

**Step 2: Commit router update**

```bash
git add src/router/index.ts
git commit -m "feat: update router for Vite environment"
```

---

### Task 3: Create Pinia Store

**Files:**
- Create: `src/stores/index.ts`
- Delete: `src/store/index.ts` (after migration)

**Step 1: Create Pinia store directory**

Run: `mkdir -p src/stores`

**Step 2: Create basic Pinia store**

Since the existing Vuex store is empty, create a minimal Pinia setup:

```typescript
// src/stores/index.ts
import { defineStore } from 'pinia'

// Example store - can be expanded later
export const useAppStore = defineStore('app', {
  state: () => ({
    // Add state here as needed
  }),
  getters: {
    // Add getters here as needed
  },
  actions: {
    // Add actions here as needed
  }
})
```

**Step 3: Commit Pinia store**

```bash
git add src/stores/index.ts
git commit -m "feat: create Pinia store structure"
```

---

### Task 4: Update main.ts for Vite and Pinia

**Files:**
- Modify: `src/main.ts`

**Step 1: Update main.ts**

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/iconfont/iconfont.css'
import ToolsTip from '@/components/toolsTip.vue'
import ImageHover from '@/components/ImageHover.vue'
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'

const pinia = createPinia()
const mcApp = createApp(App)

mcApp
    .use(pinia)
    .use(router)
    .use(Particles, {
        init: async (engine: any) => {
            await loadFull(engine)
        }
    })
    .component('ImageHover', ImageHover)
    .component('ToolsTip', ToolsTip)
    .mount('#app')
```

**Step 2: Commit main.ts update**

```bash
git add src/main.ts
git commit -m "feat: update main.ts for Pinia and Vite"
```

---

### Task 5: Update shims-vue.d.ts

**Files:**
- Delete: `src/shims-vue.d.ts` (replaced by env.d.ts)

**Step 1: Remove old shims file**

Run: `git rm src/shims-vue.d.ts`

**Step 2: Commit removal**

```bash
git commit -m "chore: remove old shims-vue.d.ts (replaced by env.d.ts)"
```

---

### Task 6: Clean Up Old Vue CLI Files

**Files:**
- Delete: `babel.config.js`
- Delete: `vue.config.js`
- Delete: `.browserslistrc`
- Delete: `.eslintrc.js`
- Delete: `src/store/` directory
- Delete: `public/index.html`

**Step 1: Remove Vue CLI config files**

```bash
git rm babel.config.js vue.config.js .browserslistrc .eslintrc.js
git rm -r src/store
git rm public/index.html
```

**Step 2: Commit cleanup**

```bash
git commit -m "chore: remove Vue CLI configuration files"
```

---

### Task 7: Test Development Server

**Files:**
- None (testing only)

**Step 1: Start dev server**

Run: `npm run dev`
Expected: Server starts on http://localhost:5173 with instant HMR

**Step 2: Verify in browser**

- Open http://localhost:5173
- Check that home page loads
- Test navigation to different routes
- Verify particles effect works
- Check that components render correctly

**Step 3: Check console for errors**

Expected: No errors in browser console

---

### Task 8: Test Production Build

**Files:**
- None (testing only)

**Step 1: Run production build**

Run: `npm run build`
Expected: Build completes successfully, creates `dist/` directory

**Step 2: Preview production build**

Run: `npm run preview`
Expected: Production build serves correctly

**Step 3: Verify build output**

- Check dist/ contains index.html, assets/, etc.
- Verify chunk splitting is working
- Check that CSS is extracted properly

---

### Task 9: Update .gitignore for Vite

**Files:**
- Modify: `.gitignore`

**Step 1: Update .gitignore**

Add Vite-specific entries:

```
.DS_Store
node_modules
/dist
.worktrees

# Vite
dist-ssr
*.local

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

**Step 2: Commit .gitignore update**

```bash
git add .gitignore
git commit -m "chore: update .gitignore for Vite"
```

---

### Task 10: Final Verification

**Files:**
- None (testing only)

**Step 1: Run full test cycle**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Test dev server
npm run dev
# Verify in browser, then stop server

# Test production build
npm run build
npm run preview
# Verify in browser
```

**Step 2: Verify all features**

- [ ] Dev server starts instantly
- [ ] Hot module replacement works
- [ ] All routes navigate correctly
- [ ] Particles effect renders
- [ ] Components display properly
- [ ] Proxy configuration works (if API available)
- [ ] Production build succeeds
- [ ] PWA manifest generated
- [ ] TypeScript compilation has no errors

**Step 3: Create final commit if any fixes needed**

```bash
git add .
git commit -m "fix: final adjustments for Vite migration"
```

---

## Success Criteria

- ✅ Dev server starts with instant HMR
- ✅ All existing components render correctly
- ✅ Routing works as expected
- ✅ Pinia replaces Vuex successfully
- ✅ PWA features configured (manifest generated)
- ✅ Production build completes successfully
- ✅ Proxy configuration preserved
- ✅ TypeScript compilation has no errors
- ✅ All Vue CLI files removed
- ✅ Project uses latest Vue 3.5.x and Vite 6.x

## Notes

- The existing Vuex store is empty, so Pinia migration is minimal
- Service worker registration is commented out in original - PWA plugin handles this automatically
- All existing components should work without modification
- tsparticles configuration remains unchanged
- Path aliases (@, @views, @components) preserved in Vite config
