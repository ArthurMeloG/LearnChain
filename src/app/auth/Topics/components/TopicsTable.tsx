"use client"

import { Eye, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"

const topics = [
    {
        id: 1,
        title: "Começando",
        description: "Instalação do ambiente e ambientação",
        author: "#CodeMaster",
        date: "25/01/2025",
        duration: "40h",
        views: "30k",
    },
    {
        id: 2,
        title: "Nomeando",
        description: "Definindo nomes para variáveis, classes e mais",
        author: "#CodeMaster",
        date: "25/01/2025",
        duration: "30h",
        views: "25k",
    },
    {
        id: 3,
        title: "Funções e métodos",
        description: "Como criar funções da maneira certa",
        author: "#CodeMaster",
        date: "25/01/2025",
        duration: "50h",
        views: "40k",
    },
]

export function TopicsTable() {
    const router = useRouter()

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Título</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Duração</TableHead>
                        <TableHead>Visualizações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {topics.map((topic) => (
                        <TableRow
                            key={topic.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => router.push(`/auth/Topics/${topic.id}`)}
                        >
                            <TableCell>
                                <div className="space-y-1">
                                    <div className="font-medium">{topic.title}</div>
                                    <div className="text-sm text-muted-foreground line-clamp-1">{topic.description}</div>
                                </div>
                            </TableCell>
                            <TableCell>{topic.date}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    {topic.duration}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                    {topic.views}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

