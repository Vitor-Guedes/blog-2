export default function notFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-2">
            <div className="w-xl">
                <h1 className="text-5xl font-bold text-white">404</h1>
            </div>
            <div className="w-xl">
                <span>Página não encontrada.</span>
            </div>
        </div>
    );
}