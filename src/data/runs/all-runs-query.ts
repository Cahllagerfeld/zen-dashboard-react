import { RunQueryParams, RunsPage } from "@/types/runs";
import { apiPaths, createApiPath } from "../api";
import { objectToSearchParams } from "../helper";
import { FetchError } from "../fetch-error";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "@/state/stores";
import { performAuthenticatedRequest } from "../requests";

type RunQueryConfig = {
	workspace: string;
	params: RunQueryParams;
};

export function getRunKey({ workspace, params }: RunQueryConfig) {
	return ["workspaces", workspace, "runs", params];
}

export async function fetchRuns({ workspace, params }: RunQueryConfig, token: string) {
	const url = createApiPath(
		apiPaths.workspaces.runs(workspace) + `?${objectToSearchParams(params)}`
	);

	return performAuthenticatedRequest<RunsPage>({
		token,
		url,
		errorMessage: "Fetching Runs failed"
	});
}

export function useRuns(
	{ workspace, params }: RunQueryConfig,
	options?: Omit<UseQueryOptions<RunsPage, FetchError>, "queryKey" | "queryFn">
) {
	const token = useTokenStore((state) => state.token);
	return useQuery<RunsPage, FetchError>({
		queryKey: getRunKey({ workspace, params }),
		queryFn: () => fetchRuns({ workspace, params }, token),
		...options
	});
}
