import { SidebarContext } from "@/components/sidebar/sidebar-provider";
import { Slot } from "@/components/slot";
import { ThemeToggle } from "@/components/toggleTheme";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { type VariantProps, cva } from "class-variance-authority";
import { Lightbulb, Search, Settings, Zap } from "lucide-react";
import type React from "react";
import { useContext, useEffect, useRef, useState } from "react";

interface SidebarProps {
	resizeHandle?: boolean;
}

export const Sidebar = ({ resizeHandle = true }: SidebarProps) => {
	const context = useContext(SidebarContext);
	const resizeRef = useRef<HTMLDivElement>(null);
	const [isMouseDown, setIsMouseDown] = useState(false);

	if (!context) {
		throw new Error("SidebarToggle has to be used within <SidebarProvider>");
	}

	const { width, setWidth } = context;

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent | TouchEvent) => {
			const clientX =
				"touches" in event ? event.touches[0].clientX : event.clientX;

			if (clientX >= 720) {
				setWidth(720);
			} else if (clientX <= 224) {
				setWidth(224);
			} else {
				setWidth(clientX);
			}
		};

		const handleMouseUp = () => {
			setIsMouseDown(false);
		};

		if (isMouseDown) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("touchmove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
			window.addEventListener("touchend", handleMouseUp);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("touchend", handleMouseUp);
		};
	}, [isMouseDown, setWidth]);

	return (
		<div
			className={cn(
				"group relative flex h-full flex-col overflow-hidden shadow-lg transition-all",
				"bg-gray-100 dark:bg-gray-900",
				isMouseDown ? "duration-0" : "duration-200",
			)}
			style={{
				width: `${width}px`,
			}}
		>
			<Sidebar.Header>
				<Sidebar.HeaderContent />
			</Sidebar.Header>
			<Sidebar.Separator />
			<Sidebar.Group label="Hello">
				<Sidebar.GroupItem asChild>
					<Link to="/ideas" className="Hello">
						<Lightbulb />
						Your Ideas
						{/* <span className="ml-auto rounded-sm border border-gray-300 px-1.5 py-[1px] text-gray-500 text-xs">
							3
						</span> */}
					</Link>
				</Sidebar.GroupItem>
				{/* <Sidebar.GroupItem variant={"small"} icon={Home}>
					Menu item
				</Sidebar.GroupItem>
				<Sidebar.GroupItem tag="5" variant={"small"} icon={Home}>
					Menu item
				</Sidebar.GroupItem> */}
			</Sidebar.Group>
			<Sidebar.Footer>
				<Settings className="size-6" />
				Settings
				<ThemeToggle className="mr-3 ml-auto h-8 w-8" />
			</Sidebar.Footer>
			{resizeHandle && (
				<div
					ref={resizeRef}
					onMouseDown={() => setIsMouseDown(true)}
					onTouchStart={() => setIsMouseDown(true)}
					className={
						"absolute top-0 right-0 h-full w-1 cursor-ew-resize bg-gray-500 opacity-0 hover:opacity-60 group-hover:opacity-25 dark:bg-gray-200/60"
					}
				/>
			)}
		</div>
	);
};

Sidebar.HeaderContent = () => {
	return (
		<>
			<div
				className={cn(
					"flex shrink-0 items-center gap-1 rounded-sm px-2 py-1 hover:bg-gray-200",
					"dark:bg-gray-800 dark:hover:bg-gray-700",
				)}
			>
				<div className="flex size-10 flex-row items-center justify-center rounded-md bg-green-700 dark:bg-green-800">
					<Zap className="size-6 text-white" />
				</div>
				<div className="-gap-0.5 flex select-none flex-col justify-center">
					<h1 className="font-bold text-green-800 text-md tracking-wide dark:text-green-50">
						Iden
					</h1>
					<span className="font-light text-gray-500 text-sm dark:text-gray-300">
						Your ideas vault
					</span>
				</div>
			</div>
			<div className="mt-2 px-2">
				<div className="relative">
					<Input className="pl-8 dark:border-gray-700" placeholder="Search" />
					<Search className="-translate-y-1/2 absolute top-1/2 left-2 size-4 text-muted-foreground" />
				</div>
			</div>
		</>
	);
};

Sidebar.Header = ({ className, ...props }: React.ComponentProps<"div">) => {
	return (
		<div className="w-full min-w-[224px] overflow-hidden p-1 pr-2" {...props} />
	);
};

Sidebar.Footer = ({ className, ...props }: React.ComponentProps<"div">) => {
	return (
		<div
			className={cn(
				"mt-auto flex w-full min-w-[224px] select-none items-center gap-2 overflow-hidden p-1 px-4 py-2 pr-2 font-medium hover:bg-gray-200",
				"dark:bg-gray-800 dark:hover:bg-gray-700",
				className,
			)}
			{...props}
		/>
	);
};

Sidebar.Group = ({
	className,
	children,
	label,
	...props
}: React.ComponentProps<"div"> & { label?: string }) => {
	return (
		<div className={cn("min-w-[224px] px-2", className)} {...props}>
			{label && (
				<span className="px-2 pl-4 font-medium text-muted-foreground text-xs capitalize">
					{label}
				</span>
			)}
			{children}
		</div>
	);
};

// =======================
// ITEM
// =======================
const sidebarItemVariants = cva(
	"flex select-none items-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-700",
	{
		variants: {
			variant: {
				default: "gap-2 [&_svg]:size-6 px-2 py-2",
				small: "[&_svg]:size-4 px-2 py-1 gap-1 text-sm",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

Sidebar.GroupItem = ({
	className,
	variant,
	children,
	asChild,
	...props
}: React.ComponentProps<"div"> &
	VariantProps<typeof sidebarItemVariants> & {
		asChild?: boolean;
	}) => {
	const Comp = asChild ? Slot : "div";
	return (
		<Comp
			className={cn(sidebarItemVariants({ variant, className }))}
			{...props}
		>
			{children}
		</Comp>
	);
};
// =======================
// END OF ITEM
// =======================

Sidebar.Separator = ({ className }: React.ComponentProps<"div">) => {
	return (
		<div
			className={cn(
				"mx-auto my-1 h-[1px] w-4/5 rounded-md bg-gray-200/80 dark:bg-gray-700/80",
				className,
			)}
		/>
	);
};
