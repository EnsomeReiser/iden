import { Slot } from "@/components/slot";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { FieldError, ValidationRule } from "react-hook-form";

export const Dialog = ({ children, isOpen, onOpenChange }) => {
	const dialogRef = useRef<HTMLDivElement>(null);
	const backdropRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (isOpen) {
			gsap.fromTo(
				dialogRef.current,
				{ opacity: 0, scale: 0.5 },
				{ opacity: 1, scale: 1, duration: 0.15 },
			);
			gsap.fromTo(
				backdropRef.current,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.3 },
			);
		}
	}, [isOpen]);

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
			ref={backdropRef}
		>
			<div
				className="flex max-h-4/5 min-w-96 flex-col gap-y-4 rounded-lg bg-white px-7 py-4"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.stopPropagation();
					}
				}}
				ref={dialogRef}
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
		<Comp
			className={cn(
				"cursor-default text-center font-semibold text-xl",
				className,
			)}
			{...props}
		/>
	);
};

Dialog.Body = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return <div className={cn("overflow-y-auto px-1", className)} {...props} />;
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
		<div
			className={cn("mt-2 flex flex-col gap-1.5 capitalize", className)}
			{...props}
		>
			<Label className={error && "text-red-500"}>
				{label}
				{required && "(*)"}:
			</Label>
			{children}
			<span className="font-medium text-red-500 text-sm">
				{error && (error?.message ? error.message : "Error")}
			</span>
		</div>
	);
};

Dialog.Footer = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn("flex items-center justify-end gap-2 px-1", className)}
			{...props}
		/>
	);
};
