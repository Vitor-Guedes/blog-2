import fs  from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Post } from './../../../../services/posts/PostStrategy';
 
export async function GET(
    request: Request,
    {params} : { params: { slug: string } }
) {
    const { slug } = params;
    const filepath = path.join(process.cwd(), "mocks", "posts.json");
    const content = fs.readFileSync(filepath, "utf-8");

    const posts: Post[] = JSON.parse(content);
    const post = posts.find(post => post.slug === slug);

    return NextResponse.json({
        data: post,
        successful: post?.title ? true : false
    });
}