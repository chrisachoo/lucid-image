import type { JSX } from "react"
import { getImage, LucidImage } from "lucid-image"

export function App(): JSX.Element {
	// Build-time helper to normalize paths and apply fallback
	const img = getImage({
		basePath: "/images",
		cdn: "none",
		fallbackSrc: "fallback.jpg",
		publicDir: "../public",
		src: "cat-2.jpg"
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
				This image is powered by{" "}
				<code className="text-indigo-400">getImage()</code> and{" "}
				<code className="text-indigo-400">LucidImage</code> — including optional
				fallback and local resolution.
			</p>
		</section>
	)
}
