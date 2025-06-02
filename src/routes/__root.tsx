import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Sidebar, SidebarToggle } from "@/components/sidebar";
import { ThemeToggle } from "@/components/toggleTheme";

export const Route = createRootRoute({
	component: () => <App />,
});

export function App() {
	return (
		<div className="relative flex h-svh w-full bg-red-50 dark:bg-green-500">
			<Sidebar />

			<main className="flex flex-1">
				<SidebarToggle />
				<Outlet />
			</main>
		</div>
	);
}
