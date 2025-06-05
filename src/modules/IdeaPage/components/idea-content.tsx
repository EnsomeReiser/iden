import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Ellipsis, Flag, Info } from "lucide-react";

export const IdeaContent = () => {
	return (
		<div className="mt-4 grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
			<IdeaContent.Card />
			<IdeaContent.Card />
			<IdeaContent.Card />
		</div>
	);
};

IdeaContent.Card = () => {
	return (
		<div className="box-border flex w-full flex-col gap-3 rounded-sm border border-gray-200 bg-white px-2 py-2.5 shadow dark:border-gray-600 dark:bg-gray-700 dark:shadow-gray-800">
			<div className="flex gap-2">
				<span
					className={cn(
						"flex items-center gap-1 rounded bg-blue-50 px-1.5 py-0.5 text-blue-500 text-xs",
						"dark:bg-blue-900 dark:text-blue-300",
					)}
				>
					<Info className="size-3" />
					Draft
				</span>

				<span
					className={cn(
						"flex items-center gap-1 rounded bg-gray-50 px-1.5 py-0.5 text-gray-500 text-xs",
						"dark:bg-gray-700 dark:text-gray-300",
					)}
				>
					<Flag className="size-3" />
					High
				</span>
				<span
					className={cn(
						"ml-auto flex items-center gap-0.5 rounded-sm bg-gray-50 px-1 py-0.5 hover:bg-gray-100",
						"dark:bg-gray-700 dark:text-gray-300 hover:dark:bg-gray-600 hover:dark:text-gray-200",
					)}
				>
					<Ellipsis className="size-3" />
				</span>
			</div>
			<div>
				<h1 className="mb-1 line-clamp-2 font-medium">
					Một title thật là dài thòn lòn thòn lòn lòn
				</h1>
				<p className="line-clamp-3 text-gray-600 text-sm dark:text-gray-300">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse nobis
					quisquam consectetur cumque pariatur molestiae illum quod, sequi
					culpa, nulla earum soluta fugit velit perferendis doloremque quaerat!
					Quia, optio repellendus.
				</p>
			</div>
			<div className="flex gap-2">
				<span
					className={cn(
						"flex items-center gap-1 rounded bg-gray-100 px-1.5 py-0.5 font-medium text-gray-500 text-xs",
						"dark:bg-orange-900 dark:text-orange-300",
					)}
				>
					Game
				</span>
				<span
					className={cn(
						"flex items-center gap-1 rounded bg-gray-100 px-1.5 py-0.5 font-medium text-gray-500 text-xs",
						"dark:bg-orange-900 dark:text-orange-300",
					)}
				>
					Giáo dục
				</span>
				<span
					className={cn(
						"flex items-center gap-1 rounded bg-gray-100 px-1.5 py-0.5 font-medium text-gray-500 text-xs",
						"dark:bg-orange-900 dark:text-orange-300",
					)}
				>
					Công <span className="line-through">nghệ</span>
				</span>
				<span
					className={cn(
						"flex items-center gap-1 rounded bg-gray-100 px-1.5 py-0.5 font-medium text-gray-500 text-xs",
						"dark:bg-orange-900 dark:text-orange-300",
					)}
				>
					...
				</span>
			</div>
			<div className="flex items-center justify-end gap-2">
				<Button variant="ghost" className="text-gray-600">
					View Detail
				</Button>
				<Button variant="ghost" className="font-medium text-gray-800">
					Execute
				</Button>
			</div>
		</div>
	);
};
