import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Business Logic Academy",
  description: "Master essential business concepts through interactive lessons",
    generator: 'v0.dev'
}

/**
 * The root layout for the application.
 * This component sets up the basic HTML structure, including the `<html>` and `<body>` tags,
 * and applies the Inter font to the entire application.
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered root layout component.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
