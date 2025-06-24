import type { ImgHTMLAttributes } from "react"
import React, { useState } from "react"

export type LucideImageProps = {
	src: string
	fallbackSrc?: string
	blurSrc?: string
	basePath?: string
} & ImgHTMLAttributes<HTMLImageElement>

export function LucideImage({
	alt = "",
	basePath = "",
	blurSrc,
	fallbackSrc,
	loading = "lazy",
	src,
	style,
	...rest
}: LucideImageProps): React.ReactElement {
	const [hasError, setHasError] = useState(false)
	const [loaded, setLoaded] = useState(false)

	const isExternal = /^https?:\/\//i.test(src)

	let resolvedSrc = src

	if (!isExternal) {
		const normalizedSrc = src.startsWith("/") ? src : `/${src}`
		resolvedSrc = `${basePath}${normalizedSrc}`
	}

	const imageSrc = hasError ? fallbackSrc : resolvedSrc

	return (
		<img
			src={imageSrc}
			alt={alt}
			loading={loading}
			onError={() => setHasError(true)}
			onLoad={() => setLoaded(true)}
			style={{
				filter: !loaded && blurSrc ? "blur(10px)" : "none",
				transition: "filter 0.3s ease",
				...style
			}}
			{...rest}
		/>
	)
}
