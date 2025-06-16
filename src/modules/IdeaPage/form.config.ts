import { IdeaPotential, IdeaStatus } from "@/database/entities/ideas.entity";
import type { FormField } from "@/types/form";

export type IdeaInputs = {
	title: string;
	description: string;
	status: IdeaStatus;
	potential: IdeaPotential;
};

export const ideaFormFields: FormField<IdeaInputs>[] = [
	{
		label: "Title",
		field: "title",
		type: "text",
		placeholder: "Title of your ideas",
	},
	{
		label: "Description",
		field: "description",
		type: "textarea",
		placeholder: "Describe your idea",
		rules: {
			required: true,
		},
	},
	{
		label: "Status",
		field: "status",
		type: "select",
		options: Object.values(IdeaStatus),
	},
	{
		label: "Potential",
		field: "potential",
		type: "select",
		options: Object.values(IdeaPotential),
	},
];
