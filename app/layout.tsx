import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Manage your notes easily with NoteHub",
  openGraph: {
    title: "NoteHub",
    description: "Manage your notes easily with NoteHub",
    url: "https://your-site.vercel.app",
    images: [
      "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>{children}</body>
    </html>
  );
}