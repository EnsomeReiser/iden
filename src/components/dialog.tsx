import { Slot } from "@/components/slot";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

export const Dialog = ({ children, isOpen, onOpenChange }) => {
	if (!isOpen) return null;

	return createPortal(
		<div
			className="fixed top-0 left-0 z-100 flex h-screen w-screen items-center justify-center bg-black/60"
			onClick={() => onOpenChange(false)}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					onOpenChange(false);
				}
			}}
		>
			<div
				className="flex max-h-4/5 min-w-96 flex-col rounded-lg bg-white px-8 py-4"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.stopPropagation();
					}
				}}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
};

Dialog.Title = ({
	asChild,
	className,
	...props
}: React.HTMLAttributes<HTMLElement> & { asChild?: boolean }) => {
	const Comp = asChild ? Slot : "h1";
	return (
		<Comp className={cn("cursor-default text-center", className)} {...props} />
	);
};

Dialog.Body = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return <div className={cn("overflow-auto", className)} {...props} />;
};

Dialog.Field = ({ label, children }) => {
	return (
		<div className="flex flex-col capitalize">
			{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
			<label>{label}</label>
			{children}
		</div>
	);
};

Dialog.Footer = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn("flex items-center justify-end gap-2", className)}
			{...props}
		/>
	);
};
