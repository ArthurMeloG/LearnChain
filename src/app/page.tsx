"use client";
import LoginPageView from "@/app/LoginPage";
import { useRouter } from "next/navigation";
import {useGlobalContext} from "@/context/GlobalContext";

export default function LoginPage() {
  const router = useRouter();
  const {user, setUser} = useGlobalContext();

  const login = async (email: string, password: string) => {
    try {
      console.log("LoginPageView", email, password);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (email === "admin@gmail.com" && password === "123456") {
        setUser({
          email: "admin@gmail.com",
          name: "Admin",
          tag: "#ArthurMelo"
        });
        router.push("/auth/CoursesPage");
      } else {
        console.log("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  };

  return (
      <LoginPageView login={login} />
  );
}
