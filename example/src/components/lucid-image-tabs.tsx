import type { JSX } from "react"
import { useState } from "react"
import { AdvancedImageDemo } from "./advanced-demo-image"
import { App } from "./app"

export function LucidImageTabs(): JSX.Element {
	const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic")

	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900  text-white flex flex-col items-center justify-start pt-10 px-4">
			<nav className="flex space-x-4 mb-8">
				<button
					type="button"
					className={`px-4 py-2 rounded-lg font-medium transition border ${
						activeTab === "basic"
							? "bg-indigo-600 border-indigo-500"
							: "bg-slate-800 border-slate-700 hover:bg-slate-700"
					}`}
					onClick={() => setActiveTab("basic")}
				>
					🧊 Basic Demo
				</button>
				<button
					type="button"
					className={`px-4 py-2 rounded-lg font-medium transition border ${
						activeTab === "advanced"
							? "bg-indigo-600 border-indigo-500"
							: "bg-slate-800 border-slate-700 hover:bg-slate-700"
					}`}
					onClick={() => setActiveTab("advanced")}
				>
					🌟 Advanced Demo
				</button>
			</nav>

			<section className="w-full max-w-2xl">
				{activeTab === "basic" && <App />}
				{activeTab === "advanced" && <AdvancedImageDemo />}
			</section>
		</main>
	)
}
