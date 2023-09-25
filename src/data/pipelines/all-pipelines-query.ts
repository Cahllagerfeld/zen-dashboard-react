import { PipelinePage, PipelineQueryParams } from "@/types/pipelines";
import { apiPaths, createApiPath } from "@/data/api";
import { objectToSearchParams } from "@/data/helper";
import { FetchError } from "@/data/fetch-error";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "@/state/stores";
import { performAuthenticatedRequest } from "@/data/requests";

type PipelineOverviewQuery = {
	workspace: string;
	params: PipelineQueryParams;
};

export function getPipelineQueryKey({ workspace, params }: PipelineOverviewQuery) {
	return ["workspaces", workspace, "pipelines", params];
}

export async function fetchPipelines({ workspace, params }: PipelineOverviewQuery, token: string) {
	const url = createApiPath(
		apiPaths.workspaces.pipelines(workspace) + `?${objectToSearchParams(params)}`
	);

	return performAuthenticatedRequest<PipelinePage>(
		{
			url,
			token,
			errorMessage: "Fetching the pipelines failed"
		},
		{ method: "GET" }
	);
}

export function usePipelines(
	{ workspace, params }: PipelineOverviewQuery,
	options?: Omit<UseQueryOptions<PipelinePage, FetchError>, "queryKey" | "queryFn">
) {
	const token = useTokenStore((state) => state.token);
	return useQuery<PipelinePage, FetchError>({
		queryKey: getPipelineQueryKey({ workspace, params }),
		queryFn: () => fetchPipelines({ workspace, params }, token),
		...options
	});
}
