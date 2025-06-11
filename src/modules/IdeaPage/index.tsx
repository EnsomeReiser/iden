import { Dialog } from "@/components/dialog";
import { Header } from "@/components/header";
import { db } from "@/database/db";
import { IdeaPotential, IdeaStatus } from "@/database/entities/ideas.entity";
import { IdeaContent } from "@/modules/IdeaPage/components/idea-content";
import { IdeaFilter } from "@/modules/IdeaPage/components/idea-filter";
import { useLiveQuery } from "dexie-react-hooks";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
	title: string;
	description: string;
	status: IdeaStatus;
	potential: IdeaPotential;
};

type BaseField<T> = {
	label: string;
	field: keyof T;
	placeholder?: string;
};

type TextField<T> = BaseField<T> & {
	type: "text" | "textarea";
};

type SelectField<T> = BaseField<T> & {
	type: "select";
	options: string[];
};

type Field<T> = TextField<T> | SelectField<T>;

function createFormFields<T>() {
	return <F extends Field<T>[]>(fields: F) => fields;
}

const formData: Field<Inputs>[] = [
	{
		label: "title",
		field: "title",
		type: "text",
		placeholder: "Title of your ideas",
	},
	{
		label: "description",
		field: "description",
		type: "textarea",
	},
	{
		label: "status",
		field: "status",
		type: "select",
		options: Object.values(IdeaStatus),
	},
	{
		label: "potential",
		field: "potential",
		type: "select",
		options: Object.values(IdeaPotential),
	},
];

export const IdeaPage = () => {
	const [showOverlay, setShowOverlay] = useState(false);
	const { register, getValues } = useForm<Inputs>();

	const ideas = useLiveQuery(() => db.ideas.toArray());

	const handleHeaderAction = () => {
		setShowOverlay(true);
	};

	const fieldRenderers: Record<
		string,
		(field: Field<Inputs>) => React.ReactNode
	> = {
		text: (field) => (
			<input
				className="border border-gray-500"
				{...field}
				{...register(field.field)}
			/>
		),
		textarea: (field) => (
			<textarea
				className="border border-gray-500"
				{...field}
				{...register(field.field)}
			/>
		),
		select: (field: SelectField<Inputs>) => (
			<select
				className="border border-gray-500 text-black"
				{...register("status")}
			>
				{field.options.map((option) => (
					<option className="text-black" key={option} value={option}>
						{option}{" "}
					</option>
				))}
			</select>
		),
	};

	const renderField = (field: Field) => {
		const render =
			fieldRenderers[field.type] ?? (() => <div>Unsupported field</div>);
		return <Dialog.Field label={field.label}>{render(field)}</Dialog.Field>;
	};

	const addIdea = async () => {
		const { title, ...value } = getValues();
		const id = await db.ideas.add({
			...value,
			title: getValues().title || "Untitled",
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	};

	return (
		<>
			<Header title="Ideas Management">
				<Header.Action
					onClick={handleHeaderAction}
					text="New Idea"
					icon={Plus}
				/>
			</Header>
			<IdeaFilter />
			<IdeaContent data={ideas} />

			<Dialog isOpen={showOverlay} onOpenChange={setShowOverlay}>
				<Dialog.Title>Hello</Dialog.Title>
				<Dialog.Body>{formData.map((field) => renderField(field))}</Dialog.Body>
				<Dialog.Footer>
					<button type="button" onClick={() => setShowOverlay(false)}>
						Close
					</button>
					<button type="button" onClick={addIdea}>
						Add
					</button>
				</Dialog.Footer>
			</Dialog>
		</>
	);
};
