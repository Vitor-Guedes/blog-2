export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = await params

	return (
		<div className="border border-indigo-600 w-xl mx-auto p-2">
			<div className="row">
				<h1 className="text-3xl font-semibold"># Titulo</h1>
			</div>
	
			<div className="mt-4 container overflow-hidden">
				# Conteudo
			</div>
		</div>
	)
}