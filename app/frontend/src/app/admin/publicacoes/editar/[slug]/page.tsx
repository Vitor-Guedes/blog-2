'use client';

import AdminMenu from "@/components/admin/Menu";
import { PostService } from "@/services/posts/PostService";
import { Post, User } from "@/services/posts/PostStrategy";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
    const params = useParams();
    const slug = params.slug as string ?? "";
    const postService = new PostService();
    const [post, setPost] = useState<Post>({title: "", slug: "", content: "", created_at: "", updated_at: ""});
    const [error, setError] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const router = useRouter();
    const user: User = {
        name: "",
        email: ""
    };

    useEffect(() => {
        postService.getPostBySlug(slug).then(_post => { setPost(_post) })
    }, [slug]);
    
    function slugify(slug: string): string {
        return slug
            .toLocaleLowerCase()
            .trim()
            .replace(/[^a-z0-9 -]/g, '') 
            .replace(/\s+/g, '-') 
            .replace(/^-+|-+$/g, ''); 
    }

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setPost((previous) => ({
            ...previous,
            title: title
        }));
        setPost((previous) => ({
            ...previous,
            slug: slugify(slugify(title))
        }));
    }

    const handleSubmit = async function (event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        const result = await postService.update(slug, post, user);
        
        if (result.successful) {
            return router.push('/admin/dashboard');
        }

        setError(result.message || "Error");

        return false;
    }

    return (
        <div className="flex flex-col w-4xl mx-auto mt-5">
            <AdminMenu url="#" title="Editar Publicação"/>

            <div className="w-full rounded-xl w-2xl mx-auto">

                <form onSubmit={handleSubmit}>

                    <div className="space-y-12">

                        <div className="">

                            <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-12">
                                    <label htmlFor="title" 
                                        className="block text-sm/6 font-medium text-white">
                                            Titulo
                                    </label>
                                    <div className="mt-2">
                                        <input id="title" 
                                            type="text" 
                                            name="title"
                                            value={post.title || ""}
                                            onChange={handleChangeTitle}
                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" 
                                        />
                                    </div>
                                </div>

                                 <div className="sm:col-span-12">
                                    <label htmlFor="slug" 
                                        className="block text-sm/6 font-medium text-white">
                                            Slug
                                    </label>
                                    <div className="mt-2">
                                        <input id="slug" 
                                            type="text" 
                                            name="slug"
                                            disabled
                                            value={post.slug || ""}
                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" 
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-12">
                                    <label htmlFor="content" 
                                        className="block text-sm/6 font-medium text-white">
                                            Conteúdo
                                    </label>
                                    <div className="mt-2">
                                        <textarea id="content" 
                                            name="content"
                                            value={post.content || ""}
                                            onChange={(event) => { setPost((previous) => ({...previous, content: event.target.value})) }}
                                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" 
                                        >
                                        </textarea>
                                    </div>
                                </div>

                                <div className="sm:col-span-12">
                                    
                                    <label htmlFor="published" className="inline-flex items-center me-5 cursor-pointer">
                                        <input type="checkbox" className="sr-only peer"  id="published" name="published" onChange={() => setIsChecked(!isChecked)} checked={isChecked}/>
                                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Publicar</span>
                                    </label>

                                </div>

                                <div className="sm:col-span-12 mt-6 flex items-center justify-between gap-x-6">
                                    <button type="submit" className="rounded-md bg-gray-500 hover:bg-gray-800 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                        Salvar
                                    </button>
                                    <a href="/admin/dashboard" className="rounded-md bg-gray-500 hover:bg-gray-800 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                        Voltar
                                    </a>
                                </div>

                                <div className="sm:col-span-12">
                                    {error && <p className="p-5 rounded-lg text-red-800 bg-red-100">{error}</p>}
                                </div>
                            </div>
                        </div>

                    </div>

                </form>

            </div>
        </div>
    );
}