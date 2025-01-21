"use client"

import { useSearchParams } from 'next/navigation'
import {useEffect, useState} from "react";
import { CourseCard } from "@/app/auth/CourseDetail/components/courseCard"
import {Course, CourseTopic} from "@/app/types/course";
import { courseTopics } from "./data/courseTopics"
import {courses} from "@/app/auth/CoursesPage/data/courses";

export default function CourseDetail() {
    const searchParams = useSearchParams();
    const courseQuery = searchParams.get('course');

    const [course, setCourse] = useState<Course>();
    const [topics, setTopics] = useState<CourseTopic[]>([]);

    const getCourse = async (courseId: string) => {
        return courses.find((course) => course.id === courseId);
    }

    const getTopics = async (courseId : string) => {
        return courseTopics.filter((topic) => topic.courseId === courseId);
    }

    const amountOfTopics = topics.length;

    const hoursOfCourse = topics.length

    useEffect(() => {
        if (courseQuery) {
            console.log(courseQuery);
            const courseId = courseQuery as string; // Garantir que courseId é uma string
            async function fetchData() {
                const courseData = await getCourse(courseId);
                if (courseData) {
                    setCourse(courseData);
                    const topicsData = await getTopics(courseData.id);
                    setTopics(topicsData);
                }
            }
            fetchData();
        }
    }, [courseQuery]);


    return (
        <div className="min-h-screen bg-zinc-900 text-white p-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{course?.title}</h1>
                    <p className="text-zinc-400">{amountOfTopics} Tópicos | {hoursOfCourse}H</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.map((card, index) => (
                        <CourseCard key={index} data={card} />
                    ))}
                </div>
            </div>
        </div>
    )
}

