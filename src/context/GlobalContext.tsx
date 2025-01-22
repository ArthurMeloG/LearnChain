"use client"
import {createContext, useState, ReactNode, useContext, useRef} from "react";
import EditorJS from "@editorjs/editorjs";

interface GlobalContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    authenticated: boolean | null;
    setAuthenticated: (authenticated: boolean | null) => void;
    editorRef: React.MutableRefObject<EditorJS | null>;
    handleSave: () => void;
    createCourse: () => void;
    openCreateCourse: boolean| undefined;
    setOpenCreateCourse: (openCreateCourse: boolean) => void;
}

interface User {
    tag: string;
    name: string;
    email: string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    const editorRef = useRef<EditorJS | null>(null);
    const [openCreateCourse, setOpenCreateCourse] = useState(false);

    const handleSave = async () => {
        const savedData = await editorRef.current.save();
        console.log("Editor data:", savedData);
        if (onSave) {
            onSave(savedData);
        }
    };

    const createCourse = () => {
        setOpenCreateCourse(!openCreateCourse);
    }

    return (
        <GlobalContext.Provider value={{
            user, setUser,
            authenticated, setAuthenticated,
            editorRef, handleSave, createCourse,
            openCreateCourse, setOpenCreateCourse
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext deve ser usado dentro de um GlobalProvider");
    }
    return context;
};
