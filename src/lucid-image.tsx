import type { ImgHTMLAttributes, JSX } from "react"
import { useRef, useState } from "react"
import { resolveImage } from "./utils/resolve-image"

export type LucidImageProps = {
	src: string
	fallbackSrc?: string
	blurSrc?: string
	basePath?: string
} & ImgHTMLAttributes<HTMLImageElement>

/**
 * LucidImage is a flexible React component for images with:
 * - Base path resolution
 * - Fallback image on error
 * - Optional blur placeholder while loading
 * - All native <img> props supported
 *
 * @param {string} src - The main image source (required)
 * @param {string} [fallbackSrc] - Fallback image if the main one fails
 * @param {string} [blurSrc] - Blur placeholder while loading
 * @param {string} [basePath] - Prefix for image sources
 * @param {string} [alt] - Alt text for the image
 * @param {...any} rest - All other valid <img> attributes
 * @returns {JSX.Element} An <img> element with fallback and blur support
 *
 * All other props are passed to the <img> element as attributes.
 */
export function LucidImage({
	alt = "",
	basePath = "",
	blurSrc,
	className,
	fallbackSrc,
	loading = "lazy",
	onError,
	onLoad,
	src,
	style,
	...rest
}: LucidImageProps): JSX.Element {
	const [loaded, setLoaded] = useState(false)
	const hasSwapped = useRef(false)

	const mainSrc = resolveImage(src, basePath)
	const fallback = fallbackSrc ? resolveImage(fallbackSrc, basePath) : undefined

	const blurClass = blurSrc ? "lucid-blur" : ""
	const blurStyle =
		blurSrc && !loaded
			? { filter: "blur(10px)", transition: "filter 0.3s" }
			: undefined

	function handleError(e: React.SyntheticEvent<HTMLImageElement>): void {
		if (fallback && !hasSwapped.current && e.currentTarget.src !== fallback) {
			hasSwapped.current = true
			e.currentTarget.src = fallback
		}
		onError?.(e)
	}

	function handleLoad(e: React.SyntheticEvent<HTMLImageElement>): void {
		setLoaded(true)
		onLoad?.(e)
	}

	return (
		<img
			src={mainSrc}
			alt={alt}
			loading={loading}
			onError={handleError}
			onLoad={handleLoad}
			className={[blurClass, className].filter(Boolean).join(" ")}
			style={{ ...blurStyle, ...style }}
			data-blur={!!blurSrc}
			data-loaded={loaded}
			{...rest}
		/>
	)
}
