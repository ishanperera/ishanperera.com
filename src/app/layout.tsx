import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ishan Perera, D.O. — Neurosurgeon, Developer, Entrepreneur",
    template: "%s | Ishan Perera",
  },
  description:
    "PGY-1 Neurosurgery Resident at Henry Ford Providence Hospital. Software developer, researcher with 15+ publications, and entrepreneur.",
  metadataBase: new URL("https://ishanperera.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ishanperera.com",
    siteName: "Ishan Perera",
    title: "Ishan Perera, D.O. — Neurosurgeon, Developer, Entrepreneur",
    description:
      "PGY-1 Neurosurgery Resident at Henry Ford Providence Hospital. Software developer, researcher with 15+ publications, and entrepreneur.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ishan Perera, D.O.",
    description:
      "Neurosurgeon, Developer, Researcher, Entrepreneur.",
    creator: "@ishanperera",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
              },
            }}
          />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ishan Perera",
              jobTitle: "PGY-1 Neurosurgery Resident",
              affiliation: [
                {
                  "@type": "Organization",
                  name: "Henry Ford Health Providence Hospital",
                },
                {
                  "@type": "Organization",
                  name: "Michigan State University College of Human Medicine",
                },
              ],
              url: "https://ishanperera.com",
              image: "https://ishanperera.com/headshot.jpg",
              sameAs: [
                "https://github.com/ishanperera",
                "https://www.linkedin.com/in/ishanperera07",
                "https://twitter.com/ishanperera",
              ],
              alumniOf: [
                {
                  "@type": "EducationalOrganization",
                  name: "Edward Via College of Osteopathic Medicine",
                },
                {
                  "@type": "EducationalOrganization",
                  name: "Old Dominion University",
                },
              ],
              knowsAbout: [
                "Neurosurgery",
                "Software Development",
                "Medical Research",
                "Artificial Intelligence",
              ],
              description:
                "PGY-1 Neurosurgery Resident at Henry Ford Providence Hospital. Software developer, researcher with 15+ publications, and entrepreneur.",
            }),
          }}
        />
      </body>
    </html>
  );
}
