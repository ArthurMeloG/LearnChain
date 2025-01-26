"use client";

import {useEffect, use, useRef, useState} from "react";
import EditorJS from "@editorjs/editorjs";
import { useGlobalContext } from "@/context/GlobalContext";
import Api from "@/api/Api";
import { CourseContent } from "@/types/course";
import {Editor} from "@/lib/Editor";

export default function ContentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { setEditor } = useGlobalContext();
    const [courseContent, setCourseContent] = useState<CourseContent>([]);
    const editorRef = useRef<EditorJS | null>(null);

    const getContent = async (contentId : string) => {
        return await Api.content.fetchContentById(contentId as string) as Promise<CourseContent>;
    }
    const getContentData = async (contentId : string) => {
        const contentsData =  await Api.contentData.fetchContentData();
        return contentsData.find(item => item.content.id === contentId);
    }

    useEffect(() => {
        let isMounted = true;

        const loadEditor = async (contentData: any | null) => {
            if (editorRef.current) {
                console.log("Editor já inicializado.");
                return;
            }

            const Header = (await import("@editorjs/header")).default;
            const List = (await import("@editorjs/list")).default;
            const Table = (await import("@editorjs/table")).default;
            const ImageTool = (await import("@editorjs/image")).default;
            const Embed = (await import("@editorjs/embed")).default;

            if (isMounted) {
                const editor = new EditorJS({
                    holder: "editorjs",
                    tools: {
                        header: Header,
                        list: List,
                        table: Table,
                        image: {
                            class: ImageTool,
                            config: {
                                endpoints: {
                                    byFile: "/api/upload",
                                    byUrl: "/api/fetchImage"
                                },
                                uploader: {
                                    uploadByFile: async (file: File) => {
                                        console.log("Uploading image:", file);
                                        return {
                                            success: 1,
                                            file: {
                                                url: URL.createObjectURL(file),
                                            },
                                        };
                                    },
                                    uploadByUrl: async (url: string) => {
                                        return {
                                            success: 1,
                                            file: {
                                                url,
                                            },
                                        };
                                    },
                                },
                            },
                        },
                        embed: {
                            class: Embed,
                            config: {
                                services: {
                                    youtube: true,
                                    vimeo: true,
                                    twitter: true,
                                },
                            },
                        },
                    },
                    data: contentData ? contentData.data : undefined,
                    readOnly: false,
                });
                editorRef.current = editor;
                return editor;
            }
        };

        const fetchData = async () => {
            if (editorRef.current) return;

            const content = await getContent(id);

            if (content) {
                setCourseContent(content);
            }
            
            const contentData = await getContentData(id)
            
            const editor = await loadEditor(contentData);
            if(editor)
            setEditor(new Editor(editor, content, content.topic));
        };

        fetchData();

        return () => {
            isMounted = false;
            editorRef.current?.destroy();
            editorRef.current = null;
        };
    }, [id, setEditor]);

    return (
        <div className="">
            <h1 className="text-2xl font-bold text-white">Tópico {courseContent?.title}</h1>
            <div id="editorjs" className="w-full min-h-screen border border-indigo-900/50 rounded-lg bg-white"/>
        </div>
    );
}
