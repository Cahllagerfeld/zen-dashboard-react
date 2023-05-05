import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function AuthenticatedLayout() {
	return (
		<div>
			<Topbar />
			<Sidebar />
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default AuthenticatedLayout;
