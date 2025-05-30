import { APITester } from "@/APITester";
import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Card className="border-muted bg-card/50 backdrop-blur-sm">
			<CardContent className="pt-6">
				<h1 className="my-4 font-bold text-5xl text-red-400 leading-tight">
					Bun + React
				</h1>
				<p>
					Edit{" "}
					<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
						src/App.tsx
					</code>{" "}
					and save to test HMR
				</p>
				<APITester />
			</CardContent>
		</Card>
	);
}
