import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "../../state/stores";
import { WorkspaceResponsePage } from "../../types/workspace";
import { apiPaths, createApiPath } from "../../data/api";
import { ErrorModel } from "../../types/error";
import { FetchError } from "../../data/fetch-error";

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
			if (!response.ok) {
				const errorData = (await response.json()) as ErrorModel;
				throw new FetchError({
					status: response.status,
					statusText: response.statusText,
					message: (errorData.detail as string) || "Fetching the workspaces failed"
				});
			}
			return response.json();
		},
		...options
	});
}
