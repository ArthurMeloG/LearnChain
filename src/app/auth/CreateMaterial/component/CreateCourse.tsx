"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Hash, Clock, Eye, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const courseFormSchema = z.object({
    title: z.string().min(2, {
        message: "O título deve ter pelo menos 2 caracteres.",
    }),
    subtitle: z.string().min(10, {
        message: "A descrição deve ter pelo menos 10 caracteres.",
    }),
    description: z.string().min(20, {
        message: "A descrição detalhada deve ter pelo menos 20 caracteres.",
    }),
    tag: z.string().min(1, {
        message: "A tag é obrigatória.",
    }),
    duration: z.string().min(1, {
        message: "A duração é obrigatória.",
    }),
    releaseDate: z.date({
        required_error: "A data de lançamento é obrigatória.",
    }),
})

const topicSchema = z.object({
    title: z.string().min(2, "O título deve ter pelo menos 2 caracteres"),
    description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
    duration: z.string().min(1, "A duração é obrigatória"),
})

export default function CreateCourse() {
    const [step, setStep] = useState(1)
    const [topics, setTopics] = useState<
        Array<{
            title: string
            description: string
            duration: string
        }>
    >([])

    const courseForm = useForm<z.infer<typeof courseFormSchema>>({
        resolver: zodResolver(courseFormSchema),
        defaultValues: {
            title: "",
            subtitle: "",
            description: "",
            tag: "",
            duration: "",
        },
    })

    const topicForm = useForm<z.infer<typeof topicSchema>>({
        resolver: zodResolver(topicSchema),
        defaultValues: {
            title: "",
            description: "",
            duration: "",
        },
    })

    function onSubmitCourse(values: z.infer<typeof courseFormSchema>) {
        console.log("Course:", values)
        setStep(2)
    }

    function onSubmitTopic(values: z.infer<typeof topicSchema>) {
        setTopics([...topics, values])
        topicForm.reset()
    }

    function removeTopic(index: number) {
        setTopics(topics.filter((_, i) => i !== index))
    }

    function onFinish() {
        console.log("Course:", courseForm.getValues())
        console.log("Topics:", topics)
    }

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Criar Curso</h2>
                    <p className="text-muted-foreground">
                        {step === 1 ? "Passo 1: Informações Básicas" : "Passo 2: Tópicos do Curso"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${step === 1 ? "bg-primary" : "bg-muted"}`} />
                    <div className={`h-3 w-3 rounded-full ${step === 2 ? "bg-primary" : "bg-muted"}`} />
                </div>
            </div>

            {step === 1 ? (
                <Card>
                    <CardContent className="pt-6">
                        <Form {...courseForm}>
                            <form onSubmit={courseForm.handleSubmit(onSubmitCourse)} className="space-y-8">
                                <FormField
                                    control={courseForm.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Título</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Clean Code" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={courseForm.control}
                                    name="subtitle"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Subtítulo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Escreva código limpo e sustentável" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={courseForm.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descrição Detalhada</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Aprenda os princípios do Clean Code para escrever código mais legível..."
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={courseForm.control}
                                        name="tag"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tag</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Hash className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input placeholder="CodeMaster" className="pl-8" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={courseForm.control}
                                        name="duration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Duração</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input placeholder="40h" className="pl-8" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>Formato: 40h, 60min, etc.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={courseForm.control}
                                    name="releaseDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Data de Lançamento</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground",
                                                            )}
                                                        >
                                                            {field.value ? field.value.toLocaleDateString() : <span>Selecione uma data</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) => date < new Date()}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full">
                                    Próximo Passo
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            <Form {...topicForm}>
                                <form onSubmit={topicForm.handleSubmit(onSubmitTopic)} className="space-y-4">
                                    <FormField
                                        control={topicForm.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Título do Tópico</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Começando" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={topicForm.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Descrição do Tópico</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Instalação do ambiente e ambientação"
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={topicForm.control}
                                        name="duration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Duração do Tópico</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input placeholder="2h" className="pl-8" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Adicionar Tópico
                                    </Button>
                                </form>
                            </Form>

                            <div className="space-y-4">
                                <h3 className="font-medium">Tópicos Adicionados</h3>
                                {topics.map((topic, index) => (
                                    <Card key={index}>
                                        <CardContent className="p-4 flex justify-between items-start">
                                            <div className="space-y-1">
                                                <h4 className="font-medium">{topic.title}</h4>
                                                <p className="text-sm text-muted-foreground">{topic.description}</p>
                                                <p className="text-sm flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {topic.duration}
                                                </p>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => removeTopic(index)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
                                    Voltar
                                </Button>
                                <Button className="w-full" onClick={onFinish} disabled={topics.length === 0}>
                                    Finalizar
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

