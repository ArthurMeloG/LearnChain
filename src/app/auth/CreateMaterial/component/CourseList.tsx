"use client"

import {CourseCard} from "@/components/custom/CourseCard";
import {useRouter} from "next/navigation";
import {courses} from "@/data/courses";
import {useGlobalContext} from "@/context/GlobalContext";


export function CourseList() {
    const { user } = useGlobalContext();
    console.log(user);
    const router = useRouter();
    const onClick = (courseId : string) => {
        router.push(`/auth/CourseDetail?course=${courseId}`);
    }

    const myCourses = courses?.filter(course => course.author == user?.tag) ;

    return (
        <div className="min-h-screen bg-darkBlue">
            <main className="container py-8 max-w-full">
                <div className="grid gap-4">
                    {myCourses?.map((course) => (
                        <CourseCard key={course.title} {...course} onClick={() => onClick(course.id)}/>
                    ))}
                </div>
            </main>
        </div>
    )
}

