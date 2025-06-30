/**
 * AdvancedImageDemo component for Lucid Image advanced demo.
 *
 * Demonstrates advanced usage of getImage and LucidImage components, including:
 * - Dynamic image switching (simulate broken image)
 * - Blur-up preview and shimmer loading overlay
 * - Fallback image support
 *
 * Note: Uses import.meta.env.BASE_URL to dynamically resolve the correct base path for images,
 * ensuring compatibility with Vite's base config (e.g., when base: "/lucid-image/" is set).
 */
import type { JSX } from "react"
import { getImage, LucidImage } from "lucid-image"
import { useState } from "react"

/**
 * Advanced image demo component.
 *
 * - Uses getImage to build the image object with a dynamic base path.
 * - Allows toggling between a valid and broken image to demonstrate fallback.
 * - Renders a LucidImage with blur-up, shimmer, and fallback support.
 * - The image path is constructed using import.meta.env.BASE_URL to respect Vite's base config.
 */
export function AdvancedImageDemo(): JSX.Element {
	const [broken, setBroken] = useState(false)

	// Build-time helper to normalize paths and apply fallback
	//
	// import.meta.env.BASE_URL ensures the image path works with any Vite base config.
	const img = getImage({
		basePath: `${import.meta.env.BASE_URL}images`, // Dynamic base path for images
		cdn: "none",
		fallbackSrc: "fallback.jpg",
		publicDir: "../public",
		src: broken ? "not-found.png" : "cat-2.jpg"
	})

	return (
		<section className="min-h-screen text-white flex flex-col items-center justify-center gap-6 px-4 py-10">
			<h2 className="text-3xl font-semibold">🎭 Lucid Image Advanced Demo</h2>

			<div className="relative w-[400px] h-[400px] rounded-xl overflow-hidden shadow-md border border-zinc-700">
				<div className="absolute inset-0 bg-zinc-800 animate-pulse z-0" />

				<LucidImage
					{...img}
					alt="Dynamic cat"
					width={400}
					height={400}
					blurSrc="/images/cat-2.jpg"
					className="object-cover w-full h-full z-10 relative transition-opacity duration-500"
					style={{
						borderRadius: "0.75rem"
					}}
				/>
			</div>

			<button
				onClick={() => setBroken(prev => !prev)}
				type="button"
				className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2 rounded-lg transition"
			>
				{broken ? "🔄 Reset Image" : "💥 Simulate Broken Image"}
			</button>

			<p className="text-sm text-zinc-400 text-center max-w-sm">
				This shows a blur-up preview, shimmer loading overlay, and fallback if
				the image fails to load.
			</p>
		</section>
	)
}
