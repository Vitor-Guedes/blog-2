export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-2">
      <div className="w-xl">
        <h1 className="text-5xl font-bold text-white">Blog App</h1>
      </div>
      <div className="w-xl">
        <a className="no-underline hover:underline" href="/publicacoes">Publicações</a>
      </div>
    </div>
  );
}
