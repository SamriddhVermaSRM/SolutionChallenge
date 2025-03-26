'use client';

import * as React from 'react';
import {
	ThemeProvider as NextThemesProvider,
	type ThemeProviderProps,
} from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => {
		setMounted(true);
	}, []);
	// When mounted on client, now we can show the UI
	if (!mounted) {
		return <>{children}</>;
	}
	// If you want to use the default theme, you can remove the `defaultTheme` prop
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
