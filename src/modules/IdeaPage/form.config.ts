import { IdeaPotential, IdeaStatus } from "@/database/entities/ideas.entity";
import type { FormField } from "@/types/form";

export type IdeaInputs = {
	title: string;
	description: string;
	status: IdeaStatus;
	potential: IdeaPotential;
	duration: number;
};

export const ideaFormFields: FormField<IdeaInputs>[] = [
	{
		label: "Title",
		field: "title",
		type: "text",
		placeholder: "Title of your idea",
	},
	{
		label: "Description",
		field: "description",
		type: "textarea",
		placeholder: "Describe your idea",
	},
	{
		label: "Duration",
		field: "duration",
		type: "number",
		defaultValue: 1,
		rules: {
			min: { value: 1, message: "Minimum duration is 1 week" },
			max: { value: 54, message: "Maximum duration is 100 week" },
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
