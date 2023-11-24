import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ViteIcons from 'vite-plugin-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteIcons,],
})
