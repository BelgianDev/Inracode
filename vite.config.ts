import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { version } from './package.json';

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    define: {
        __APP_VERSION__: JSON.stringify(version), // Replace `__APP_VERSION__` at build-time
    }
})
