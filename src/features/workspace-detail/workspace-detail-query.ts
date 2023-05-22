import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "../../state/stores";
import { ErrorModel } from "../../types/error";
import { apiPaths, createApiPath } from "../../data/api";

export function getWorkspaceStatisticsKey(workspace: string) {
	return ["workspaces", workspace, "statistics"];
}

export function useWorkspaceStatisticsQuery(
	{ workspace }: { workspace: string },
	options?: Omit<UseQueryOptions<Record<string, string>, ErrorModel>, "queryKey" | "queryFn">
) {
	const { token } = useTokenStore();
	return useQuery<Record<string, string>, ErrorModel>({
		queryKey: getWorkspaceStatisticsKey(workspace),
		queryFn: async () => {
			const response = await fetch(createApiPath(apiPaths.workspaces.statistics(workspace)), {
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
