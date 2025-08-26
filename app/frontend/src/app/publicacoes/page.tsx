import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import { PostService } from "@/services/posts/PostService";

export default async function Page() {
    const postService = new PostService();
    const posts = await postService.getPosts();

    return (
        <div className="flex flex-col gap-5 w-4xl mx-auto">
            <div className="">
                <Menu />
            </div>
            <div className="flex">
                <div className="mt-5 rounded-xl shadown-md w-full px-5 py-2 overflow-auto">
                    <div className="flex flex-row mb-5">
                        <h1 className="w-full text-3xl font-semibold text-center">
                            Publicações
                        </h1>
                    </div>

                    <div className="flex flex-col gap-3">
                        {posts.map((post, index) => (
                            <div key={post.slug || index} className="px-2 w-full">
                                <a className="no-underline hover:underline text-sm font-semibold" href={post.slug}>{post.title}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}