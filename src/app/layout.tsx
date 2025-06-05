import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Online Roulette | Exciting Simulator Game",
    template: "%s | Online Roulette",
  },
  description:
    "An exciting online roulette simulator. Test your luck, spin the wheel, and win! Fast rounds, realistic graphics, and pure thrill await.",
  keywords: [
    "online roulette",
    "roulette game",
    "roulette simulator",
    "free roulette",
    "spin the wheel",
    "gambling games",
    "virtual casino",
    "win at roulette",
    "game of luck",
    "roulette no registration",
  ],
  authors: [{ name: "Hubsky Oleg", url: "https://github.com/HubskyOleg" }],
  creator: "Hubsky Oleg",
  publisher: "Hubsky Oleg",
  openGraph: {
    title: "Online Roulette | Exciting Simulator Game",
    description:
      "Test your luck in an exciting online roulette simulator. Fast rounds, vibrant graphics, and real excitement are waiting for you!",
    url: "https://roulette-game-test.vercel.app/",
    siteName: "Online Roulette",
    images: [
      {
        url: "https://roulette-game-test.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Online Roulette: Game Field Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Roulette | Exciting Simulator Game",
    description:
      "Spin the wheel of fortune! Play the online roulette simulator, test your luck, and feel the thrill.",
    creator: "@HubskyOleg",
    images: ["https://roulette-game-test.vercel.app/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://roulette-game-test.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--dark-1)] `}
      >
        {children}
      </body>
    </html>
  );
}
