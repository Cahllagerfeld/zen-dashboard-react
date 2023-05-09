import { Link } from "react-router-dom";
import { useWorkspaceStore } from "../../state/stores/workspace-store";
import { useWorkspaces } from "./workspace-query";
import { routePaths } from "../../routes/route-paths";
import { useCurrentUser } from "../../data/user/active-user-query";
import Welcome from "../../components/Welcome";

function Home() {
	const { setActiveWorkspace } = useWorkspaceStore();
	const { data: currentUser } = useCurrentUser();
	const { data } = useWorkspaces();

	return (
		<div className="flex flex-col gap-8">
			<div>
				<Welcome name={currentUser?.full_name || ""} />
				<p className="text-neutral-400">Please select one of the following workspaces</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
				{data?.items.map((item) => (
					<Link
						to={routePaths.workspaces.detail(item.name)}
						onClick={() => setActiveWorkspace(item.name)}
						className="flex w-full select-text flex-col gap-2 rounded-2xl bg-white from-primary to-primary-light p-4 hover:bg-primary hover:bg-gradient-to-br hover:text-white"
					>
						<h2 className="text-xl">{item.name}</h2>
						{item.description ? <p>{item.description}</p> : <p>No description provided</p>}
						<time>{new Date(item.created).toLocaleDateString()}</time>
					</Link>
				))}
			</div>
		</div>
	);
}

export default Home;
