import { cn } from "@/lib/utils";
import { Layout } from "lucide-react";

export const IdeaFilter = () => {
	return (
		<div className="mt-4 flex gap-2 border-gray-300 border-b pb-2 dark:border-gray-400">
			<IdeaFilter.Item isActive>All</IdeaFilter.Item>
			<IdeaFilter.Item>Completed</IdeaFilter.Item>
			<IdeaFilter.Item className="ml-auto">
				<Layout />
			</IdeaFilter.Item>
			<IdeaFilter.Item isActive>
				<Layout />
			</IdeaFilter.Item>
		</div>
	);
};

IdeaFilter.Item = ({
	children,
	className,
	isActive = false,
	...props
}: React.ComponentProps<"div"> & { isActive?: boolean }) => {
	return (
		<div
			className={cn(
				"cursor-pointer",
				isActive ? "text-foreground" : "text-gray-400",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};
