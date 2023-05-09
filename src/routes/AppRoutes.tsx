import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routePaths } from "./route-paths";
import UnauthenticatedLayout from "../layouts/UnauthenticatedLayout";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout/AuthenticatedLayout";
import { useTokenStore } from "../state/stores";
// import Login from "../features/login/Login";

const Login = React.lazy(() => import("../features/login/Login"));
const Home = React.lazy(() => import("../features/home/Home"));

function AppRoutes() {
	const { token } = useTokenStore();
	return (
		<Suspense>
			<Routes>
				{/* Public Routes */}

				<Route element={<UnauthenticatedLayout />}>
					<Route path={routePaths.login()} element={<Login />} />
				</Route>

				{/* Protected Routes */}
				<Route
					element={token ? <AuthenticatedLayout /> : <Navigate to={routePaths.login()} replace />}
				>
					<Route path={routePaths.home()} element={<Home />} />
					<Route
						path={routePaths.workspaces.detail(":workspace")}
						element={<div>Workspace Detail</div>}
					/>
				</Route>

				{/* Fallback */}
				<Route path="*" element={<h1 className="text-base">404</h1>} />
			</Routes>
		</Suspense>
	);
}

export default AppRoutes;
