import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routePaths } from "./route-paths";
import UnauthenticatedLayout from "../layouts/UnauthenticatedLayout";
import { useAtom } from "jotai";
import { tokenAtom } from "../state/atoms";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout/AuthenticatedLayout";
// import Login from "../features/login/Login";

const Login = React.lazy(() => import("../features/login/Login"));

function AppRoutes() {
	const [token] = useAtom(tokenAtom);
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
					<Route path="/" element={<p className="text-2xl">App</p>} />
				</Route>
			</Routes>
		</Suspense>
	);
}

export default AppRoutes;
