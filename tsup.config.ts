import { defineConfig } from "tsup"

export default defineConfig({
	clean: true,
	dts: true,
	entry: ["src/index.ts"],
	esbuildOptions(options) {
		options.platform = "neutral" // or "node" if SSR-only
	},
	format: ["esm", "cjs"],
	minify: true,
	outDir: "dist",
	sourcemap: true,
	target: "esnext"
})
