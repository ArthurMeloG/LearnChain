"use client"
import { Clock, Calendar, Eye, User, Edit } from "lucide-react"
import { CourseTopic as CourseCardType} from "@/types/course"
import { Button } from "@/components/ui/button";

interface CourseCardProps {
    data: CourseCardType
    onClick: () => void;
    editMode: boolean;
}

export function CourseDetailCard({ data , onClick, editMode}: CourseCardProps) {
    return (
        <div className="border border-indigo-900/50 rounded-lg p-6 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors flex flex-col h-full" onClick={onClick}>
            <div className="flex-grow">
                <div className={"flex justify-between items-center"}>
                    <h2 className="text-xl font-bold mb-2">{data.title}</h2>
                    {editMode && <Button><Edit/> Editar</Button>}
                </div>
                <p className="text-zinc-400 text-sm mb-2">{data.subtitle}</p>
                <p className="text-zinc-500 text-sm">{data.description}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-zinc-400 mt-6">
                <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>{data.author}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{data.date}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{data.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>{data.views}</span>
                </div>
            </div>
        </div>
    )
}

