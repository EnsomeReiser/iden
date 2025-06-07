import type { ReactNode } from "@tanstack/react-router";
import { Ellipsis, Flag, Info, type LucideProps } from "lucide-react";
import type React from "react";

import type {
	IdeaPotential,
	IdeaStatus,
} from "@/database/entities/ideas.entity";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mockdata } from "@/modules/IdeaPage/components/mock";

export const IdeaContent = () => {
	return (
		<div className="mt-4 grid flex-1 grid-cols-1 gap-x-4 gap-y-3 overflow-auto px-4 md:grid-cols-2">
			{mockdata.map((data) => (
				<IdeaContent.Card key={data.id}>
					<IdeaContent.Header status={data.status} potential={data.potential} />
					<div>
						<IdeaContent.Title data={data.title} />
						<IdeaContent.Description description={data.description} />
					</div>
					<IdeaContent.PropertiesList>
						<IdeaContent.Property label="Duration" value={data.duration} />
						<IdeaContent.Property
							label="Duration + 1"
							value={data.duration + 1}
						/>
						<IdeaContent.Property
							label="Duration + 2"
							value={data.duration + 2}
						/>
					</IdeaContent.PropertiesList>
					<IdeaContent.TagList>
						{data.tags.slice(0, 3).map((tag) => (
							<IdeaContent.Badge key={tag} label={tag} />
						))}
						{/* Hiện thị dấu 3 chấm nếu tags trong list nhiều hơn 3 */}
						{data.tags.length > 3 && <IdeaContent.Badge label="..." />}
					</IdeaContent.TagList>
					<IdeaContent.Action>
						<IdeaContent.ActionItem
							className="py-1 text-gray-600 dark:text-gray-300 hover:dark:bg-gray-600"
							variant="ghost"
						>
							View Detail
						</IdeaContent.ActionItem>
						<IdeaContent.ActionItem
							className="bg-indigo-100 font-medium text-indigo-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-indigo-800 dark:text-foreground hover:dark:bg-indigo-600/90"
							variant="ghost"
						>
							Execute
						</IdeaContent.ActionItem>
					</IdeaContent.Action>
				</IdeaContent.Card>
			))}
		</div>
	);
};

IdeaContent.Card = ({ children }: { children: ReactNode }) => {
	return (
		<div className="box-border flex w-full flex-col gap-3 rounded-sm border border-gray-200 bg-white px-4 pt-4 pb-2 shadow dark:border-gray-600 dark:bg-gray-700 dark:shadow-gray-800">
			{children}
		</div>
	);
};

interface HeaderProps {
	status: IdeaStatus;
	potential: IdeaPotential;
}

const IdeaStatusStyles = {
	Draft: "bg-blue-50 text-blue-500 text-xs dark:bg-blue-900 dark:text-blue-400",
	Executing:
		"bg-green-50 text-green-500 text-xs dark:bg-green-900 dark:text-green-400",
	Executed:
		"bg-teal-50 text-teal-500 text-xs dark:bg-teal-900 dark:text-teal-400",
	Archived:
		"bg-gray-50 text-gray-500 text-xs dark:bg-gray-800 dark:text-gray-400",
	Aborted:
		"bg-amber-50 text-amber-500 text-xs dark:bg-red-900 dark:text-red-400",
};

const IdeaPotentialStyles = {
	High: "bg-green-50 text-green-500 dark:bg-green-900 dark:text-green-400",
	Medium:
		"bg-yellow-50 text-yellow-500 dark:bg-yellow-900 dark:text-yellow-400",
	Low: "bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
};

type BadgeProps<T extends string> = {
	label: T;
	styleMap?: Record<T, string>;
	icon?: React.FC<LucideProps>;
};

function Badge<T extends string>({
	label,
	styleMap,
	icon: Icon,
}: BadgeProps<T>) {
	return (
		<span
			className={cn(
				"flex cursor-default items-center gap-1 rounded px-1.5 py-0.5 text-xs",
				styleMap
					? styleMap[label]
					: "bg-gray-100 text-gray-500 dark:bg-gray-600/70 dark:text-gray-300 ",
			)}
		>
			{Icon && <Icon className="size-3" />}
			{label}
		</span>
	);
}

IdeaContent.Badge = Badge;

IdeaContent.Header = ({ status, potential }: HeaderProps) => {
	return (
		<div className="flex gap-2" data-slot="header">
			<IdeaContent.Badge
				label={status}
				styleMap={IdeaStatusStyles}
				icon={Info}
			/>
			<IdeaContent.Badge
				label={potential}
				styleMap={IdeaPotentialStyles}
				icon={Flag}
			/>

			<span
				className={cn(
					"ml-auto flex items-center gap-0.5 rounded-sm bg-gray-50 px-1 py-0.5 hover:bg-gray-100",
					"dark:bg-gray-700 dark:text-gray-300 hover:dark:bg-gray-600 hover:dark:text-gray-200",
				)}
			>
				<Ellipsis className="size-3" />
			</span>
		</div>
	);
};

IdeaContent.Title = ({ data }: { data: string }) => {
	return <h1 className="mb-1 line-clamp-2 font-medium">{data}</h1>;
};

IdeaContent.Description = ({ description }: { description: string }) => {
	return (
		<p className="line-clamp-3 text-gray-600 text-sm dark:text-gray-300">
			{description}
		</p>
	);
};

IdeaContent.PropertiesList = ({ children }: { children: ReactNode }) => {
	return <ul className="space-y-1">{children}</ul>;
};

IdeaContent.Property = ({
	label,
	value,
}: { label: string; value: string | number }) => {
	return (
		<li className="flex justify-between pr-1 text-gray-600 text-xs dark:text-gray-400">
			<span>&bull; {label}:</span>
			<span className="font-medium">{value}</span>
		</li>
	);
};

IdeaContent.Action = ({ children }: { children: React.ReactNode }) => {
	return <div className="flex items-center justify-end gap-2">{children}</div>;
};

IdeaContent.ActionItem = ({
	children,
	variant = "default",
	...props
}: React.ComponentProps<typeof Button>) => {
	return (
		<Button size="sm" variant={variant} {...props}>
			{children}
		</Button>
	);
};

IdeaContent.TagList = ({ children }: { children: React.ReactNode }) => {
	return <div className="flex gap-2">{children}</div>;
};
