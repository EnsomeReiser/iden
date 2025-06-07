import { SidebarContext } from "@/components/sidebar/sidebar-provider";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarCloseIcon, SidebarOpen } from "lucide-react";
import { useContext } from "react";

export const SidebarToggle = ({ className }: { className?: string }) => {
	const context = useContext(SidebarContext);

	if (!context) {
		throw new Error("SidebarToggle has to be used within <SidebarProvider>");
	}

	const { toggleSidebar, isOpen } = context;

	return isOpen ? (
		<Sidebar className={cn("size-6", className)} onClick={toggleSidebar} />
	) : (
		<SidebarOpen className={cn("size-6", className)} onClick={toggleSidebar} />
	);
};
