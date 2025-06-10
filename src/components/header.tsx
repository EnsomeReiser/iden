import { SidebarToggle } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, type LucideProps } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
	title: string;
	children: ReactNode;
};

export const Header = ({ title, children }: Props) => {
	return (
		<div className="mx-auto flex h-12 w-full items-center gap-2 px-8 py-2">
			<SidebarToggle className="size-6" />
			<h1 className="mr-auto font-medium text-lg">{title}</h1>
			{children}
		</div>
	);
};

interface ActionProps {
	text: string;
	icon?: React.FC<LucideProps>;
	onClick: () => void;
}

Header.Action = ({ icon: Icon, text, onClick }: ActionProps) => {
	return (
		<Button
			className="bg-emerald-500 hover:bg-emerald-500/80 dark:bg-emerald-600 dark:text-emerald-50 dark:hover:bg-emerald-500/90"
			onClick={onClick}
		>
			{Icon && <Icon className="text-inherit" />}
			{text}
		</Button>
	);
};
