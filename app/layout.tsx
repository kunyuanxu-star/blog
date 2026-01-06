import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kunyuan Xu - Personal Blog",
  description: "System Software Developer. Enthusiast of Rust & OS Kernels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
