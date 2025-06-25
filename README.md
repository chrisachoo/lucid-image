# 📸 lucid-image

A modern, lightweight React image component with built-in **lazy loading**, **blur preview**, and **fallback support** — ideal for static websites, SPAs, and performance-optimized applications.

## ✨ Features

- ✅ Lazy loading with `loading="lazy"`
- 🌀 Blur-up preview before full image loads
- 🚨 Fallback image if the main source fails
- 🧠 Smart handling of local/public and remote image paths
- 📦 Optional `getImage()` helper with CDN + image size support
- ⚡ Works out of the box with React 18+
- 🪶 Tiny and dependency-free (no external image libraries!)

---

## 📦 Installation

```bash
pnpm add lucid-image
```

---

## 🛠️ Usage

### Basic usage (from `/public`)

```tsx
import { LucidImage } from "lucid-image"

<LucidImage
	src="/images/photo.jpg"
	alt="Photo"
	blurSrc="/images/photo-blur.jpg"
	fallbackSrc="/images/fallback.jpg"
/>
```

### Advanced: Using `getImage()` (Optional)

```tsx
import { getImage, LucidImage } from "lucid-image"

const image = getImage({
	basePath: "/images",
	cdn: "vercel", // or 'cloudflare'
	fallbackSrc: "/images/fallback.jpg",
	src: "/images/photo.jpg"
})

export function Example() {
	return (
		<LucidImage
			{...image}
			alt="Optimized image"
		/>
	)
}
```

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

## 🔧 getImage() (Optional Build-Time Helper)

`getImage()` helps you:

- Normalize image paths
- Apply CDN URLs (Vercel, Cloudflare)
- Automatically detect width & height for local `/public` files (via `image-size`)

```ts
getImage({
	basePath: "/images",
	cdn: "vercel",
	publicDir: "public",
	src: "/photo.jpg"
})
```

---

## 🧾 License

MIT — Free for personal and commercial use.

## 🙋 Support

Open an [issue](https://github.com/chrisachoo/lucid-image/issues) or PR. Contributions welcome!

---

Made with 💡 by [@chrisachoo](https://github.com/chrisachoo)
