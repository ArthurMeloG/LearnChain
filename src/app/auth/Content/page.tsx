"use client"

import {useGlobalContext} from "@/context/GlobalContext";
import {CourseContent, CourseTopic} from "@/types/course";
import { ContentTable} from "@/app/auth/Content/components/ContentTable";
import {useEffect, useState} from "react";
import Api from "@/api/Api";
import {useSearchParams} from "next/navigation";

export default function ContentPage() {
    const [courseTopic, setCourseTopic] = useState<CourseTopic>();
    const [content, setContent] = useState<CourseContent[]>([]);
    const searchParams = useSearchParams();
    const topicQuery = searchParams.get('topic');

    const getContent = async (topicId : string) => {
        const courseContent = await Api.content.fetchContents();
        const result: CourseContent[] = [];
        let elem: CourseContent;
        courseContent
            .filter((content) => content.topic.id === topicId)
            .forEach((content) => {
                elem = content as CourseContent;
                elem.topicId = content.topic.id;
                result.push(elem);
            });
        return result;
    }

    const getTopic = async (topicId : string) => {
        return await Api.topic.fetchTopicById(topicId as string) as Promise<CourseTopic>;
    }

    useEffect(() => {
        async function fetchData() {
            if(topicQuery) {
                const tp = await getTopic(topicQuery);
                console.log(tp)
                setCourseTopic(tp);
                if(tp) {
                    const topicsData = await getContent(tp.id);
                    setContent(topicsData);
                    console.log(topicsData)
                }
            }

        }
        fetchData();
    }, [topicQuery]);

    return (
        <div className="container min-h-screen text-white">
            <div className="space-y-4">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{courseTopic?.title}</h1>
                    <p className="text-zinc-400">{content.length} Conteúdos</p>
                </header>
                <ContentTable contents={content} />
            </div>
        </div>
    )
}

