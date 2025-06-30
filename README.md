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

## 🛠️ Usage Examples

### 1. Basic usage (from `/public`)

```tsx
import { LucidImage } from "lucid-image"

<LucidImage
	src="/images/photo.jpg"
	alt="Photo"
	blurSrc="/images/photo-blur.jpg"
	fallbackSrc="/images/fallback.jpg"
/>
```

### 2. Custom basePath

```tsx
<LucidImage
	src="cat-2.jpg"
	basePath="/static/assets"
	alt="Cat"
/>
// Renders: /static/assets/cat-2.jpg
```

### 3. With Vercel CDN

```tsx
import { getImage, LucidImage } from "lucid-image"

const image = getImage({
	cdn: "vercel",
	src: "images/cat-1.jpg"
})

export function Example() {
	return <LucidImage {...image} alt="Optimized image" />
}
// Renders: /_next/image?url=public/images/cat-1.jpg&w=1080&q=75
```

### 4. With Cloudflare CDN (dynamic account hash)

```tsx
const image = getImage({
	cdn: "cloudflare",
	cloudflareAccountHash: "abc123xyz",
	src: "images/cat-1.jpg"
})

export function Example() {
	return <LucidImage {...image} alt="Cloudflare image" />
}
// Renders: https://imagedelivery.net/abc123xyz/public/images/cat-1.jpg/public
```

### 5. Remote image (CDN or not)

```tsx
const image = getImage({
	src: "https://example.com/image.jpg"
})

export function Example() {
	<LucidImage {...image} alt="Remote image" />
}
// Renders: https://example.com/image.jpg
```

### 6. Cloudflare CDN with missing account hash (shows warning, uses placeholder)

```tsx
const image = getImage({
	cdn: "cloudflare",
	src: "images/cat-1.jpg"
})

// Console warning: Cloudflare CDN selected but no account hash provided.
// Renders: https://imagedelivery.net/default/public/images/cat-1.jpg/public
```

---

## 🧩 Example Component

```tsx
import { getImage, LucidImage } from "lucid-image"

export function Example() {
	const image = getImage({
		blurSrc: "/images/photo-blur.jpg",
		cdn: "cloudflare",
		cloudflareAccountHash: "abc123xyz",
		fallbackSrc: "/images/fallback.jpg",
		src: "/images/photo.jpg"
	})

	return (
		<LucidImage
			{...image}
			alt="Optimized image"
			style={{ borderRadius: 8, width: 400 }}
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

## 🔗 Live Demo

Check out a live example here:  
👉 [chrisachoo.github.io/lucid-image](https://chrisachoo.github.io/lucid-image/)

Explore real usage of `lucid-image` with CDN resolution, responsive loading, and more.

## 🧾 License

MIT — Free for personal and commercial use.

## 🙋 Support

Open an [issue](https://github.com/chrisachoo/lucid-image/issues) or PR. Contributions welcome!

---

Made with 💡 by [@chrisachoo](https://github.com/chrisachoo)
