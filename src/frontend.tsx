import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { SidebarProvider } from "@/components/sidebar";
import { ThemeProvider } from "@/provider/theme-provider";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const elem = document.getElementById("root")!;
const app = (
	<StrictMode>
		<ThemeProvider>
			<SidebarProvider>
				<RouterProvider router={router} />
			</SidebarProvider>
		</ThemeProvider>
	</StrictMode>
);

if (import.meta.hot) {
	// With hot module reloading, `import.meta.hot.data` is persisted.
	if (!import.meta.hot.data.root) {
		import.meta.hot.data.root = createRoot(elem);
	}
	const root = import.meta.hot.data.root;
	root.render(app);
} else {
	// The hot module reloading API is not available in production.
	createRoot(elem).render(app);
}
