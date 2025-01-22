"use client"
import { TopicsTable } from "./components/TopicsTable"

export default function TopicsPage() {
    return (
        <div className="container min-h-screen text-white">
            <div className="space-y-4">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Clean Code</h1>
                    <p className="text-zinc-400">Tópicos | H</p>
                </header>
                <TopicsTable/>
            </div>
        </div>
    )
}

