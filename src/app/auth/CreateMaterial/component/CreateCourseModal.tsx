"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CreateCourse from "./CreateCourse"
import {useGlobalContext} from "@/context/GlobalContext";

interface CreateCourseModalProps {
    children: React.ReactNode
}

export function CreateCourseModal({ children }: CreateCourseModalProps) {
    const {openCreateCourse, setOpenCreateCourse} = useGlobalContext();

    return (
        <Dialog open={openCreateCourse} onOpenChange={setOpenCreateCourse} >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
            <DialogTitle>Criar Novo Curso</DialogTitle>
        </DialogHeader>
        <CreateCourse onSuccess={() => setOpen(false)} />
        </DialogContent>
    </Dialog>
)
}

