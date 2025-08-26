'use client';

import { usePathname } from "next/navigation"

export default function Menu() {
    const pathname = usePathname();
    const isAllPublishPage = pathname == '/publicacoes';
    const isAdminPage = pathname == '/admin';

    return (
        <nav className="border-b border-gray-500 w-full p-2">
            <div className="flex justify-between">
                {! isAllPublishPage ? (
                    <a className="no-underline hover:underline text-sm font-semibold" 
                        href="/publicacoes">
                        Publicações
                    </a>
                ) : (
                    <a className="no-underline hover:underline text-sm font-semibold" 
                        href="/">
                        Inicio
                    </a>
                )}
                
                {! isAdminPage ? (
                    <a className="no-underline hover:underline text-sm font-semibold" 
                        href="/admin">
                        Login
                    </a>
                ) : (<></>)}
            </div>
        </nav>
    )
};
