import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "@/assets/logo.svg";
import { ReactComponent as Home } from "@/assets/home.svg";
import { ReactComponent as Workspace } from "@/assets/suitcase.svg";
import { ReactComponent as Settings } from "@/assets/settings.svg";
import { ReactComponent as Cube } from "@/assets/cube.svg";
import { ReactComponent as Pipeline } from "@/assets/pipeline.svg";
import SidebarItem from "./SidebarItem";
import { useWorkspaceStore } from "@/state/stores/workspace-store";
import { routePaths } from "@/routes/route-paths";

function Sidebar() {
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
	return (
		<nav className="flex w-40 flex-col items-center gap-8 bg-theme-background-offset pb-8 pt-4">
			<Link aria-label="link to home page" to="/">
				<Logo />
			</Link>
			<SidebarItem to="/" icon={<Home />} label="Home" />
			<div className="h-px w-[50%] bg-neutral-300"></div>
			<div className="flex h-full w-full flex-col gap-3">
				<SidebarItem
					end
					to={routePaths.workspaces.detail(activeWorkspace)}
					icon={<Workspace />}
					label="Workspaces"
				/>
				<div className="flex w-full flex-col gap-2">
					<SidebarItem
						to={routePaths.pipelines.overview(activeWorkspace)}
						icon={<Pipeline />}
						label="Pipelines"
					/>
				</div>
				<div className="flex w-full flex-col gap-2">
					<SidebarItem
						to={routePaths.components.overview(activeWorkspace)}
						icon={<Cube />}
						label="Components"
					/>
				</div>
			</div>
			<div className="h-px w-[50%] bg-neutral-300"></div>
			<div className="flex w-full flex-col gap-2">
				<SidebarItem to="/settings" icon={<Settings />} label="Settings" />
			</div>
		</nav>
	);
}

export default Sidebar;
