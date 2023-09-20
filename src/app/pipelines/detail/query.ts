import { apiPaths, createApiPath } from "@/data/api";
import { FetchError } from "@/data/fetch-error";
import { ErrorModel } from "@/types/error";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { objectToSearchParams } from "@/data/helper";
import { Pipeline, PipelinePage, PipelineRunQueryParams } from "@/types/pipelines";
import { useTokenStore } from "@/state/stores";

export function getPipelineQueryKey(id: string) {
	return ["pipelines", id];
}

export type PipelineRuns = {
	id: string;
	params: PipelineRunQueryParams;
};

export function getPipelinesRunsQueryKey(id: string, params: PipelineRunQueryParams) {
	return ["pipelines", id, "runs", params];
}

export async function fetchPipelineDetail(id: string, token: string) {
	const url = createApiPath(apiPaths.pipelines.detail(id));

	const res = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (!res.ok) {
		const errorData = (await res.json()) as ErrorModel;
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: (errorData.detail as string) || `Fetching the pipeline ${id} failed`
		});
	}
	return res.json();
}

export async function fetchPipelineRuns({ id, params }: PipelineRuns, token: string) {
	const url = createApiPath(apiPaths.pipelines.runs(id)) + `?${objectToSearchParams(params)}`;

	const res = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (!res.ok) {
		const errorData = (await res.json()) as ErrorModel;
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: (errorData.detail as string) || `Fetching runs for pipeline ${id} failed`
		});
	}
	return res.json();
}

export function usePipelineRuns(
	{ id, params }: PipelineRuns,
	options?: Omit<UseQueryOptions<PipelinePage, FetchError>, "queryKey" | "queryFn">
) {
	const token = useTokenStore((state) => state.token);
	return useQuery<PipelinePage, FetchError>({
		queryKey: getPipelinesRunsQueryKey(id, params),
		queryFn: () => fetchPipelineRuns({ id, params }, token),
		...options
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
