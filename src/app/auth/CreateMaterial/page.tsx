import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CourseList } from "./component/CourseList"
import { CreateCourseModal } from "./component/CreateCourseModal"

export default function CoursesPage() {
    return (
        <div className="container py-8 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Cursos</h2>
                    <p className="text-muted-foreground">Gerencie seus cursos e crie novos conteúdos</p>
                </div>
                <CreateCourseModal>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Criar Curso
                    </Button>
                </CreateCourseModal>
            </div>
            <CourseList />
        </div>
    )
}

