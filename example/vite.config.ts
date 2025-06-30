import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vite"

export default defineConfig({
	base: '/lucid-image/',
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"lucid-image": path.resolve(__dirname, "../src") // Local dev
		}
	},
	build: {
		outDir: 'dist',
	}
})
