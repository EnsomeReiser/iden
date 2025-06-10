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

export const IdeaPage = () => {
	const [showOverlay, setShowOverlay] = useState(false);
	const { register, getValues } = useForm<Inputs>();

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
				<Dialog.Title>Hello</Dialog.Title>
				<Dialog.Body>
					<Dialog.Field label="Name:">
						<input className="border border-gray-500" {...register("title")} />
					</Dialog.Field>
					<Dialog.Field label="Description:">
						<textarea
							className="border border-gray-500"
							{...register("description")}
						/>
					</Dialog.Field>
					<Dialog.Field label="status:">
						<select className="border border-gray-500" {...register("status")}>
							{Object.values(IdeaStatus).map((status) => (
								<option key={status} value={status}>
									{status}
								</option>
							))}
						</select>
					</Dialog.Field>
					<Dialog.Field label="potenial:">
						<select
							className="border border-gray-500"
							{...register("potential")}
						>
							{Object.values(IdeaPotential).map((potential) => (
								<option key={potential} value={potential}>
									{potential}
								</option>
							))}
						</select>
					</Dialog.Field>
				</Dialog.Body>
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
