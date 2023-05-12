import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "../../state/stores";
import { WorkspaceResponsePage } from "../../types/workspace";

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
			const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/workspaces`, {
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
