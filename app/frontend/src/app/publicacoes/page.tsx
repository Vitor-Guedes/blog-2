import { PostService } from "@/services/posts/PostService";

export default async function Page() {
    const postService = new PostService();
    const posts = await postService.getPosts();

    return (
        <div className="h-screen border-2 border-gray-600 rounded-xl shadown-md w-2xl mx-auto px-5 py-2 overflow-auto">
            <div className="flex flex-row">
				<h1 className="w-full text-3xl font-semibold text-center">Publicações</h1>
			</div>

            <div className="container">
                {posts.map((post, index) => (
                    <div key={post.slug || index} className="px-2 w-full">
                        <a href={post.slug}>{post.title}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}