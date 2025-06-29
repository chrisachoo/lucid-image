import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { LucidImageTabs } from "./components/lucid-image-tabs"
import "./index.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<LucidImageTabs />
	</StrictMode>
)
