/**
 * App component for Lucid Image demo.
 *
 * Demonstrates usage of getImage and LucidImage components.
 *
 * Note: Uses import.meta.env.BASE_URL to dynamically resolve the correct base path for images,
 * ensuring compatibility with Vite's base config (e.g., when base: "/lucid-image/" is set).
 */
import type { JSX } from "react"
import { getImage, LucidImage } from "lucid-image"

/**
 * Main application component.
 *
 * - Uses getImage to build the image object with a dynamic base path.
 * - Renders a LucidImage with fallback and local resolution support.
 * - The image path is constructed using import.meta.env.BASE_URL to respect Vite's base config.
 */
export function App(): JSX.Element {
	// Build-time helper to normalize paths and apply fallback
	//
	// import.meta.env.BASE_URL ensures the image path works with any Vite base config.
	const img = getImage({
		basePath: `${import.meta.env.BASE_URL}images`, // Dynamic base path for images
		cdn: "none",
		fallbackSrc: "fallback.jpg",
		publicDir: "../public",
		src: "cat-1.jpg"
	})

	return (
		<section className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
			<h1 className="text-white text-3xl font-bold mb-6 text-center">
				🐱 Lucid Image Demo
			</h1>

			<div className="rounded-xl overflow-hidden shadow-lg border border-slate-700">
				<LucidImage
					{...img}
					alt="Cute cat"
					width={400}
					height={400}
					className="object-cover transition-all duration-500 hover:scale-110"
				/>
			</div>

			<p className="text-slate-400 text-sm mt-4 text-center max-w-sm">
				This image is powered by
				{" "}
				<code className="text-indigo-400">getImage()</code>
				{" "}
				and
				{" "}
				<code className="text-indigo-400">LucidImage</code>
				{" "}
				— including optional
				fallback and local resolution.
			</p>
		</section>
	)
}
