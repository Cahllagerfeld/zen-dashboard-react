import { Route, Routes } from "react-router-dom";
import { routePaths } from "./route-paths";

function AppRoutes() {
	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/" element={<p className="text-2xl">App</p>} />
			<Route path={routePaths.login()} element={<div>Login</div>} />
		</Routes>
	);
}

export default AppRoutes;
