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
         '@components': fileURLToPath(
            new URL('./src/components', import.meta.url)
         )
      }
   },
   server: {
      port: 8080,
      proxy: {
         '/api': {
            target: 'http://192.168.220.1:9090',
            changeOrigin: true
         }
      }
   }
})
