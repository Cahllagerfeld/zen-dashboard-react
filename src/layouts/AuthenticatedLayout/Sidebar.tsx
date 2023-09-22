import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "@/assets/logo.svg";
import { ReactComponent as Home } from "@/assets/home.svg";
import { ReactComponent as Workspace } from "@/assets/suitcase.svg";
import { ReactComponent as Package } from "@/assets/package.svg";
import { ReactComponent as Dataflow } from "@/assets/dataflow.svg";
import SidebarItem from "./SidebarItem";
import { useWorkspaceStore } from "@/state/stores/workspace-store";
import { routePaths } from "@/routes/route-paths";

function Sidebar() {
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
	return (
		<nav className="flex w-[104px] flex-col items-center border-r border-theme-border-moderate">
			<div className="flex h-9 w-full items-center justify-center border-b border-theme-border-moderate bg-theme-surface-primary px-4 py-2">
				<Link aria-label="link to home page" to="/">
					<Logo className="h-7 w-7" />
				</Link>
			</div>
			<div className="h-full w-full bg-theme-surface-tertiary px-2 py-5 pt-2">
				<div className="flex h-full w-full flex-col items-center gap-1">
					<SidebarItem to="/" icon={<Home />} stroke={false} label="Home" />
					<SidebarItem
						end
						to={routePaths.workspaces.detail(activeWorkspace)}
						icon={<Workspace />}
						label="Workspaces"
					/>
					<div className="flex w-full flex-col items-center gap-2">
						<SidebarItem
							to={routePaths.pipelines.overview(activeWorkspace)}
							icon={<Dataflow />}
							stroke={false}
							label="Pipelines"
						/>
					</div>
					<div className="flex w-full flex-col items-center gap-2">
						<SidebarItem
							to={routePaths.components.overview(activeWorkspace)}
							icon={<Package />}
							stroke={false}
							label="Components"
						/>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Sidebar;
