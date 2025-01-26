"use client"

import {CourseCard} from "@/components/custom/CourseCard";
import {useRouter} from "next/navigation";
import {useGlobalContext} from "@/context/GlobalContext";
import {useEffect, useState} from "react";
import Api from "@/api/Api";
import {Course} from "@/types/course";


export function CourseList() {
    const { user } = useGlobalContext();
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const onClick = (courseId : string) => {
        router.push(`/auth/CourseDetailForm?course=${courseId}`);
    }

    useEffect(() => {
        async function getCourses() {
            if(user) {
                const response = await Api.course.getCoursesByUserId(user.id);
                setCourses(response)
            }
        }
        getCourses()
    }, [user]);

    return (
        <div className="min-h-screen bg-darkBlue">
            <main className="container py-8 max-w-full">
                <div className="grid gap-4">
                    {courses?.map((course) => (
                        <CourseCard key={course.title} {...course} onClick={() => onClick(course.id)}/>
                    ))}
                </div>
            </main>
        </div>
    )
}

