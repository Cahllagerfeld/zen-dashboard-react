import { useWorkspaces } from "./workspace-query";

function Home() {
	const { data } = useWorkspaces();

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
			{data?.items.map((item) => (
				<div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-4">
					<h2 className="text-xl">{item.name}</h2>
					{item.description && <p>{item.description}</p>}
					<time>{new Date(item.created).toLocaleDateString()}</time>
				</div>
			))}
		</div>
	);
}

export default Home;
