import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";

function Sidebar() {
	return (
		<nav className="flex w-40 flex-col items-center bg-theme-background-offset p-4">
			<Link aria-label="link to home page" to="/">
				<Logo />
			</Link>
		</nav>
	);
}

export default Sidebar;
