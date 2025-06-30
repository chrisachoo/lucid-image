type GetImageOptions = {
	src: string
	fallbackSrc?: string
	basePath?: string
	cdn?: "vercel" | "cloudflare" | "none" | "auto"
	publicDir?: string // for resolving absolute file path
	cloudflareAccountHash?: string // for Cloudflare Image Delivery CDN
}

/**
 * Resolves and returns the appropriate image source path based on environment, base path, and CDN configuration.
 *
 * @param {GetImageOptions} options - Options for resolving the image.
 * @param {string} options.src - The main image source path or remote URL.
 * @param {string} [options.fallbackSrc] - Optional fallback image path (relative).
 * @param {string} [options.basePath] - A base path to prefix to local image paths. Defaults to publicDir.
 * @param {"vercel" | "cloudflare" | "none" | "auto"} [options.cdn] - CDN configuration to optimize image delivery.
 * @param {string} [options.publicDir] - Directory used to resolve local image paths (not used in browser, defaults to 'public').
 * @param {string} [options.cloudflareAccountHash] - Cloudflare Image Delivery account hash for CDN URLs. Required if cdn is 'cloudflare'.
 *
 * @returns {{ src: string, fallbackSrc?: string }} - The resolved image path (with optional CDN applied) and fallback path.
 *
 * Notes:
 * - If a remote image URL is provided, it is returned as-is (with CDN applied if enabled).
 * - CDN options currently support "vercel" (Next.js image optimization) and "cloudflare" (Image Delivery).
 * - If cdn is 'cloudflare', you must provide cloudflareAccountHash for correct URLs.
 */
export function getImage({
	basePath,
	cdn = "none",
	cloudflareAccountHash,
	fallbackSrc,
	publicDir = "public",
	src
}: GetImageOptions): {
		fallbackSrc?: string
		src: string
	} {
	const isRemote = /^https?:\/\//.test(src)
	const effectiveBasePath = basePath ?? publicDir

	const normalize = (s: string): string => (s.startsWith("/") ? s : `/${s}`)
	const fullSrc = isRemote ? src : effectiveBasePath + normalize(src)
	const fallback = fallbackSrc
		? effectiveBasePath + normalize(fallbackSrc)
		: undefined

	let cdnSrc = fullSrc
	if (cdn === "vercel") {
		cdnSrc = `/_next/image?url=${encodeURIComponent(fullSrc)}&w=1080&q=75`
	}
	else if (cdn === "cloudflare") {
		if (!cloudflareAccountHash) {
			console.warn(
				"[lucid-image] Cloudflare CDN selected but no account hash provided."
			)
			cdnSrc = `https://imagedelivery.net/default/${fullSrc}/public`
		}
		else {
			cdnSrc = `https://imagedelivery.net/${cloudflareAccountHash}/${fullSrc}/public`
		}
	}

	return {
		fallbackSrc: fallback,
		src: cdnSrc
	}
}
