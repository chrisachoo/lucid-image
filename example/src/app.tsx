import type { JSX } from "react"
import { getImage, LucidImage } from "lucid-image"

export function App(): JSX.Element {
	const img = getImage({
		cdn: "none",
		publicDir: "../example/public",
		src: "/cat-1.jpg"
	})

	return (
		<div>
			<h1>Example App</h1>
			<LucidImage
				{...img}
				alt="Example"
			/>
		</div>
	)
}
