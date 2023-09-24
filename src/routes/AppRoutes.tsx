import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { routePaths } from "./route-paths";
import UnauthenticatedLayout from "@/layouts/UnauthenticatedLayout";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout/AuthenticatedLayout";
import { useTokenStore } from "@/state/stores";
import NoMatch from "@/app/404/page";
// import WorkspaceDetail from "@/features/workspace-detail/WorkspaceDetail";
// import Login from "@/features/login/Login";

const Login = React.lazy(() => import("@/app/login/page"));
const Home = React.lazy(() => import("@/app/home/page"));
const WorkspaceDetail = React.lazy(() => import("@/app/workspaces/detail/page"));
const StackComponentsOverview = React.lazy(() => import("@/app/stack-components/overview/page"));
const StackComponentDetail = React.lazy(() => import("@/app/stack-components/detail/page"));
const PipelineOverview = React.lazy(() => import("@/app/pipelines/overview/page"));
const PipelineDetail = React.lazy(() => import("@/app/pipelines/detail/page"));

function AppRoutes() {
	const { token } = useTokenStore();
	const location = useLocation();
	return (
		<Suspense>
			<Routes>
				{/* Public Routes */}

				<Route element={<UnauthenticatedLayout />}>
					<Route path={routePaths.login()} element={<Login />} />
				</Route>

				{/* Protected Routes */}
				<Route
					element={
						token ? (
							<AuthenticatedLayout />
						) : (
							<Navigate
								to={
									routePaths.login() +
									`?${new URLSearchParams({ redirect: location.pathname }).toString()}`
								}
								replace
							/>
						)
					}
				>
					<Route path={routePaths.home()} element={<Home />} />
					<Route path={routePaths.workspaces.detail(":workspace")} element={<WorkspaceDetail />} />
					<Route
						path={routePaths.components.overview(":workspace")}
						element={<StackComponentsOverview />}
					/>
					<Route path={routePaths.components.detail(":id")} element={<StackComponentDetail />} />

					{/* Pipelines */}
					<Route
						path={routePaths.pipelines.overview(":workspace")}
						element={<PipelineOverview />}
					/>
					<Route path={routePaths.pipelines.detail(":id")} element={<PipelineDetail />} />
				</Route>

				{/* Fallback */}
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</Suspense>
	);
}

export default AppRoutes;
