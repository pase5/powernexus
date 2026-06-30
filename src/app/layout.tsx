import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "POWERNEXUS | IEEE Technical Webinar Series",
  description:
    "POWERNEXUS is an online technical webinar series organized by IEEE PES SBC CEAL in collaboration with IEEE PES Kerala Chapter, focusing on power system operations, smart grids, and renewable energy innovation.",
  keywords: [
    "IEEE",
    "IEEE PES",
    "POWERNEXUS",
    "Power Systems",
    "Smart Grids",
    "Renewable Energy",
    "Webinar Series",
    "CEAL",
    "CE Attingal",
  ],
  authors: [{ name: "IEEE PES SBC CEAL" }],
  openGraph: {
    title: "POWERNEXUS | IEEE Technical Webinar Series",
    description:
      "Empowering the Future of Power & Energy through Knowledge, Innovation, and Collaboration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} scroll-smooth`}
    >
      <body className="bg-brand-bg-dark text-gray-100 font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}

