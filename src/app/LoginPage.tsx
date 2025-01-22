"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
    login: (email: string, password: string) => Promise<void>;
};

export default function LoginPageView({ login }: Props) {
    const [loading, setLoading] = useState(false);

    const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await login(email, password);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-semibold text-white">Learn Chain.</h1>
                        <p className="text-zinc-400">Conectando mentes, transformando o futuro</p>
                    </div>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={onsubmit}>
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-400">Entre com o seu email</label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="user@email.com"
                                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-400">Digite a sua senha</label>
                            <Input
                                type="password"
                                name="password"
                                className="bg-zinc-800 border-zinc-700 text-white"
                                required
                            />
                        </div>
                        <Button
                            className="w-full bg-white hover:bg-blueWhite text-darkBlue font-bold flex items-center justify-center"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" size={20} />
                                    Carregando...
                                </>
                            ) : (
                                "Entrar"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
