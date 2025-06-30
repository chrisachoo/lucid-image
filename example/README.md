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
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
	base: "/lucid-image/", // match your GitHub repo name!
	plugins: [react()]
})
```

## ℹ️ Why use `import.meta.env.BASE_URL` for image paths?

When deploying this example app to GitHub Pages (or any subpath), the base URL of the site is not `/`, but instead matches the repository name (e.g., `/lucid-image/`). Vite injects this base path into the app via `import.meta.env.BASE_URL`.

By using `import.meta.env.BASE_URL` to construct image paths, it ensures that all assets (like images) are loaded correctly regardless of whether the app is served from the root domain or a subpath. This is especially important when this example lives in a separate repo or is deployed to GitHub Pages, as the workflow and hosting context may change the base path.

**Example:**

```js
basePath: `${import.meta.env.BASE_URL}images`
```

This makes the image URLs work both locally and on GitHub Pages.

---

## 🛠 Why set `base` and `resolve` in `vite.config.ts`?

- **`base`**: This tells Vite to prepend the specified path (e.g., `/lucid-image/`) to all built assets and routes. This is required for correct asset loading when deploying to GitHub Pages, which serves your site from a subdirectory matching your repo name.
- **`resolve.alias`**: This is set so that the example app can import the local `lucid-image` source code directly (for local development and testing), instead of pulling from npm. This is especially useful when the example app resides in a separate repo but you want to test local changes to the main package.

**In summary:**

- `import.meta.env.BASE_URL` ensures your image and asset paths are always correct, no matter where the app is hosted.
- `base` in Vite config is required for subpath deployments (like GitHub Pages).
- `resolve.alias` allows local development against the main package source, even when the example is in a different repo.
