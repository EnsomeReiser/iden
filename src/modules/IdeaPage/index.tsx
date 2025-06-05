import { Header } from "@/components/header";
import { IdeaFilter } from "@/modules/IdeaPage/Filter";
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
		</>
	);
};
