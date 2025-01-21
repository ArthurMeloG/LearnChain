import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Clock, Eye } from "lucide-react"
import {MouseEventHandler} from "react";

interface CourseCardProps {
    title: string
    description: string
    subtitle: string
    author: string
    date: string
    duration: string
    views: string
    onClick: () => void
}

export function CourseCard({ title, description, subtitle, author, date, duration, views, onClick }: CourseCardProps) {
    return (
        <Card className="bg-zinc-900/50 border-strongBlue hover:bg-zinc-900/80 transition-colors cursor-pointer" onClick={onClick}>
            <CardHeader>
                <h3 className="text-xl font-mono text-white">{title}</h3>
                <p className="text-sm text-zinc-400">{subtitle}</p>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-zinc-500 mb-4">{description}</p>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                    <div className="flex items-center gap-4">
                        <span className="text-blue-400">{author}</span>
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{views}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

