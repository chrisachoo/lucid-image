import type { JSX } from "react"
import { getImage, LucidImage } from "lucid-image"
import { useState } from "react"

export function AdvancedImageDemo(): JSX.Element {
	const [broken, setBroken] = useState(false)

	const img = getImage({
		basePath: "/images",
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
