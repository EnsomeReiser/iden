import { Slot } from "@/components/slot";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import type { FieldError, ValidationRule } from "react-hook-form";

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
				className="flex max-h-4/5 min-w-96 flex-col gap-y-4 rounded-lg bg-white px-8 py-4"
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

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
	label: string;
	required?: ValidationRule;
	error: FieldError;
}

Dialog.Field = ({
	label,
	children,
	required,
	error,
	className,
	...props
}: FieldProps) => {
	return (
		<div className={cn("flex flex-col capitalize", className)} {...props}>
			{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
			<label>
				{label}
				{required && "(*)"}:
			</label>
			{children}
			{error && (error?.message ? error.message : "Error")}
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
