export type User = {
    name: string,
    email: string
}

export type Tag = {
    code: string,
    label: string
}

export type Post = {
    title: string,
    slug: string,
    content: string,
    created_at: string,
    updated_at: string,
    user: User,
    tags: Tag[]
}

export type ApiResponse = {
    successful: boolean,
    message?: string
}


export interface PostStrategy {
    getPosts(): Promise<Post[]>;

    getPostBySlug(slug: string): Promise<Post>;

    getPostsByUser(user: User): Promise<Post[]>;

    authenticate(credentials: object): Promise<ApiResponse>;
}