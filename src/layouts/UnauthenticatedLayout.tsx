import { Outlet } from "react-router-dom";

function UnauthenticatedLayout() {
	return (
		<main className="bg-theme-surface-secondary">
			<Outlet />
		</main>
	);
}

export default UnauthenticatedLayout;
