import { createContext, Dispatch, SetStateAction } from "react";

type ThemeContextProps = {
    theme: 'light' | 'dark',
    setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
};

const ThemeContext = createContext<ThemeContextProps | null>(null);

export default ThemeContext;