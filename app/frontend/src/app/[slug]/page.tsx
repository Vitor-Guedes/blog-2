import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import { PostService } from "@/services/posts/PostService"
import { notFound } from "next/navigation";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	try {
		const { slug } = await params
		const postService = new PostService();
		const post = await postService.getPostBySlug(slug);

		return (
			<div className="flex flex-col gap-5 w-4xl mx-auto">
				<Menu />
				<div className="rounded-xl shadown-md w-3xl mx-auto px-5 py-2 overflow-auto">
					{/* titulo da postagem */}
					<div className="flex flex-row">
						<h1 className="w-full text-3xl font-semibold text-center">{post.title}</h1>
					</div>

					<div className="container">
						<div className="text-sm flex justify-between">
							<span className="font-bold">{(post.user || {}).name || ""}</span>
							<span className="italic">{post.created_at}</span>
						</div>
					</div>
			
					{/* lista de tags relacionados a postagem */}
					<div className="w-full p-4">
						<div className="flex overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar gap-2 p-4">
							{((post.tags || [])).map((tag, index) => (
								<span className="bg-gray-800 text-white text-xs font-medium px-2 py-0.5 rounded-full"
									key={tag.code || index}
								>
									{tag.label}
								</span>
							))}
						</div>
					</div>

					<div className="mt-4 container overflow-y-auto">{post.content}</div>
				</div>
				<Footer />
			</div>
		)
	} catch(error) {
		return notFound();
	}
}