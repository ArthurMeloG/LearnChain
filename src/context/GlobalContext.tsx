"use client"
import {createContext, useState, ReactNode, useContext, useEffect} from "react";
import {Editor} from "@/lib/Editor";
import Api from "@/api/Api";
import {jwtDecode} from 'jwt-decode';
import {Course} from "@/types/course";
import {router} from "next/client";
import {useRouter} from "next/navigation";

interface GlobalContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loginUser: (email: string, password: string) => Promise<boolean>;
    logoutUser: () => void;
    handleSave: () => void;
    createCourse: () => void;
    openCreateCourse: boolean| undefined;
    setOpenCreateCourse: (openCreateCourse: boolean) => void;
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
    coursesSearch: Course[];
    setCoursesSearch: (courses: Course[]) => void;
    courses: Course[];
    setCourses: (courses: Course[]) => void;
    handleCourseUpdate: (e: React.FormEvent) => Promise<void> | undefined;
    triggerSubmit: () => void;
    setTriggerSubmit: (fn: () => void) => void;
}

interface User {
    tag: string;
    name: string;
    email: string;
    id: number;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [openCreateCourse, setOpenCreateCourse] = useState(false);

    const [editor,  setEditor] = useState<Editor | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [coursesSearch, setCoursesSearch] = useState<Course[]>([]);
    const [triggerSubmit, setTriggerSubmit] = useState<(() => void) | undefined>();


    const handleSave = async () => {
        editor?.saveContent();
    };

    const createCourse = () => {
        setOpenCreateCourse(!openCreateCourse);
    };

    const loginUser = async (email: string, password: string) => {
        try {
            const data = await Api.auth.login(email, password);
            const decoded  = jwtDecode(data.access_token);
            console.log(decoded);
            const usr : User = {
                name: decoded.userName,
                tag: decoded.userName,
                email: decoded.email,
                id: Number(decoded.sub)
            }
            setUser(usr);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    };

    const logoutUser = async () => {
        Api.auth.logout();
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded: User = jwtDecode(token);
            const usr : User = {
                name: decoded.userName,
                tag: decoded.userName,
                email: decoded.email,
                id: Number(decoded.sub)
            }
            setUser(usr);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!user && !token) router.push("/");
    }, [router, user]);

    return (
        <GlobalContext.Provider value={{
            user, setUser,
            handleSave, createCourse, openCreateCourse, setOpenCreateCourse,
            editor, setEditor,
            loginUser, logoutUser,
            coursesSearch, setCoursesSearch,
            courses, setCourses,
            triggerSubmit, setTriggerSubmit
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
