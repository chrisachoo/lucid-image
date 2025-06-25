import type { ImgHTMLAttributes, JSX } from 'react'
import { resolveImage } from './utils/resolve-image'

export interface LucidImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  fallbackSrc?: string
  blurSrc?: string
  basePath?: string
}

export function LucidImage({
	src,
	fallbackSrc,
	blurSrc,
	basePath = '',
	alt = '',
	loading = 'lazy',
	style,
	onError,
	onLoad,
	...rest
  }: LucidImageProps): JSX.Element {
	const resolvedSrc = resolveImage(src, basePath)
	const resolvedFallback = fallbackSrc ? resolveImage(fallbackSrc, basePath) : undefined
  
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
		  filter: blurSrc ? 'blur(10px)' : undefined,
		  transition: blurSrc ? 'filter 0.3s ease' : undefined,
		  ...style,
		}}
		{...rest}
	  />
	)
  }
  