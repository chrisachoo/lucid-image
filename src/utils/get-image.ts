import path from 'node:path'
import imageSize from 'image-size'

interface GetImageOptions {
    src: string
    fallbackSrc?: string
    basePath?: string
    cdn?: 'vercel' | 'cloudflare' | 'none' | 'auto'
    publicDir?: string // for resolving absolute file path
}

export function getImage({
    src,
    fallbackSrc,
    basePath = '',
    cdn = 'none',
    publicDir = 'public'
}: GetImageOptions) {
    const isRemote = /^https?:\/\//.test(src)
    const normalize = (s: string) => s.startsWith('/') ? s : '/' + s
    const fullSrc = isRemote ? src : basePath + normalize(src)
    const fallback = fallbackSrc ? basePath + normalize(fallbackSrc) : undefined

    let cdnSrc = fullSrc
    if (cdn === 'vercel') {
        cdnSrc = `/_next/image?url=${encodeURIComponent(fullSrc)}&w=1080&q=75`
    } else if (cdn === 'cloudflare') {
        cdnSrc = `https://imagedelivery.net/YOUR_ACCOUNT_HASH/${fullSrc}/public`
    }

    // Local image dimension (only if src is local)
    let width: number | undefined
    let height: number | undefined

    if (!isRemote) {
        try {
            const imagePath = path.resolve(process.cwd(), publicDir, normalize(src))
            const buffer = require('fs').readFileSync(imagePath)
            const dimensions = imageSize(buffer)
            if (dimensions.width && dimensions.height) {
                width = dimensions.width
                height = dimensions.height
            }
        } catch (err) {
            console.warn(`[lucid-image] Unable to resolve image size: ${err}`)
        }
    }

    return {
        src: cdnSrc,
        fallbackSrc: fallback,
        width,
        height,
    }
}