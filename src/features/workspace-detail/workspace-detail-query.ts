import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "../../state/stores";
import { ErrorModel } from "../../types/error";

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
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/workspaces/${workspace}/statistics`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			if (!response.ok) throw new Error("Workspaces couldn't be fetched");
			return response.json();
		},
		...options
	});
}
