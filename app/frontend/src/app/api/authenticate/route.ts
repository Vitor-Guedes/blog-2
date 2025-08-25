import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const credentials = await request.json();

    const validated = process.env.MOCK_USER == credentials.email
        && process.env.MOCK_PASS == credentials.password;

    return NextResponse.json({
        successful: validated,
        message: validated ? "" : "Email ou senha inválido"
    }, {
        status: 200
    });
}