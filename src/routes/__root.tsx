import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Sidebar, SidebarToggle } from "@/components/sidebar";

export const Route = createRootRoute({
	component: () => <App />,
});

export function App() {
	return (
		<div className="relative flex h-svh w-full bg-red-50">
			<Sidebar />

			<main className="flex flex-1">
				<SidebarToggle />
				<Outlet />
			</main>
		</div>
	);
}
