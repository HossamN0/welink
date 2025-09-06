import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "@/providers/react-query";
import ReduxProvider from "@/providers/redux";
import { WebsocketConnection } from "@/services/ws/connection";
import { measureWebVitals } from "@/utils/performance";
import "@/styles/globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  preload: true,
});


export const metadata: Metadata = {
  title: "Parking",
  description: "Parking App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize performance monitoring
              if (typeof window !== 'undefined') {
                ${measureWebVitals.toString()}();
              }
            `,
          }}
        />
      </head>
      <body
        className={`${roboto.className} min-container`}
      >
        <ReactQueryProvider>
          <ReduxProvider>
            <WebsocketConnection />
            <Toaster />
            {children}
          </ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
