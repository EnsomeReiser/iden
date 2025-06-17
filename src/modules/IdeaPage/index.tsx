import { Dialog } from "@/components/dialog";
import { FormRenderer } from "@/components/form-renderer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { db } from "@/database/db";
import { formDefaultValues } from "@/lib/form-default-value";
import { IdeaContent } from "@/modules/IdeaPage/components/idea-content";
import { IdeaFilter } from "@/modules/IdeaPage/components/idea-filter";
import {
	type IdeaInputs,
	ideaFormFields,
} from "@/modules/IdeaPage/form.config";
import { useLiveQuery } from "dexie-react-hooks";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const IdeaPage = () => {
	const [showOverlay, setShowOverlay] = useState(false);
	const {
		register,
		getValues,
		formState: { errors },
		handleSubmit,
	} = useForm<IdeaInputs>({ defaultValues: formDefaultValues(ideaFormFields) });

	const ideas = useLiveQuery(() => db.ideas.toArray());

	const handleHeaderAction = () => {
		setShowOverlay(true);
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
				<Dialog.Title>Add new idea</Dialog.Title>
				<Dialog.Body>
					<form id="create-idea" onSubmit={handleSubmit(addIdea)}>
						<FormRenderer
							fields={ideaFormFields}
							register={register}
							errors={errors}
						/>
					</form>
				</Dialog.Body>
				<Dialog.Footer>
					<Button
						variant="secondary"
						type="button"
						onClick={() => setShowOverlay(false)}
					>
						Close
					</Button>
					<Button type="submit" form="create-idea">
						Add
					</Button>
				</Dialog.Footer>
			</Dialog>
		</>
	);
};
