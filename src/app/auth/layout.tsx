import "../globals.css";
import {Navbar} from "@/components/custom/Navbar";

export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div lang="en">
            <div className={"px-8 bg-darkBlue"}>
                <Navbar/>
                <div className="mt-[128px]">
                    {children}
                </div>
            </div>
        </div>
    );
}
