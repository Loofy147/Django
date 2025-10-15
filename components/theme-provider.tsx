'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/**
 * A theme provider component that wraps the NextThemesProvider.
 * This component is responsible for providing theme context to the application,
 * allowing for dynamic theme switching (e.g., light and dark modes).
 * @param {ThemeProviderProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The rendered theme provider component.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
