# Smart Image Component

A lightweight, standalone React component for optimized image loading with blur and fallback support.

## Features

- Default loads from `/public` unless a full URL is provided
- Supports lazy loading
- Optional blur-up placeholder
- Optional fallback image on error
- Works with React 18+

## Install

```bash
npm install smart-image
```

If using a project without `create-react-app`, ensure you have the required peer dependencies:

```bash
npm install react react-dom
```

## Usage

```tsx
import { SmartImage } from "smart-image"
;<SmartImage
	src="/images/car.jpg"
	alt="Car"
	fallbackSrc="/images/fallback.jpg"
	blurSrc="/images/blur.jpg"
/>
```

## Build

```bash
npm run build
```

## License

MIT
