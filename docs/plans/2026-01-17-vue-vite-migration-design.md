# Vue + Vite Migration Design

**Date:** 2026-01-17
**Project:** McLinBlog
**Goal:** Migrate from Vue CLI to Vite with latest Vue 3, modernize tooling, and switch to Pinia

## Overview

This design outlines a clean migration approach that creates a fresh Vite-based project structure while preserving existing code. The migration prioritizes modern tooling, including the latest Vue 3, Vite build system, and Pinia state management.

## Requirements

- Migrate from Vue CLI to Vite
- Update to latest Vue 3 (3.5.x)
- Switch from Vuex to Pinia for state management
- Maintain PWA support
- Preserve existing functionality (proxy, aliases, components)
- Modernize dependencies and remove deprecated patterns

## Migration Strategy

### Approach: Clean Migration

Create a fresh Vite project and systematically migrate files over. This ensures the cleanest Vite setup without Vue CLI artifacts.

**Benefits:**
- Cleanest result without legacy config baggage
- Easier to troubleshoot issues
- Full benefits of Vite's optimizations
- Modern project structure from the start

### Project Structure

```
McLinBlog/
├── src/
│   ├── components/     # Existing components (ImageCard, McWaterFall, etc.)
│   ├── views/          # Existing views
│   ├── router/         # Vue Router 4 config
│   ├── stores/         # Pinia stores (replacing store/)
│   ├── utils/          # Utility functions
│   ├── assets/         # Static assets (iconfont, images)
│   ├── App.vue
│   └── main.ts
├── public/             # Static files
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript config
├── env.d.ts            # Vite type definitions
└── package.json
```

**Key Changes:**
- `store/` → `stores/` (Pinia convention)
- All Vue CLI config files → single `vite.config.ts`
- Simplified build configuration

## Vite Configuration

### Path Aliases

Replace Vue CLI's chainWebpack with Vite's simpler resolve.alias:

```typescript
resolve: {
  alias: {
    '@': '/src',
    '@views': '/src/views',
    '@components': '/src/components'
  }
}
```

### Development Server & Proxy

Migrate existing proxy configuration:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://192.168.220.1:9090',
      changeOrigin: true
    }
  }
}
```

### PWA Configuration

Use `vite-plugin-pwa` to maintain PWA functionality:
- Service worker registration (adapt existing registerServiceWorker.ts)
- Manifest generation for installability
- Offline caching strategies
- Workbox options for asset caching

### Build Optimizations

Vite provides better defaults, with configuration for:
- Chunk splitting for optimal caching
- Asset inlining thresholds
- Source maps for production debugging
- CSS code splitting

### TypeScript Integration

Vite uses esbuild for TypeScript (much faster than Vue CLI's ts-loader). Existing `tsconfig.json` works with minimal adjustments for Vite-specific types.

## State Management: Vuex to Pinia

### Migration Approach

Pinia offers better TypeScript support and simpler API than Vuex.

**Key Differences:**
- No mutations (just actions that can be sync or async)
- No nested modules (flat store structure, compose stores instead)
- Better TypeScript inference without manual typing
- Simpler API: `state`, `getters`, `actions`

### Conversion Strategy

1. Analyze existing Vuex store structure in `src/store/index.ts`
2. Create individual Pinia stores in `src/stores/` directory
3. Convert Vuex modules to separate Pinia stores
4. Update component imports from `useStore()` to specific store composables

**Example Conversion:**

```typescript
// Vuex
store.commit('setUser', user)
store.dispatch('fetchUser')

// Pinia
const userStore = useUserStore()
userStore.user = user  // Direct mutation
userStore.fetchUser()  // Action call
```

### Store Setup

In `main.ts`:
```typescript
// Old: app.use(store)
// New: app.use(createPinia())
```

**Benefits:**
- Removes boilerplate (no mutation types, action types)
- Better DevTools integration
- Automatic code splitting per store
- Easier testing (stores are just functions)

## Component & Asset Migration

### Components

All existing Vue components work with minimal changes:
- `.vue` files migrate as-is (Vue 3 SFC syntax compatible)
- Update Composition API imports if using Options API
- tsparticles components remain unchanged
- Custom components (ImageCard, McWaterFall, toolsTip, etc.) work without modification

### Assets

- Move `src/assets/` contents directly (iconfont, images, etc.)
- Vite handles static assets: use `new URL('./asset.png', import.meta.url)` for dynamic imports
- Public folder assets remain in `public/` and are served at root

### Style Handling

- SCSS files work natively in Vite (install `sass` package)
- Global styles imported in `main.ts`
- Scoped styles in components work identically

## Router Configuration

Vue Router 4 requires minor updates:

**Changes:**
- Import from `vue-router` (v4)
- `createRouter` and `createWebHistory` replace `new Router`
- Improved route typing with TypeScript
- Keep existing route definitions

**Example:**
```typescript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [/* existing routes */]
})
```

## Dependencies

### Remove (Vue CLI)

- All `@vue/cli-*` packages
- `babel.config.js`
- `vue.config.js`
- `.browserslistrc`
- Old ESLint config (will reconfigure for Vite)

### Add (Vite Ecosystem)

- `vite` (^6.0.0)
- `@vitejs/plugin-vue` (^5.0.0)
- `vite-plugin-pwa` (^0.21.0)
- `pinia` (^2.2.0)
- `vue` (^3.5.0)
- `vue-router` (^4.4.0)

### Keep

- `tsparticles`, `@tsparticles/vue3`
- `typescript`
- `sass` (for SCSS support)

## Migration Execution Steps

### Step 1: Backup & Branch
- Create git branch: `feature/vite-migration`
- Commit current state

### Step 2: Initialize Vite Project
- Run `npm create vite@latest temp-vite -- --template vue-ts`
- Copy Vite config structure as reference

### Step 3: Update Dependencies
- Replace package.json dependencies
- Run `npm install`

### Step 4: Configuration Files
- Create `vite.config.ts` with proxy, aliases, PWA
- Update `tsconfig.json` for Vite
- Create `env.d.ts` for Vite types

### Step 5: Migrate Code
- Copy `src/` contents
- Update `main.ts` for Pinia
- Migrate Vuex stores to Pinia stores
- Update imports if needed

### Step 6: Update Scripts
Change `package.json` scripts to use Vite commands:
- `serve` → `dev: vite`
- `build` → `build: vite build`
- Add `preview: vite preview`

### Step 7: Testing & Cleanup
- Test dev server functionality
- Test production build
- Verify PWA functionality
- Remove old Vue CLI files
- Update `.gitignore` for Vite

## Success Criteria

- Dev server starts with instant HMR
- All existing components render correctly
- Routing works as expected
- State management functions properly
- PWA features work (offline, installable)
- Production build completes successfully
- Proxy configuration works for API calls
- TypeScript compilation has no errors

## Risks & Mitigations

**Risk:** tsparticles compatibility issues with Vite
**Mitigation:** Test particle effects early; fallback to alternative particle library if needed

**Risk:** Service worker registration differences
**Mitigation:** Use vite-plugin-pwa's built-in service worker generation; adapt existing config

**Risk:** Asset import path issues
**Mitigation:** Update asset imports to use Vite's `import.meta.url` pattern where needed

**Risk:** Build size increases
**Mitigation:** Configure chunk splitting and tree-shaking in Vite config

## Timeline Considerations

This is a significant migration touching all aspects of the build system. Recommend:
- Thorough testing at each step
- Incremental commits for easy rollback
- Testing in development environment before production deployment
