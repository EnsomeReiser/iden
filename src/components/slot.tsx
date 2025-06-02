import { cn } from "@/lib/utils";
import React from "react";

interface ChildrenProps {
	className: string;
	[key: string]: string;
}

export const Slot = ({ ...props }: React.HTMLAttributes<HTMLElement>) => {
	const { children, ...slotProps } = props;

	if (!children) return null;
	if (React.Children.count(children) > 1) {
		throw new Error("Only one child allowed");
	}
	if (!React.isValidElement(children)) return null;

	const chilrenProps = children.props as ChildrenProps;

	return React.cloneElement(children, {
		...props,
		...chilrenProps,
		className: cn(slotProps.className, chilrenProps.className),
	} as ChildrenProps);
};
