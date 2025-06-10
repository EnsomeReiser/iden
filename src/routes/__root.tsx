import { Sidebar } from "@/components/sidebar";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => <App />,
});

export function App() {
	return (
		<div className="relative flex h-svh w-full">
			<Sidebar />

			<main className="flex-1 bg-gray-50 dark:bg-gray-800">
				<div className="@container mx-auto flex h-full w-full flex-col lg:max-w-[100ch] 2xl:max-w-[120ch]">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
