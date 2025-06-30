import { defineConfig } from "tsup"

export default defineConfig({
	clean: true,
	dts: true,
	entry: ["src/index.ts"],
	esbuildOptions(options) {
		options.platform = "neutral" // or "node" if SSR-only
	},
	external: ["image-size", "node:fs"],
	format: ["esm", "cjs"],
	ignoreWatch: ["src/utils/get-image-size.server.ts"],
	minify: true,
	outDir: "dist",

	sourcemap: true,
	target: "esnext"
})
