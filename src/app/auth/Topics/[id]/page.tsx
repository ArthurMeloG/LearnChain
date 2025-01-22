"use client";

import { useEffect, useRef, use } from "react";
import EditorJS from "@editorjs/editorjs";

// Atualizado para usar `use()` do React
export default function TopicPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); // Unwrap `params` corretamente
    const editorRef = useRef<EditorJS | null>(null);

    useEffect(() => {
        const loadEditor = async () => {
            if (!editorRef.current) {
                const Header = (await import("@editorjs/header")).default;
                const List = (await import("@editorjs/list")).default;
                const Table = (await import("@editorjs/table")).default;

                editorRef.current = new EditorJS({
                    holder: "editorjs",
                    tools: {
                        header: Header,
                        list: List,
                        table: Table,
                    },
                });
            }
        };

        loadEditor();

        return () => {
            editorRef.current?.destroy();
            editorRef.current = null;
        };
    }, []);

    const handleSave = async () => {
        if (editorRef.current) {
            try {
                const savedData = await editorRef.current.save();
                console.log("Dados salvos:", savedData);
                // Aqui você pode salvar os dados no seu banco de dados ou backend
            } catch (error) {
                console.error("Erro ao salvar o conteúdo:", error);
            }
        }
    };

    return (
        <div className="">
            <h1 className="text-2xl font-bold text-white">Tópico {id}</h1>
            <div id="editorjs" className="min-h-screen border border-indigo-900/50 rounded-lg bg-white" />
        </div>
    );
}
