import fs  from 'fs';
import path from 'path';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const filepath = path.join(process.cwd(), "mocks", "posts.json");
    const content = fs.readFileSync(filepath, "utf-8");
    const post = await request.json();
    
    const posts = JSON.parse(content);
    posts.push(post);
    
    await fs.writeFileSync(filepath, JSON.stringify(posts));

    return NextResponse.json({
        data: "",
        successful: true
    }, {
        status: 200
    });
}