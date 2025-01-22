import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CourseList } from "./CourseList"
import { CreateCourseModal } from "./CreateCourseModal"

export default function CreateMaterialView({coursesList}) {
    return (
        <div className="container py-8 min-h-screen text-white">
            <div className="flex justify-between items-center mb-8">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Área de Criar Material</h2>
                    <p className="text-muted-foreground">Gerencie seus cursos e crie novos conteúdos</p>
                </div>
                <CreateCourseModal/>
            </div>
            <CourseList />
        </div>
    )
}

