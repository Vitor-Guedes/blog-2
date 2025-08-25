import { PostStrategy, Post, ApiResponse, User } from "./PostStrategy";
import { MockPostService } from "./MockPostService";
import { ApiBackendPostService } from "./ApiBackendPostService";

// Criado com strategy pattern para adiantar o desenvolvimento mocado, e posteriormente alterar para uma api externa
export class PostService {
    private strategy: PostStrategy;

    constructor() {
        const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

        this.strategy = useMock
            ? new MockPostService
                : new ApiBackendPostService;
    }

    async getPosts(): Promise<Post[]> {
        return this.strategy.getPosts();
    }

    async getPostBySlug(slug: string): Promise<Post> {
        return this.strategy.getPostBySlug(slug);
    }

    async getPostsByUser(user: User): Promise<Post[]> {
        return this.strategy.getPostsByUser(user);
    }

    async authenticate(credentials: object): Promise<ApiResponse> {
        return this.strategy.authenticate(credentials);
    }
}