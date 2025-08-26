'use client'

import { PostService } from "@/services/posts/PostService";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const postService = new PostService();
        const credentials = {
            email: email,
            password: password
        };
        const result = await postService.authenticate(credentials);
        
        if (result.successful || undefined) {
            return router.push('/admin/dashboard');
        }

        setError(result.message || "Error");
    }

    return (
        <div className="h-screen rounded-xl w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-white/10 pb-12">

                        <h2 className="border-b border-white/10  w-full text-3xl front-semibold text-center dart:text-white py-5">
                            Entrar
                        </h2>

                        <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-12">
                                <label htmlFor="email" 
                                    className="block text-sm/6 font-medium text-white">
                                        Email
                                </label>
                                <div className="mt-2">
                                    <input id="email" 
                                        type="text" 
                                        name="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" 
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-12">
                                <label htmlFor="password" 
                                    className="block text-sm/6 font-medium text-white">
                                        Senha
                                </label>
                                <div className="mt-2">
                                    <input id="password" 
                                        type="password" 
                                        name="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" 
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-12 mt-6 flex items-center justify-between gap-x-6">
                                <div className="flex justify-between gap-5">
                                    <a className="no-underline hover:underline" href="/cadastrar-se">Cadastrar-se</a>
                                    <a className="no-underline hover:underline" href="/recuperar-senha">Esqueci minha senha</a>
                                </div>
                                <button type="submit" className="rounded-md bg-gray-500 hover:bg-gray-800 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                    Save
                                </button>
                            </div>

                            <div className="sm:col-span-12">
                                {error && <p className="p-5 rounded-lg text-red-800 bg-red-100">{error}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}