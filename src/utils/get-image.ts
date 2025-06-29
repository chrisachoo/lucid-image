type GetImageOptions = {
	src: string
	fallbackSrc?: string
	basePath?: string
	cdn?: "vercel" | "cloudflare" | "none" | "auto"
	publicDir?: string // for resolving absolute file path
}

/**
 * Resolves and returns the appropriate image source path based on the environment,
 * base path, CDN configuration, and optionally includes image dimensions (on server).
 *
 * @param {GetImageOptions} options - Configuration options for resolving the image.
 * @param {string} options.src - The main image source path or remote URL.
 * @param {string} [options.fallbackSrc] - Optional fallback image path (relative).
 * @param {string} [options.basePath] - A base path to prefix to local image paths.
 * @param {"vercel" | "cloudflare" | "none" | "auto"} [options.cdn] - CDN configuration to optimize image delivery.
 * @param {string} [options.publicDir] - Directory used to resolve local image dimensions on the server.
 *
 * @returns {{
 *   src: string,
 *   fallbackSrc?: string,
 *   width?: number,
 *   height?: number
 * }} - The resolved image path (with optional CDN applied), fallback path, and dimensions (if available).
 *
 * Notes:
 * - If a remote image URL is provided, it is returned as-is (with CDN applied if enabled).
 * - If running in a Node.js (server) context and the image is local, it attempts to resolve dimensions using `image-size`.
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
		height?: number
		src: string
		width?: number
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

	// Only resolve image dimensions on the server
	let width: number | undefined
	let height: number | undefined

	if (typeof window === "undefined" && !isRemote) {
		(async () => {
			const fs = await import("node:fs")
			const path = await import("node:path")
			const imageSize = (await import("image-size")).default
			try {
				const imagePath = path.resolve(process.cwd(), publicDir, normalize(src))
				const buffer = fs.readFileSync(imagePath)
				const dimensions = imageSize(buffer)
				if (dimensions.width && dimensions.height) {
					width = dimensions.width
					height = dimensions.height
				}
			}
			catch (err) {
				console.warn(`[lucid-image] Unable to resolve image size: ${err}`)
			}
		})()
	}

	return {
		fallbackSrc: fallback,
		height,
		src: cdnSrc,
		width
	}
}
