import type { ImgHTMLAttributes, JSX } from "react"
import { resolveImage } from "./utils/resolve-image"

export type LucidImageProps = {
	src: string
	fallbackSrc?: string
	blurSrc?: string
	basePath?: string
} & ImgHTMLAttributes<HTMLImageElement>

export function LucidImage({
	alt = "",
	basePath = "",
	blurSrc,
	fallbackSrc,
	loading = "lazy",
	onError,
	onLoad,
	src,
	style,
	...rest
}: LucidImageProps): JSX.Element {
	const resolvedSrc = resolveImage(src, basePath)
	const resolvedFallback = fallbackSrc
		? resolveImage(fallbackSrc, basePath)
		: undefined

	const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
		if (resolvedFallback && e.currentTarget.src !== resolvedFallback) {
			e.currentTarget.src = resolvedFallback
		}
		onError?.(e)
	}

	const handleLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
		onLoad?.(e)
	}

	return (
		<img
			src={resolvedSrc}
			alt={alt}
			loading={loading}
			onError={handleError}
			onLoad={handleLoad}
			style={{
				filter: blurSrc ? "blur(10px)" : undefined,
				transition: blurSrc ? "filter 0.3s ease" : undefined,
				...style
			}}
			{...rest}
		/>
	)
}
