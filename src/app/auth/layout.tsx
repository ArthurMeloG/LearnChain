import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import {Navbar} from "@/components/custom/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div lang="en">
            <div className={"px-8 bg-darkBlue"}>
                <Navbar/>
                {children}
            </div>
        </div>
    );
}
