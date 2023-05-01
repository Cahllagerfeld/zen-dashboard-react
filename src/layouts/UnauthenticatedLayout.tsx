import { Outlet } from "react-router-dom";

function UnauthenticatedLayout() {
	return (
		<main>
			<Outlet />
		</main>
	);
}

export default UnauthenticatedLayout;
