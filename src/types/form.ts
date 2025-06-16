import type { AnyType } from "@/types";
import type { RegisterOptions } from "react-hook-form";

export type BaseField<T = AnyType> = {
	label: string;
	field: keyof T;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	rules?: RegisterOptions;
};
export type TextField<T = AnyType> = BaseField<T> & {
	type: "text" | "textarea" | "email" | "number" | "password";
};

export type SelectField<T = AnyType> = BaseField<T> & {
	type: "select";
	options: string[];
};

export type CheckboxField<T = AnyType> = BaseField<T> & {
	type: "checkbox";
	defaultChecked?: boolean;
};

export type RadioField<T = AnyType> = BaseField<T> & {
	type: "radio";
	options: string[] | { label: string; value: string }[];
};

export type FormField<T = AnyType> =
	| TextField<T>
	| SelectField<T>
	| CheckboxField<T>
	| RadioField<T>;
