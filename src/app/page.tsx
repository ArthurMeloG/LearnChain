"use client";
import LoginPageView from "@/app/LoginPage";
import { useRouter } from "next/navigation";
import {useGlobalContext} from "@/context/GlobalContext";

export default function LoginPage() {
  const router = useRouter();
  const {loginUser} = useGlobalContext();

  const login = async (email: string, password: string) => {


    try {
      const response = await loginUser(email, password);
      if(response) {
        router.push("/auth/CoursesPage");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  };

  return (
      <LoginPageView login={login} />
  );
}
