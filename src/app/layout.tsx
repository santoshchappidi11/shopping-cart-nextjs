import type { Metadata } from "next";
import "./globals.css";
import { ShoppingProvider } from "./context/ShoppingCartContext";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"], // weights
  subsets: ["latin"],
  fallback: ["sans-serif"], // fallback font
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            duration: 2000,
            style: {
              background: "black",
              color: "#fff",
            },
            // Default options for specific types
            success: {
              duration: 2000,
              style: {
                background: "black",
                color: "white",
              },
            },
            error: {
              duration: 2000,
              style: {
                background: "black",
                color: "white",
              },
            },
          }}
        />
        <ShoppingProvider>{children}</ShoppingProvider>
      </body>
    </html>
  );
}
