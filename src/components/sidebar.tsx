import { cn } from "@/lib/utils";
import { SidebarIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface SidebarContextProps {
	isOpen: boolean;
	width: number;
	setWidth: Dispatch<SetStateAction<number>>;
	toggleSidebar?: () => void;
}

export const SidebarContext = createContext<SidebarContextProps | null>(null);

interface SidebarProps {
	// children: ReactNode;
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
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isMouseDown, setWidth]);

	return (
		<div
			className={cn(
				"group relative h-full bg-green-200 transition-all",
				isMouseDown ? "duration-0" : "duration-200",
			)}
			style={{
				width: `${width}px`,
			}}
		>
			{/* {children} */}
			{resizeHandle && (
				<div
					ref={resizeRef}
					onMouseDown={() => setIsMouseDown(true)}
					onTouchStart={() => setIsMouseDown(true)}
					className={
						"absolute top-0 right-0 h-full w-1 cursor-ew-resize bg-red-500 opacity-0 hover:opacity-85 group-hover:opacity-25"
					}
				/>
			)}
		</div>
	);
};

export const SidebarToggle = () => {
	const context = useContext(SidebarContext);

	if (!context) {
		throw new Error("SidebarToggle has to be used within <SidebarProvider>");
	}

	const { toggleSidebar } = context;

	return <SidebarIcon onClick={toggleSidebar} />;
};

export const SidebarProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(true);
	const [width, setWidth] = useState(384);
	const [lastWidth, setLastWidth] = useState(width);

	const toggleSidebar = () => {
		if (isOpen) {
			setLastWidth(width);
			setWidth(0);
		} else {
			setWidth(lastWidth);
		}
		setIsOpen(!isOpen);
	};

	return (
		<SidebarContext.Provider value={{ isOpen, width, toggleSidebar, setWidth }}>
			{children}
		</SidebarContext.Provider>
	);
};
