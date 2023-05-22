import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "../../state/stores";
import { WorkspaceResponsePage } from "../../types/workspace";
import { apiPaths, createApiPath } from "../../data/api";

export function getWorkspacesKey() {
	return ["workspaces"];
}

export function useWorkspaces(
	options?: Omit<UseQueryOptions<WorkspaceResponsePage>, "queryKey" | "queryFn">
) {
	const { token } = useTokenStore();
	return useQuery<WorkspaceResponsePage>({
		queryKey: getWorkspacesKey(),
		queryFn: async () => {
			const response = await fetch(createApiPath(apiPaths.workspaces.base), {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (!response.ok) throw new Error("Workspaces couldn't be fetched");
			return response.json();
		},
		...options
	});
}
