import AdminMenu from "@/components/admin/Menu";
import { User } from "@/services/posts/PostStrategy";
import { PostService } from "@/services/posts/PostService";

export default async function Page() {
    const user: User = {
        name: "",
        email: ""
    }
    const postService = new PostService();
    const posts = await postService.getPostsByUser(user);

    return (
        <div className="w-4xl mx-auto">
            <AdminMenu />

            <div className="my-5 w-full">
                <a className="rounded-md bg-gray-500 hover:bg-gray-800 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" 
                    href="/admin/publicacoes/nova">
                    Nova publicação
                </a>
            </div>

            <div className="flex flex-col gap-3">
                {posts.map((post, index) => (
                    <div key={post.slug || index}>
                        <a className="no-underline hover:underline" href={`/admin/publicacoes/editar/${post.slug}`}> { post.title } </a>
                    </div>
                ))}
            </div>
        </div>
    )
}