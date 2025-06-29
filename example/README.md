# 🧪 Lucid Image Example Playground

This is a demo app for the [`lucid-image`](https://npmjs.com/package/lucid-image) React component.

It showcases:

- ✅ Basic `<LucidImage />` usage
- 🌫️ Blur-up preview image
- 🌀 Shimmer loading skeleton
- 💥 Fallback image switching
- 🔁 Tab-based demo switcher (Basic / Advanced)

---

## 📦 Installation

```bash
pnpm install
```

## 🚀 Run locally

```bash
pnpm dev
```

## 🧱 Build static site

```bash
pnpm build
```

## 🌐 Preview locally

```bash
pnpm preview
```

## 🚢 Deploy to GitHub Pages (auto via CI)

This repo is set up to deploy the example to GitHub Pages using GitHub Actions.

---

## 🔗 Live demo

```
https://chrisachoo.github.io/lucid-image/
```

---

## 🛠 `vite.config.ts` for GitHub Pages compatibility

Make sure this is inside your `example/vite.config.ts`:

```ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
	base: "/lucid-image/", // match your GitHub repo name!
	plugins: [react()]
})
```
