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
		<nav className="flex w-[104px] flex-col items-center border-r border-theme-border-moderate">
			<div className="flex h-9 w-full items-center justify-center border-b border-theme-border-moderate bg-theme-surface-primary px-4 py-2">
				<Link aria-label="link to home page" to="/">
					<Logo className="h-7 w-7" />
				</Link>
			</div>
			<div className="h-full w-full bg-theme-surface-tertiary">
				{/* <SidebarItem to="/" icon={<Home />} label="Home" /> */}

				{/* <div className="flex h-full w-full flex-col gap-3">
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
			</div> */}
				{/* <div className="flex w-full flex-col gap-2">
				<SidebarItem to="/settings" icon={<Settings />} label="Settings" />
			</div> */}
			</div>
		</nav>
	);
}

export default Sidebar;
