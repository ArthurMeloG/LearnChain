"use client"
import { CourseCard } from "@/components/custom/CourseCard"
import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import {Course} from "@/types/course";
import Api from "@/api/Api";
import {useGlobalContext} from "@/context/GlobalContext";

export default function CoursesPage() {
    const  context = useGlobalContext();
    const [courses, setCourses] = useState<Course[]>([]);

    async function getCourses() : Promise<void> {
        const response : Course[] = await Api.course.fetchCourses();
        setCourses(response);
        context.setCourses(response);
    }

    useEffect(() => {
        getCourses();
    }, []);

    useEffect(() => {
        if(context.coursesSearch) {
            setCourses(context.coursesSearch);
        }
    }, [context.coursesSearch]);

    const router = useRouter();
    const onClick = (courseId : string) => {
        router.push(`/auth/CourseDetail?course=${courseId}`);
    }

    return (
        <div className="min-h-screen bg-darkBlue">
            <main className="container py-8 max-w-full">
                <div className="grid gap-4">
                    {
                        courses.map((course) => (
                            <CourseCard key={course.title} {...course} onClick={() => onClick(course.id)} />
                        ))
                    }
                </div>
            </main>
        </div>
    )
}

