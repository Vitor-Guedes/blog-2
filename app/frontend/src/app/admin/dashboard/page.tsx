import { PostService } from "@/services/posts/PostService";
import { User } from "@/services/posts/PostStrategy";

export default async function Page() {
    const user: User = {
        name: "",
        email: ""
    }
    const postService = new PostService();
    const posts = await postService.getPostsByUser(user);

    return (
        <div className="h-screen w-2xl mx-auto">
            <div className="space-y-12 py-2 px-5">
                <h2 className="text-2xl">
                    Dashboard
                </h2>
            </div>
            <div className="mt-5 w-2xl flex p-2">
                <a className="rounded-md bg-gray-500 hover:bg-gray-800 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" 
                    href="/admin/publicacoes/nova">
                    Nova publicação
                </a>
            </div>

            <div className="flex flex-justify-center p-2">
                <ul>
                    {posts.map((post, index) => (
                        <li key={post.slug || index}>
                            <a className="no-underline hover:underline" href={`/admin/publicacoes/editar/${post.slug}`}> { post.title } </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}