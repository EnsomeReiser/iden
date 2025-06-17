import type { RegisterOptions } from "react-hook-form";

export type BaseField<T, K extends keyof T = keyof T> = {
	label: string;
	field: K;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	rules?: RegisterOptions;
	defaultValue?: T[K];
};

export type TextField<T, K extends keyof T = keyof T> = BaseField<T, K> & {
	type: "text" | "textarea" | "email" | "number" | "password";
};

export type SelectField<T, K extends keyof T = keyof T> = BaseField<T, K> & {
	type: "select";
	options: string[];
};
export type CheckboxField<T, K extends keyof T = keyof T> = BaseField<T, K> & {
	type: "checkbox";
	defaultChecked?: boolean;
};

export type RadioField<T, K extends keyof T = keyof T> = BaseField<T, K> & {
	type: "radio";
	options: string[] | { label: string; value: string }[];
};

export type FormField<T> =
	| TextField<T>
	| SelectField<T>
	| CheckboxField<T>
	| RadioField<T>;
