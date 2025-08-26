'use client';

import { usePathname } from "next/navigation"

interface Link {
    url?: string,
    title?: string
}

export default function AdminMenu({ url = "", title = "" }: Link) {
    const pathname = usePathname();
    const isADashboardPage = pathname == '/admin/dashboard';

    return (
        <header>
            <div className="w-full mt-3 border-b border-gray-500 p-2">
                <div className="flex justify-between">
                    {isADashboardPage ? (
                        <h2 className="text-2xl">
                            Dashboard
                        </h2>
                    ) : (
                        <a href={url}>{title}</a>
                    )}
                    <a href="/admin/sair" className="no-underline hover:underline">
                        Sair
                    </a>
                </div>
            </div>
        </header>
    )
}