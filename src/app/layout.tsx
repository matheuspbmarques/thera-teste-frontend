'use client';

import "./globals.css";
import { Poppins } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import ThemeContext from "@/contexts/ThemeContext";

const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const queryClient = new QueryClient();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	return (
		<html lang="pt-br" className={theme}>
			<head>
				<title>Project</title>
			</head>
			<QueryClientProvider client={queryClient}>
				<ThemeContext.Provider
					value={{ theme, setTheme }}
				>
					<body className={`${poppins.className} bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100`}>
						{children}
					</body>
				</ThemeContext.Provider>
			</QueryClientProvider>
		</html>
	);
};