"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {LogOut, Plus, Save, Search} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { useGlobalContext } from "@/context/GlobalContext"
import {findCourses} from "@/lib/utils";
import React, {useState} from "react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

const navigation = [
    { name: "Cursos", href: "/auth/CoursesPage", current: true }
]

export function Navbar() {
    const router = useRouter()
    const path = usePathname()
    const context = useGlobalContext();
    const [searchQuery, setSearchQuery] = useState("");

    const isInCoursesPage = path === "/auth/CoursesPage";
    const isInCreateMaterial = path === "/auth/CreateMaterial";
    const isEditCoursePage = path.includes("/auth/CourseDetailForm");

    const createCourse = () => {
        context.createCourse()
    }

    const goTocreatePage = () => {
        router.push("/auth/CreateMaterial")
    }

    const saveData = () => {
        context.triggerSubmit()
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (!query) {
            context.setCoursesSearch(context.courses);
        } else {
            const filteredCourses = findCourses(query, context.courses);
            context.setCoursesSearch(filteredCourses);
        }
    };

    return (
        <nav className="px-8 fixed top-0 left-0 right-0 z-50 bg-darkBlue border-b border-zinc-800">
            <div className="container max-w-full">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <Link href="/auth/CoursesPage" className="text-xl font-bold text-white">
                            LC
                        </Link>

                        <div className="relative flex-1 min-w-[800px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"/>
                            <Input
                                type="search"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Busque pelo nome ou por tags"
                                className="w-full bg-zinc-800/50 border-zinc-700 pl-10 text-blueWhite font-bold"
                            />
                        </div>
                    </div>
                    {/* Avatar with Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-8 w-8 bg-zinc-800 border border-zinc-700 cursor-pointer">
                                <AvatarFallback className="text-sm font-medium">AM</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-zinc-800 border-zinc-700">
                            <DropdownMenuItem onClick={context.logoutUser} className="text-white hover:bg-zinc-700">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                        {isInCoursesPage && (
                            <Button size={"lg"} variant="ghost" className={"bg-blueWhite font-bold"} onClick={goTocreatePage}>
                                Criar Material
                            </Button>
                        )}
                        {isInCreateMaterial && (
                            <Button size={"lg"} variant="ghost" className={"bg-blueWhite font-bold"} onClick={createCourse}>
                                <Plus className="mr-2 h-4 w-4" />
                                Criar Curso
                            </Button>
                        )}
                        {isEditCoursePage && (
                            <Button size={"lg"} variant="ghost" className={"bg-blueWhite font-bold"} onClick={saveData}>
                                <Save className="w-4 h-4 mr-2" />
                                Salvar Alterações
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

