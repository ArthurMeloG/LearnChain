"use client"

import { Eye, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import {CourseContent} from "@/types/course";

export function ContentTable({contents} : { contents: CourseContent[]}) {

    const router = useRouter();

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[300px]">Título</TableHead>
                        <TableHead>Descrição</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contents.map((content) => (
                        <TableRow
                            key={content.id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => router.push(`/auth/Content/${content.id}`)}
                        >
                            <TableCell>
                                <div className="space-y-1">
                                    <div className="font-medium">{content.title}</div>
                                    <div className="text-sm text-muted-foreground line-clamp-1">{content.description}</div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    {content.description}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

