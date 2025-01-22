"use client"

import { Clock, Eye, Hash } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Simulating courses data - in a real app, this would come from an API
const courses = [
    {
        id: 1,
        title: "Clean Code",
        subtitle: "Escreva código limpo e sustentável",
        description:
            "Aprenda os princípios do Clean Code para escrever código mais legível, manutenível e escalável. Este curso aborda as melhores práticas para desenvolvimento de software de alta qualidade.",
        tag: "CodeMaster",
        duration: "40h",
        views: "30k",
        releaseDate: "25/01/2025",
    },
    {
        id: 2,
        title: "Matemática",
        subtitle: "Estudos aprofundados sobre matemática avançada",
        description:
            "Aprenda os conceitos essenciais da matemática de forma prática e intuitiva! Ideal para estudantes e profissionais que querem dominar cálculos, lógica e resolução de problemas.",
        tag: "MathPro",
        duration: "200h",
        views: "50k",
        releaseDate: "19/01/2025",
    },
    {
        id: 3,
        title: "Finanças",
        subtitle: "Aprenda a gerir o próprio dinheiro",
        description:
            "Descubra como organizar suas finanças, economizar de forma inteligente e fazer seu dinheiro render mais! Dê o primeiro passo para a sua independência financeira.",
        tag: "Luke42",
        duration: "60min",
        views: "35k",
        releaseDate: "20/12/2024",
    },
]

export function CourseList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
                    <Card key={course.id} className="flex flex-col">
                <CardHeader>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{course.subtitle}</p>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                <Hash className="h-4 w-4" />
                    <span>{course.tag}</span>
                    </div>
                    <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                    <span>{course.views} Views</span>
            </div>
            </div>
            </CardContent>
            </Card>
    ))}
    </div>
)
}

