import { PostStrategy, Post, ApiResponse, User } from "./PostStrategy";

export class MockPostService implements PostStrategy {
    private baseurl: string;

    constructor () {
        this.baseurl = process.env.NEXT_PUBLIC_API_MOCK || '';
    }

    async getPosts(): Promise<Post[]> {
        const response = await fetch(this.baseurl + '/api/posts', {
            method: 'GET'
        });
        const result = await response.json();

        let posts: Post[] = [];

        if (result.successful) {
            posts = result.data;
        }

        return posts;
    }

    async getPostBySlug(slug: string): Promise<Post> {
        const response = await fetch(this.baseurl + `/api/posts/${slug}`, {
            method: 'GET'
        });
        const result = await response.json();

        if (! result.successful) {
            throw new Error(`Publicação não encontrada`);
        }
        
        return result.data;
    }

    async getPostsByUser(user: User): Promise<Post[]> {
        return this.getPosts();
    }

    async authenticate(credentials: object): Promise<ApiResponse> {
        const response = await fetch(this.baseurl + '/api/authenticate', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        return await response.json();
    }
}