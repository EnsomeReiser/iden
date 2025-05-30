import { createRootRoute, Outlet } from "@tanstack/react-router";

import "../index.css";
import logo from "../logo.svg";
import reactLogo from "../react.svg";

export const Route = createRootRoute({
	component: () => <App />,
});

export function App() {
	return (
		<div className="container relative z-10 mx-auto p-8 text-center">
			<div className="mb-8 flex items-center justify-center gap-8">
				<img
					src={logo}
					alt="Bun Logo"
					className="h-36 scale-120 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
				/>
				<img
					src={reactLogo}
					alt="React Logo"
					className="h-36 p-6 transition-all duration-300 [animation:spin_20s_linear_infinite] hover:drop-shadow-[0_0_2em_#61dafbaa]"
				/>
			</div>

			<Outlet />
		</div>
	);
}
