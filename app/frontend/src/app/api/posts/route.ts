import fs  from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Post } from '@/services/posts/PostStrategy';
 
export async function GET() {
    const filepath = path.join(process.cwd(), "mocks", "posts.json");
    const content = fs.readFileSync(filepath, "utf-8");
    const posts: Post[] = JSON.parse(content);

    return NextResponse.json({
        data: posts,
        successful: true
    }, {
        status: 200
    });
}