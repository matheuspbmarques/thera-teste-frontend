import ThemeContext from "@/contexts/ThemeContext";
import { useContext } from "react";
import { Moon, Sun } from "react-feather";

export default function ThemeToggle () {
    const themeContext = useContext(ThemeContext);

    return (
        <button
            className="bg-blue-700 text-slate-100 rounded-full py-2 px-2 hover:bg-blue-500 duration-300"
            onClick={() => themeContext?.setTheme(themeContext.theme == 'light' ? 'dark' :  'light')}
        >
            <Sun className="dark:hidden" />
            <Moon className="hidden dark:flex" />
        </button>
    );
};