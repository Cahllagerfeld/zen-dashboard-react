import { Route, Routes } from "react-router-dom";
import { routePaths } from "./route-paths";
import UnauthenticatedLayout from "../layouts/UnauthenticatedLayout";

function AppRoutes() {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/" element={<p className="text-2xl">App</p>} />
			<Route element={<UnauthenticatedLayout />}>
				<Route path={routePaths.login()} element={<div>Login</div>} />
			</Route>
		</Routes>
	);
}

export default AppRoutes;
