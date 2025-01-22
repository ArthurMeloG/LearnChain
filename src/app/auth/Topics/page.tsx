"use client"
import { TopicsTable } from "./components/TopicsTable"

export default function TopicsPage() {
    return (
        <div className="container min-h-screen">
            <div className="space-y-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Clean Code</h1>
                    <p className="text-muted-foreground">3 Tópicos | 3H</p>
                </div>
                <TopicsTable />
            </div>
        </div>
    )
}

