import { SidebarContext } from "@/components/sidebar/sidebar-provider";
import { SidebarCloseIcon, SidebarOpen } from "lucide-react";
import { useContext } from "react";

export const SidebarToggle = () => {
	const context = useContext(SidebarContext);

	if (!context) {
		throw new Error("SidebarToggle has to be used within <SidebarProvider>");
	}

	const { toggleSidebar, isOpen } = context;

	return isOpen ? (
		<SidebarCloseIcon onClick={toggleSidebar} />
	) : (
		<SidebarOpen onClick={toggleSidebar} />
	);
};
