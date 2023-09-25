import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "@/state/stores";
import { WorkspaceResponsePage } from "@/types/workspace";
import { apiPaths, createApiPath } from "@/data/api";
import { performAuthenticatedRequest } from "@/data/requests";

export function getWorkspacesKey() {
	return ["workspaces"];
}

export async function fetchWorkspaces(token: string) {
	const url = createApiPath(apiPaths.workspaces.base);
	return performAuthenticatedRequest<WorkspaceResponsePage>(
		{
			errorMessage: "Fetching the workspaces failed",
			token,
			url
		},
		{
			method: "GET"
		}
	);
}

export function useWorkspaces(
	options?: Omit<UseQueryOptions<WorkspaceResponsePage>, "queryKey" | "queryFn">
) {
	const { token } = useTokenStore();
	return useQuery<WorkspaceResponsePage>({
		queryKey: getWorkspacesKey(),
		queryFn: async () => fetchWorkspaces(token),
		...options
	});
}
