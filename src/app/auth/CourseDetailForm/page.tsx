"use client"

import { useEffect, useState } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import { Pencil, Save, Trash, ArrowRightFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Api from "@/api/Api";
import { v4 as uuidv4 } from 'uuid';
import type {Course, CourseTopic} from "@/types/course";
import {useGlobalContext} from "@/context/GlobalContext";

export default function CourseDetailForm() {
    const context = useGlobalContext();
    const searchParams = useSearchParams();
    const courseId = searchParams.get("course");
    const [course, setCourse] = useState<Course | null>(null);
    const [topics, setTopics] = useState<CourseTopic[]>([]);
    const [editingTopic, setEditingTopic] = useState<string | null>(null);
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [newTopic, setNewTopic] = useState({ title: "", description: "" });
    const router = useRouter();

    useEffect(() => {
        async function getCourseDetails() {
            if (courseId) {
                const courseData = await Api.course.fetchCourseById(courseId)
                setCourse(courseData)
                const topic = await Api.topic.getTopicsByCourseId(courseId);
                setTopics(topic)
            }
        }
        getCourseDetails()
    }, [courseId])

    const handleCourseUpdate = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        // await Api.course.update(courseId, course);
    };

    useEffect(() => {
        context.setTriggerSubmit(() => handleCourseUpdate);
    }, [context.setTriggerSubmit]);


    const handleTopicUpdate = async (topicId: string, updatedTopic: any) => {
        await Api.topic.updateTopic(topicId, updatedTopic)
        setTopics(topics.map((t) => (t.id === topicId ? { ...t, ...updatedTopic } : t)))
        setEditingTopic(null)
    }

    const handleTopicDelete = async (topicId: string) => {
        await Api.topic.deleteTopic(topicId)
        setTopics(topics.filter((t) => t.id !== topicId))
    }

    const goToContent = async (topicId: string) => {
        router.push(`/auth/Content?topic=${topicId}`);
    }

    const handleAddTopic = async () => {
        if (courseId && newTopic.title && context.user) {
            const topicBody: CourseTopic = {
                courseId: courseId,
                title: newTopic.title,
                description: newTopic.description,
                author: context.user.name,
                date: String(Date.now()),
                views: "0",
                subtitle: "",
                duration: "10 min",
                id: uuidv4()
            };
            const addedTopic = await Api.topic.createTopic(topicBody);

            setTopics([...topics, addedTopic])
            setNewTopic({ title: "", description:
                    "" })
            setIsAddingTopic(false)
        }
    }

    if (!course) return <div>Carregando...</div>

    return (
        <div className="space-y-8 min-h-screen text-white font-bold">
            <form onSubmit={handleCourseUpdate} className="space-y-4">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            Título do Curso
                        </label>
                        <Input className={"border-2 border-strongBlue"} id="title" value={course.title} onChange={(e) => setCourse({ ...course, title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                            Descrição
                        </label>
                        <Textarea
                            className={"border-2 border-strongBlue"}
                            id="description"
                            value={course.description}
                            onChange={(e) => setCourse({ ...course, description: e.target.value })}
                        />
                    </div>
                </div>

            <div>
                <h3 className="text-xl font-bold mb-4">Tópicos do Curso</h3>
                <Table className="">
                    <TableHeader className="border-strongBlue">
                        <TableRow className="border-strongBlue">
                            <TableHead className="border-strongBlue">Título</TableHead>
                            <TableHead className="border-strongBlue">Descrição</TableHead>
                            <TableHead className="border-strongBlue w-[100px]">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topics.map((topic) => (
                            <TableRow key={topic.id} className="border-strongBlue">
                                <TableCell className="border-strongBlue">
                                    {editingTopic === topic.id ? (
                                        <Input
                                            value={topic.title}
                                            onChange={(e) =>
                                                setTopics(topics.map((t) => (t.id === topic.id ? { ...t, title: e.target.value } : t)))
                                            }
                                        />
                                    ) : (
                                        topic.title
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingTopic === topic.id ? (
                                        <Input
                                            value={topic.description}
                                            onChange={(e) =>
                                                setTopics(topics.map((t) => (t.id === topic.id ? { ...t, description: e.target.value } : t)))
                                            }
                                        />
                                    ) : (
                                        topic.description
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editingTopic === topic.id ? (
                                        <Button size="sm" onClick={() => handleTopicUpdate(topic.id, topic)}>
                                            <Save className="w-4 h-4" />
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="ghost" onClick={() => setEditingTopic(topic.id)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" onClick={() => handleTopicDelete(topic.id)}>
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                            <Button size="sm" variant="ghost" onClick={() => goToContent(topic.id)}>
                                                <ArrowRightFromLine className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-4">
                <Button onClick={() => setIsAddingTopic(!isAddingTopic)} variant="outline">
                    {isAddingTopic ? "Cancelar" : "Adicionar Tópico"}
                </Button>

                {isAddingTopic && (
                    <div className="border-strongBlue mt-4 space-y-4 p-4 border rounded-lg">
                        <Input
                            className={"border-strongBlue text-white"}
                            placeholder="Título do tópico"
                            value={newTopic.title}
                            onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                        />
                        <Input
                            className={"border-strongBlue"}
                            placeholder="Descrição do tópico"
                            value={newTopic.description}
                            onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                        />
                        <Button onClick={handleAddTopic}>Salvar Tópico</Button>
                    </div>
                )}
            </div>
            </form>
        </div>
    )
}

