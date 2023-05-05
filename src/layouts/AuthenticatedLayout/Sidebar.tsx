import { ReactComponent as Logo } from "../../assets/logo.svg";

function Sidebar() {
	return (
		<nav className="flex w-40 flex-col items-center bg-theme-background-offset p-4">
			<Logo />
		</nav>
	);
}

export default Sidebar;
