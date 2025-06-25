export function resolveImage(src: string, basePath = ""): string {
	if (/^https?:\/\//i.test(src))
		return src
	const normalized = src.startsWith("/") ? src : `/${src}`
	return basePath + normalized
}
