import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const montserrat = Montserrat({
  variable: "--font-montserrat", // Define a variable for Montserrat
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Add required font weights
});

export const metadata = {
  title: "Ride-Share",
  description: "Ride sharing app with progressive developer",
  icons: "/Rideshare.ico", // ✅ Add this line
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* ✅ Add Favicon Link */}
          <link rel="icon" href="/Rideshare.ico" />
        </head>
        <body
          className={`${montserrat.variable} antialiased h-screen overflow-hidden`}
        >
          <SignedIn>
            <Header />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
