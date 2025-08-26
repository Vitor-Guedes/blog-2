'use client'

import Menu from "@/components/Menu"

export default function Home() {
    return (
        <div>
            <Menu />
            <div className="h-screen flex flex-col items-center justify-center gap-2">
                <div className="w-xl">
                    <h1 className="text-5xl font-bold text-white"># Carroseul com ultimas 5 publicações</h1>
                </div>
            </div>
        </div>
    );
}
