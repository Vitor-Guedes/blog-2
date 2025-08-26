import fs  from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Post } from './../../../../services/posts/PostStrategy';

export async function POST(request: Request) {
    const filepath = path.join(process.cwd(), "mocks", "posts.json");
    const content = fs.readFileSync(filepath, "utf-8");
    const data = await request.json();
    
    const posts: Post[] = JSON.parse(content);
    const index = posts.findIndex(post => post.slug === data.slug);
    
    posts[index].title = data.payload.title;
    posts[index].slug = data.payload.slug;
    posts[index].content = data.payload.content;

    await fs.writeFileSync(filepath, JSON.stringify(posts));

    return NextResponse.json({
        data: "",
        successful: true
    }, {
        status: 200
    });
}