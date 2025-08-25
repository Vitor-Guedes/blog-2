import { PostStrategy, Post, User, ApiResponse } from "./PostStrategy";

export class ApiBackendPostService implements PostStrategy {
    async getPosts(): Promise<Post[]> {
        return []
    }

    async getPostBySlug(slug: string): Promise<Post> {
        const user: User =  {
            name: "",
            email: ""
        };
        const post: Post = {
            title: '',
            slug: "",
            content: "",
            created_at: "",
            updated_at: "",
            user: user,
            tags: []
        };
        return post;
    }

    async getPostsByUser(user: User): Promise<Post[]> {
        return [];
    }

    async authenticate(credentials: object): Promise<ApiResponse> {
        return {
            successful: false,
            message: ""
        };
    }
}