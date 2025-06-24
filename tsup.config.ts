import { defineConfig } from "tsup"

export default defineConfig({
	clean: true,
	dts: true,
	entry: ["src/index.ts"],
	external: ["react"],
	format: ["esm", "cjs"]
})
