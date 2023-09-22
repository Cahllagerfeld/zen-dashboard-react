import { Link } from "react-router-dom";
import { useWorkspaceStore } from "@/state/stores/workspace-store";
import { useWorkspaces } from "../../data/workspaces/all-workspaces-query";
import { routePaths } from "@/routes/route-paths";
import { useCurrentUser } from "@/data/users/active-user-query";
import Welcome from "@/components/Welcome";
import Skeleton from "react-loading-skeleton";
import WorkspaceSkeletonCard from "./WorkspaceSkeletonCard";
import { convertUTC } from "@/lib/dates";
import BasePage from "../../components/common/BasePage";

function Home() {
	const { setActiveWorkspace } = useWorkspaceStore();
	const { data: currentUser } = useCurrentUser();
	const { data } = useWorkspaces();

	return (
		<BasePage>
			<div className="flex flex-col gap-8">
				<div>
					{currentUser ? (
						<Welcome name={currentUser.full_name || currentUser.name || ""} />
					) : (
						<Skeleton className="rounded-xl h-12 w-1/4" />
					)}
					<p className="text-neutral-400">Please select one of the following workspaces</p>
				</div>
				{data ? (
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
						{data?.items.map((item, index) => (
							<Link
								key={index}
								to={routePaths.workspaces.detail(item.name)}
								onClick={() => setActiveWorkspace(item.name)}
								className="from-primary to-primary-light hover:bg-primary flex w-full select-text flex-col gap-2 rounded-md bg-theme-surface-primary p-4"
							>
								<h2 className="text-xl">{item.name}</h2>
								{item.description ? <p>{item.description}</p> : <p>No description provided</p>}
								<time>{convertUTC(item.created)}</time>
							</Link>
						))}
					</div>
				) : (
					<WorkspaceSkeletonCard />
				)}
			</div>
		</BasePage>
	);
}

export default Home;
