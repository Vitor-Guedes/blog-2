import fs from "fs";
import path from "path";
import { PostStrategy, Post, User } from "./PostStrategy";

export class MockPostService implements PostStrategy {
    async getPosts(): Promise<Post[]> {
        const filepath = path.join(process.cwd(), "mocks", "posts.json");
        const content = fs.readFileSync(filepath, "utf-8");

        const posts: Post[] = JSON.parse(content);
        return posts;
    }

    async getPostBySlug(slug: string): Promise<Post> {
        const filepath = path.join(process.cwd(), "mocks", "posts.json");
        const content = fs.readFileSync(filepath, "utf-8");

        const posts: Post[] = JSON.parse(content);
        const post = posts.find(post => post.slug === slug);

        if (! post) {
            throw new Error(`Publicação não encontrada`);
        }

        return post;
    }
}