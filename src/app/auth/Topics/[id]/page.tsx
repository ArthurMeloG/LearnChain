export default function TopicPage({ params }: { params: { id: string } }) {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold">Tópico {params.id}</h1>
        </div>
    )
}

