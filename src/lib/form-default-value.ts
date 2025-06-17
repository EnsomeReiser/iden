import type { FormField } from "@/types/form";

export const formDefaultValues = <T>(fields: FormField<T>[]) => {
	return fields.reduce(
		(acc, field) => {
			if (field.defaultValue !== undefined) {
				acc[field.field] = field.defaultValue;
			}
			return acc;
		},
		{} as Partial<T>,
	);
};
