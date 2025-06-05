import { IdeaPage } from "@/modules/IdeaPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ideas/")({
	component: IdeaPage,
});
