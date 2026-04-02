import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Hulchul",
  description: "Hulchul: Real-time Multi-Agent Simulation Engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" async></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: "class",
                theme: {
                  extend: {
                    colors: {
                      "primary-container": "#ec6aff",
                      "on-surface": "#ffffff",
                      "surface-container-high": "#201f1f",
                      "on-primary-fixed": "#000000",
                      "surface-tint": "#f183ff",
                      "on-tertiary-fixed-variant": "#6a6000",
                      "surface": "#0e0e0e",
                      "primary-dim": "#eb65ff",
                      "secondary-dim": "#00d4ec",
                      "on-background": "#ffffff",
                      "secondary-container": "#006875",
                      "inverse-surface": "#fcf9f8",
                      "on-secondary": "#004d57",
                      "on-primary-container": "#41004c",
                      "on-secondary-container": "#e8fbff",
                      "on-error-container": "#ffb2b9",
                      "outline-variant": "#484847",
                      "on-tertiary-fixed": "#4b4400",
                      "primary-fixed": "#ec6aff",
                      "surface-container-low": "#131313",
                      "outline": "#767575",
                      "tertiary": "#fff7d0",
                      "on-secondary-fixed-variant": "#005964",
                      "surface-container-highest": "#262626",
                      "error": "#ff6e84",
                      "surface-variant": "#262626",
                      "secondary-fixed": "#26e6ff",
                      "on-secondary-fixed": "#003a42",
                      "on-primary": "#540062",
                      "surface-container-lowest": "#000000",
                      "surface-dim": "#0e0e0e",
                      "inverse-primary": "#a300bc",
                      "inverse-on-surface": "#565555",
                      "on-tertiary": "#685e00",
                      "error-container": "#a70138",
                      "tertiary-dim": "#f0dc2b",
                      "error-dim": "#d73357",
                      "surface-bright": "#2c2c2c",
                      "surface-container": "#1a1919",
                      "tertiary-fixed-dim": "#f0dc2b",
                      "on-tertiary-container": "#5f5600",
                      "background": "#0e0e0e",
                      "tertiary-container": "#ffeb3b",
                      "on-error": "#490013",
                      "on-surface-variant": "#adaaaa",
                      "primary-fixed-dim": "#e64dff",
                      "secondary-fixed-dim": "#00d7f0",
                      "secondary": "#00e3fd",
                      "tertiary-fixed": "#ffeb3b",
                      "primary": "#f183ff",
                      "on-primary-fixed-variant": "#50005e"
                    },
                    fontFamily: {
                      "headline": ["Plus Jakarta Sans"],
                      "body": ["Manrope"],
                      "label": ["Manrope"]
                    },
                    borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
                  },
                },
              }
            `,
          }}
        />
      </head>
      <body className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen relative flex">
        <LayoutWrapper>{children}</LayoutWrapper>
        <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 blur-[180px] rounded-full pointer-events-none"></div>
        <div className="fixed -bottom-48 -left-48 -z-10 w-[800px] h-[800px] bg-secondary/5 blur-[200px] rounded-full pointer-events-none"></div>
      </body>
    </html>
  );
}
