import { Link } from "react-router-dom";
import { useWorkspaceStore } from "../../state/stores/workspace-store";
import { useWorkspaces } from "./workspace-query";
import { routePaths } from "../../routes/route-paths";
import { determineDayTime } from "./utils";
import { useCurrentUser } from "../../data/user/active-user-query";

function Home() {
	const { setActiveWorkspace } = useWorkspaceStore();
	const { data: currentUser } = useCurrentUser();
	const { data } = useWorkspaces();

	return (
		<div className="flex flex-col gap-8">
			<div>
				<p className="text-[2rem] text-neutral-400">
					Good {determineDayTime()},{" "}
					<span className="bg-gradient-to-br from-primary to-primary-light bg-clip-text text-4xl font-medium text-transparent">
						{currentUser?.full_name}
					</span>
				</p>
				<p className="text-neutral-400">Please select one of the following workspaces</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
				{data?.items.map((item) => (
					<Link
						to={routePaths.workspaces.detail(item.name)}
						onClick={() => setActiveWorkspace(item.name)}
						className="flex w-full select-text flex-col gap-2 rounded-2xl bg-white p-4"
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
