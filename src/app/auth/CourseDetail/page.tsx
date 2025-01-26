"use client"

import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useState} from "react";
import { CourseDetailCard } from "@/app/auth/CourseDetail/components/CourseDetailCard"
import {useGlobalContext} from "@/context/GlobalContext";
import {Course, CourseTopic} from "@/types/course";
import Api from "@/api/Api";

export default function CourseDetail() {
    const router = useRouter();
    const { editMode } = useGlobalContext();
    const [topics, setTopics] = useState<CourseTopic[]>([]);
    
    const searchParams = useSearchParams();
    const [course, setCourse] = useState<Course | null>(null);
    const courseQuery = searchParams.get('course');
    
    const onClick = (topic: CourseTopic) => {
        router.push(`/auth/Content?topic=${topic?.id}`);
    }

    const getCourse = async (courseId: string) => {
        return await Api.course.fetchCourseById(courseId) as Promise<Course>;
    }
    
    const getTopics = async (courseId : string) => {
        const courseTopics = await Api.topic.fetchTopics();
        const result: CourseTopic[] = [];
        let elem: CourseTopic;
        courseTopics
            .filter((topic) => topic.course.id === courseId)
            .forEach((topic) => {
                elem = topic as CourseTopic;
                elem.courseId = topic.course.id;
                result.push(elem);
            });
        return result;
    }

    const amountOfTopics = topics.length;

    const hoursOfCourse = topics.length

    useEffect(() => {
        async function fetchData() {
            if (courseQuery) {
                const courseId = courseQuery as string;
                    const courseData = await getCourse(courseId);
                    if (courseData) {
                        setCourse(courseData);
                    }
                    if(courseData.id) {
                        const topicsData = await getTopics(courseData.id);
                        setTopics(topicsData);
                    }
            }
        }
        fetchData();
    }, [courseQuery]);

    return (
        <div className="min-h-screen bg-darkBlue text-white">
            <div className=" mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{course?.title}</h1>
                    <p className="text-zinc-400">{amountOfTopics} Tópicos | {hoursOfCourse}H</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.map((topic) => (
                        <CourseDetailCard key={topic.id} data={topic} onClick={() => onClick(topic)} editMode={editMode}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

