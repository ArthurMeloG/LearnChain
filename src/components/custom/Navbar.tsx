"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search } from "lucide-react"
import {Button} from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {useGlobalContext} from "@/context/GlobalContext";

const navigation = [
    { name: "Meus Cursos", href: "/auth/CoursesPage", current: true },
    { name: "Programação", href: "/programacao", current: false },
    { name: "Finanças", href: "/financas", current: false },
    { name: "Desing", href: "/design", current: false },
]

export function Navbar() {
    const router = useRouter();
    const path = usePathname();
    const context = useGlobalContext();

    const saveData = () => {
        context.handleSave();
    }

    const goTocreatePage = () => {
        router.push("/auth/CreateMaterial");
    };

    const isInCoursesPage = path === "/auth/CoursesPage";
    const isInCreateMaterial = path === "/auth/CreateMaterial";

    return (
        <nav className="max-w-full bg-darkBlue border-b border-zinc-800 ">
            <div className="container max-w-full">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <Link href="/" className="text-xl font-bold text-white">
                            LN
                        </Link>

                        {/* Search */}
                        <div className="relative flex-1 min-w-[800px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"/>
                            <Input
                                type="search"
                                placeholder="Busque pelo nome ou por tags"
                                className="w-full bg-zinc-800/50 border-zinc-700 pl-10"
                            />
                        </div>
                    </div>
                    {/* Avatar */}
                    <Avatar className="h-8 w-8 bg-zinc-800 border border-zinc-700">
                        <AvatarFallback className="text-sm font-medium">AM</AvatarFallback>
                    </Avatar>
                </div>

                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex gap-6">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-sm font-medium ${
                                        item.current ? "text-white border-b-2 border-blue-500" : "text-zinc-400 hover:text-white"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        {isInCoursesPage && <Button size={"lg"} variant="ghost" className={"bg-blueWhite font-bold"} onClick={goTocreatePage}>Criar Material</Button> }
                        {isInCreateMaterial && <Button size={"lg"} variant="ghost" className={"bg-blueWhite font-bold"} onClick={saveData}>Salvar Conteúdo</Button> }
                    </div>
                </div>
            </div>
        </nav>
)
}

