"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import CreateCourse from "./CreateCourse"
import {useGlobalContext} from "@/context/GlobalContext";

export function CreateCourseModal() {
    const {openCreateCourse, setOpenCreateCourse} = useGlobalContext();

    return (
        <Dialog open={openCreateCourse} onOpenChange={setOpenCreateCourse} >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
            <DialogTitle>Criar Novo Curso</DialogTitle>
        </DialogHeader>
        <CreateCourse onSuccess={() => setOpenCreateCourse(false)} />
        </DialogContent>
    </Dialog>
)
}

