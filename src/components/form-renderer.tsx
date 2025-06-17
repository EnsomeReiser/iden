import { Dialog } from "@/components/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { AnyType } from "@/types";
import type { FormField, SelectField, TextField } from "@/types/form";
import type {
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister,
} from "react-hook-form";

type FormRendererProps<T extends FieldValues> = {
	fields: FormField<T>[];
	register: UseFormRegister<T>;
	errors: AnyType;
};

export const FormRenderer = <T extends FieldValues>({
	fields,
	register,
	errors,
}: FormRendererProps<T>) => {
	const renderTextField = (field: TextField<T>) => {
		const InputComponent = field.type === "textarea" ? Textarea : Input;
		const inputProps = {
			className: cn("border border-gray-500"),
			placeholder: field.placeholder,
			disabled: field.disabled,
			...(field.type !== "textarea" && { type: field.type }),
			...register(field.field as Path<T>, field.rules as RegisterOptions<T>),
		};

		return <InputComponent {...inputProps} />;
	};

	const renderSelectField = (field: SelectField<T>) => (
		<select
			className="rounded-sm border border-gray-500 ring-ring/10 focus-visible:outline-1 focus-visible:ring-4"
			{...register(field.field as Path<T>)}
		>
			{field.options.map((option) => (
				<option className="cursor-default text-sm" key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);

	const renderField = (field: FormField<T>) => {
		let fieldElement: React.ReactNode;

		switch (field.type) {
			case "text":
			case "textarea":
			case "email":
			case "password":
			case "number":
				fieldElement = renderTextField(field as TextField<T>);
				break;
			case "select":
				fieldElement = renderSelectField(field as SelectField<T>);
				break;
			default:
				fieldElement = <div>Unsupported field type</div>;
		}

		return (
			<Dialog.Field
				key={String(field.field)}
				{...field}
				required={field.rules?.required}
				error={errors[field.field]}
			>
				{fieldElement}
			</Dialog.Field>
		);
	};

	return <>{fields.map(renderField)}</>;
};
