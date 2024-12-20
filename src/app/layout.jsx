import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Header from "@/components/header/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Game Hub",
  description: "For gamer, real gamer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="header">
          <Header></Header>
        </div>
        <div className="warper">
          <div className="navbarWrap">
            <div className="navbar">
              <Navbar></Navbar>
            </div>
          </div>
          <div className="content">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
