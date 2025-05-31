import {
	createContext,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react";

interface SidebarContextProps {
	isOpen: boolean;
	width: number;
	setWidth: Dispatch<SetStateAction<number>>;
	toggleSidebar?: () => void;
}

export const SidebarContext = createContext<SidebarContextProps | null>(null);

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
