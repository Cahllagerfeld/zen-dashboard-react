import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "@/state/stores";
import { ErrorModel } from "@/types/error";
import { apiPaths, createApiPath } from "@/data/api";
import { FetchError } from "@/data/fetch-error";

export function getWorkspaceStatisticsKey(workspace: string) {
	return ["workspaces", workspace, "statistics"];
}

export function useWorkspaceStatisticsQuery(
	{ workspace }: { workspace: string },
	options?: Omit<UseQueryOptions<Record<string, string>, FetchError>, "queryKey" | "queryFn">
) {
	const { token } = useTokenStore();
	return useQuery<Record<string, string>, FetchError>({
		queryKey: getWorkspaceStatisticsKey(workspace),
		queryFn: async () => {
			const response = await fetch(createApiPath(apiPaths.workspaces.statistics(workspace)), {
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
					message:
						(errorData.detail as string) ||
						`Fetching the statistics for workspace ${workspace} failed`
				});
			}
			return response.json();
		},
		...options
	});
}
