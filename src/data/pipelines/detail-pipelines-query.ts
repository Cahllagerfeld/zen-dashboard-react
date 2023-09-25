import { apiPaths, createApiPath } from "@/data/api";
import { FetchError } from "@/data/fetch-error";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Pipeline, PipelineRunQueryParams } from "@/types/pipelines";
import { useTokenStore } from "@/state/stores";
import { performAuthenticatedRequest } from "@/data/requests";

export function getPipelineQueryKey(id: string) {
	return ["pipelines", id];
}

export function getPipelinesRunsQueryKey(id: string, params: PipelineRunQueryParams) {
	return ["pipelines", id, "runs", params];
}

export async function fetchPipelineDetail(id: string, token: string) {
	const url = createApiPath(apiPaths.pipelines.detail(id));

	return performAuthenticatedRequest<Pipeline>({
		url,
		token,
		errorMessage: `Fetching the pipeline ${id} failed`
	});
}

export function usePipelineDetail(
	id: string,
	options?: Omit<UseQueryOptions<Pipeline, FetchError>, "queryKey" | "queryFn">
) {
	const token = useTokenStore((state) => state.token);
	return useQuery<Pipeline, FetchError>({
		queryKey: getPipelineQueryKey(id),
		queryFn: () => fetchPipelineDetail(id, token),
		...options
	});
}
