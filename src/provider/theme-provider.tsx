import { createContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextProps {
	theme: Theme;
	toggleTheme?: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as Theme | null;
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const initialTheme = savedTheme ?? (prefersDark ? "dark" : "light");

		setTheme(initialTheme);
		document.documentElement.classList.toggle("dark", initialTheme === "dark");
	}, []);

	const toggleTheme = () => {
		const nextTheme = theme === "light" ? "dark" : "light";
		setTheme(nextTheme);

		if (nextTheme === "dark") {
			localStorage.setItem("theme", "dark");
			document.documentElement.classList.add("dark");
		} else {
			localStorage.setItem("theme", "light");
			document.documentElement.classList.remove("dark");
		}
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
