import { cn } from "@/lib/utils";
import { ThemeContext } from "@/provider/theme-provider";
import { Moon, SunDim } from "lucide-react";
import { useContext } from "react";

export const ThemeToggle = ({ className }: React.ComponentProps<"button">) => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("ThemeToggle has to be used within <ThemeProvider>");
	}

	const { theme, toggleTheme } = context;

	return (
		<button
			className={cn(
				"flex cursor-pointer items-center justify-center rounded-md border border-muted-foreground p-1 hover:bg-muted [&_svg]:size-5",
				className,
			)}
			type="button"
			onClick={toggleTheme}
		>
			{theme === "light" ? <SunDim /> : <Moon />}
		</button>
	);
};
