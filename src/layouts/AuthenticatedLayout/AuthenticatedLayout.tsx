import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function AuthenticatedLayout() {
	return (
		<div className="float-none flex w-full">
			<Sidebar />
			<div className="my-0 h-screen shrink flex-grow basis-[0%] overflow-y-auto">
				<Topbar />
				<main className="px-4 lg:px-8 lg:py-4">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default AuthenticatedLayout;
