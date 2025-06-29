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
 * `LucidImage` is a robust and flexible React image component that supports:
 * - Base path resolution for static or dynamic image roots.
 * - Optional fallback image source on error.
 * - Optional blur placeholder for progressive loading UX.
 * - Native `<img>` props (e.g. alt, className, style).
 *
 * @param {LucidImageProps} props - Image properties and extended HTML attributes.
 * @param {string} props.src - The main image source (required).
 * @param {string} [props.fallbackSrc] - A fallback image to be used if loading the primary one fails.
 * @param {string} [props.blurSrc] - If present, applies a blur effect while the image loads.
 * @param {string} [props.basePath=""] - Optional prefix added to image sources for resolution.
 * @param {string} [props.alt=""] - Accessible alt text for the image.
 * @param {string} [props.className] - Custom class name(s) passed to the `<img>` element.
 * @param {string} [props.loading="lazy"] - Native loading attribute (e.g. "lazy", "eager").
 * @param {React.CSSProperties} [props.style] - Inline styles for the image.
 * @param {Function} [props.onError] - Event fired if image fails to load.
 * @param {Function} [props.onLoad] - Event fired once image has successfully loaded.
 * @param {...any} rest - Any additional valid `<img>` attributes.
 *
 * @returns {JSX.Element} A styled `<img>` element with smart fallback and blur handling.
 *
 * Notes:
 * - The image source(s) are resolved using `resolveImage`, which prepends the basePath.
 * - The fallback image is only used once to prevent infinite load-error loops.
 * - When `blurSrc` is provided, a blur filter is applied via style until the image is loaded.
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
	const resolvedSrc = resolveImage(src, basePath)
	const resolvedFallback = fallbackSrc ? resolveImage(fallbackSrc, basePath) : undefined
	const [loaded, setLoaded] = useState(false)
	const hasSwapped = useRef(false)

	// Compute default blur class and style if blurSrc is present
	const defaultBlurClass = blurSrc ? "lucid-blur" : ""
	const defaultBlurStyle = blurSrc
		? { filter: "blur(10px)", transition: "filter 0.3s ease" }
		: undefined

	const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
		if (resolvedFallback && !hasSwapped.current && e.currentTarget.src !== resolvedFallback) {
			hasSwapped.current = true
			e.currentTarget.src = resolvedFallback
		}
		onError?.(e)
	}

	const handleLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
		setLoaded(true)
		onLoad?.(e)
	}

	return (
		<img
			src={resolvedSrc}
			alt={alt}
			loading={loading}
			onError={handleError}
			onLoad={handleLoad}
			className={[defaultBlurClass, className].filter(Boolean).join(" ")}
			style={{ ...defaultBlurStyle, ...style }}
			data-blur={!!blurSrc}
			data-loaded={loaded}
			{...rest}
		/>
	)
}
