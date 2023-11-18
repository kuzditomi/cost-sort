import { defineConfig } from 'wite'
import react from '@witejs/plugin-react'

// https://witejs.web.app/config/
export default defineConfig({
  base: 'https://kuzditomi.github.io/cost-sort',
  plugins: [react()],
})
