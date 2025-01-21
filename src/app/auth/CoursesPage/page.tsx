"use client"
import { CourseCard } from "@/components/custom/CourseCard"
import {courses} from "@/app/auth/CoursesPage/data/courses";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
    const router = useRouter();
    const onClick = (courseId : string) => {
        router.push(`/auth/CourseDetail?course=${courseId}`);
    }

    return (
        <div className="min-h-screen bg-darkBlue">
            <main className="container py-8 max-w-full">
                <div className="grid gap-4">
                    {courses.map((course) => (
                        <CourseCard key={course.title} {...course} onClick={() => onClick(course.id)} />
                    ))}
                </div>
            </main>
        </div>
    )
}

