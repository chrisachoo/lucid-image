# 📸 lucid-image

A modern, lightweight React image component with built-in **lazy loading**, **blur preview**, and **fallback support** — ideal for static websites, SPAs, and performance-optimized applications.

## ✨ Features

- ✅ Lazy loading with `loading="lazy"`
- 🌀 Blur-up preview before full image loads
- 🚨 Fallback image if the main source fails
- 🧠 Smart handling of local/public and remote image paths
- ⚡ Works out of the box with React 18+
- 🪶 Tiny and dependency-free (no external image libraries!)

---

## 📦 Installation

Using your preferred package manager:

```bash
pnpm add lucid-image
# or
npm install lucid-image
# or
yarn add lucid-image
```

---

## 🛠️ Usage

```tsx
import { SmartImage } from "lucid-image"

;<SmartImage
	src="/images/photo.jpg" // required
	alt="Sample Image" // optional alt text
	blurSrc="/images/photo-blur.jpg" // optional low-res placeholder
	fallbackSrc="/images/fallback.jpg" // optional fallback image
	width={300}
	style={{ borderRadius: 8 }}
/>
```

> ✅ `src` defaults to loading from `/public` unless a full `https://` URL is provided.

---

## 🧪 Local Testing

You can run the example app:

```bash
cd example
pnpm install
pnpm run dev
```

Ensure your images are placed under `example/public/images/`.

---

## 🧰 Props

| Prop          | Type        | Default  | Description                              |
| ------------- | ----------- | -------- | ---------------------------------------- |
| `src`         | string      | —        | Main image source (local or external)    |
| `fallbackSrc` | string      | —        | Optional fallback image if main fails    |
| `blurSrc`     | string      | —        | Optional placeholder shown while loading |
| `basePath`    | string      | `""`     | Base path prefix for relative `src`      |
| `alt`         | string      | `""`     | Alternative text for accessibility       |
| `loading`     | string      | `"lazy"` | Native lazy-loading behavior             |
| `style`       | object      | —        | Inline styles passed to the `img` tag    |
| ...rest       | `img` props | —        | Native HTML `<img>` props supported      |

---

## 🧾 License

MIT — Free for personal and commercial use.

---

## 🙋 Support or Contributions

Want to report a bug, request a feature, or contribute?
Open an [issue](https://github.com/chrisachoo/lucid-image/issues) or submit a PR. Contributions welcome!

---

## 🔗 Related

- Works perfectly with Vite, Next.js, Astro, Remix, CRA, and more!
- Consider combining with a CDN for dynamic `blurSrc` or fallback generation

---

Made with 💡 by [@chrisachoo](https://github.com/chrisachoo)
