import { Link } from "react-router-dom";
import { useWorkspaceStore } from "../../state/stores/workspace-store";
import { useWorkspaces } from "./workspace-query";
import { routePaths } from "../../routes/route-paths";

function Home() {
	const { setActiveWorkspace } = useWorkspaceStore();
	const { data } = useWorkspaces();

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
			{data?.items.map((item) => (
				<Link
					to={routePaths.workspaces.detail(item.name)}
					onClick={() => setActiveWorkspace(item.name)}
					className="flex w-full flex-col gap-4 rounded-2xl bg-white p-4"
				>
					<h2 className="text-xl">{item.name}</h2>
					{item.description && <p>{item.description}</p>}
					<time>{new Date(item.created).toLocaleDateString()}</time>
				</Link>
			))}
		</div>
	);
}

export default Home;
