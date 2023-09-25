import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "@/state/stores";
import { apiPaths, createApiPath } from "@/data/api";
import { FetchError } from "@/data/fetch-error";
import { performAuthenticatedRequest } from "@/data/requests";
import { Workspace } from "@/types/workspace";

export function getWorkspaceStatisticsKey(workspace: string) {
	return ["workspaces", workspace, "statistics"];
}

export async function fetchWorkspaceDetail(workspace: string, token: string) {
	const url = createApiPath(apiPaths.workspaces.statistics(workspace));
	return performAuthenticatedRequest<Workspace>({
		errorMessage: `Fetching the statistics for workspace ${workspace} failed`,
		token,
		url
	});
}

export function useWorkspaceStatisticsQuery(
	{ workspace }: { workspace: string },
	options?: Omit<UseQueryOptions<Record<string, string>, FetchError>, "queryKey" | "queryFn">
) {
	const { token } = useTokenStore();
	return useQuery<Record<string, string>, FetchError>({
		queryKey: getWorkspaceStatisticsKey(workspace),
		queryFn: async () => fetchWorkspaceDetail(workspace, token),
		...options
	});
}
