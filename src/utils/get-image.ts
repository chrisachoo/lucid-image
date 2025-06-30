type GetImageOptions = {
	src: string
	fallbackSrc?: string
	basePath?: string
	cdn?: "vercel" | "cloudflare" | "none" | "auto"
	publicDir?: string // for resolving absolute file path
}

/**
 * Resolves and returns the appropriate image source path based on environment, base path, and CDN configuration.
 *
 * @param {GetImageOptions} options - Options for resolving the image.
 * @param {string} options.src - The main image source path or remote URL.
 * @param {string} [options.fallbackSrc] - Optional fallback image path (relative).
 * @param {string} [options.basePath] - A base path to prefix to local image paths.
 * @param {"vercel" | "cloudflare" | "none" | "auto"} [options.cdn] - CDN configuration to optimize image delivery.
 * @param {string} [options.publicDir] - Directory used to resolve local image paths (not used in browser).
 *
 * @returns {{ src: string, fallbackSrc?: string }} - The resolved image path (with optional CDN applied) and fallback path.
 *
 * Notes:
 * - If a remote image URL is provided, it is returned as-is (with CDN applied if enabled).
 * - CDN options currently support "vercel" (Next.js image optimization) and "cloudflare" (Image Delivery).
 */
export function getImage({
	basePath = "",
	cdn = "none",
	fallbackSrc,
	publicDir = "public",
	src
}: GetImageOptions): {
		fallbackSrc?: string
		src: string
	} {
	const isRemote = /^https?:\/\//.test(src)
	const normalize = (s: string): string => (s.startsWith("/") ? s : `/${s}`)
	const fullSrc = isRemote ? src : basePath + normalize(src)
	const fallback = fallbackSrc ? basePath + normalize(fallbackSrc) : undefined

	let cdnSrc = fullSrc
	if (cdn === "vercel") {
		cdnSrc = `/_next/image?url=${encodeURIComponent(fullSrc)}&w=1080&q=75`
	}
	else if (cdn === "cloudflare") {
		cdnSrc = `https://imagedelivery.net/YOUR_ACCOUNT_HASH/${fullSrc}/public`
	}

	return {
		fallbackSrc: fallback,
		src: cdnSrc
	}
}
