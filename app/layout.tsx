import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/nav';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'HealthAssist AI',
	description: 'AI-powered healthcare assistant',
	generator: 'v0.dev',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					enableSystem
					disableTransitionOnChange
				>
					<Nav />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

import './globals.css';
import { IconURL } from 'next/dist/lib/metadata/types/metadata-types';
