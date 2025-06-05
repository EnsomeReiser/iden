import { Header } from "@/components/header";
import { IdeaContent } from "@/modules/IdeaPage/components/idea-content";
import { IdeaFilter } from "@/modules/IdeaPage/components/idea-filter";
import { Plus } from "lucide-react";

export const IdeaPage = () => {
	const handleHeaderAction = () => {};

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
			<IdeaContent />
		</>
	);
};
