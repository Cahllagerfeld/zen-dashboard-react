import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as Workspace } from "../../assets/suitcase.svg";
import SidebarItem from "./SidebarItem";
import { useWorkspaceStore } from "../../state/stores/workspace-store";

function Sidebar() {
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
	return (
		<nav className="flex w-40 flex-col items-center gap-8 bg-theme-background-offset py-4">
			<Link aria-label="link to home page" to="/">
				<Logo />
			</Link>
			<div className="flex w-full flex-col gap-2">
				<SidebarItem to="/" icon={<Home />} label="Home" />
				<SidebarItem
					end
					to={`workspaces/${activeWorkspace}`}
					icon={<Workspace />}
					label="Workspaces"
				/>
			</div>
		</nav>
	);
}

export default Sidebar;
