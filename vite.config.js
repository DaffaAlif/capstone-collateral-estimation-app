import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import flowbite from 'flowbite/plugin'


// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),  tailwindcss(), flowbite()],
})
