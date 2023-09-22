import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { BreadcrumbProvider } from "@/components/breadcrumb/BreadcrumbContext";

function AuthenticatedLayout() {
	return (
		<BreadcrumbProvider>
			<div className="float-none flex min-h-screen w-full bg-theme-surface-secondary">
				<Sidebar />
				<div className="my-0 h-screen shrink flex-grow basis-[0%] overflow-y-auto">
					<Topbar />
					<main>
						<Outlet />
					</main>
				</div>
			</div>
		</BreadcrumbProvider>
	);
}

export default AuthenticatedLayout;
