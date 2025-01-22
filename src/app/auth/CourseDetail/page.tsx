"use client"

import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useState} from "react";
import { CourseCard } from "@/app/auth/CourseDetail/components/courseCard"
import {Course, CourseTopic} from "@/app/types/course";
import { courseTopics } from "../../../data/courseTopics"
import {courses} from "@/data/courses";
import {useGlobalContext} from "@/context/GlobalContext";

export default function CourseDetail() {
    const searchParams = useSearchParams();
    const courseQuery = searchParams.get('course');
    const router = useRouter();
    const {user} = useGlobalContext();
    const [course, setCourse] = useState<Course>();
    const [topics, setTopics] = useState<CourseTopic[]>([]);

    const editMode = course?.author == user?.tag;

    const onClick = (courseId : string) => {
        router.push(`/auth/Topics`);
    }

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
        <div className="min-h-screen bg-darkBlue text-white">
            <div className=" mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{course?.title}</h1>
                    <p className="text-zinc-400">{amountOfTopics} Tópicos | {hoursOfCourse}H</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.map((card, index) => (
                        <CourseCard key={index} data={card} onClick={onClick} editMode={editMode}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

