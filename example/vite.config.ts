import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
	base: "/lucid-image/",
	build: {
		outDir: "dist"
	},
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"lucid-image": path.resolve(__dirname, "../src") // Local dev
		}
	}
})
