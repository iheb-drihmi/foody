import GlobalState from "@/context";
import "../styles/globals.css";

import { Inter } from "next/font/google";
import Navbar from "@/components/layouts/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Foody",
  description: "Foody is ...",
};

export default function RootLayout({ children, ...rest }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <Navbar />
          <main className="flex min-h-screen flex-col">{children}</main>
        </GlobalState>
      </body>
    </html>
  );
}
