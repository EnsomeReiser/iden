import type { BaseEntity } from "@/database/base.entity";

export interface Idea extends BaseEntity {
	title: string;
	description: string;
	duration: number;
	status: IdeaStatus;
	keyFeatures: string[];
	potential: IdeaPotential;

	tags: string[];
	relatedIdeas: string[];
}

export type IdeaPotential = "High" | "Medium" | "Low";

export const IdeaStatus = {
	Draft: "Draft",
	Ready: "Ready",
	Executing: "Executing",
	Executed: "Executed",
	Archived: "Archived",
	Aborted: "Aborted",
} as const;

export type IdeaStatus = (typeof IdeaStatus)[keyof typeof IdeaStatus];
