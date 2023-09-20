import { PipelinePage, PipelineQueryParams } from "@/types/pipelines";
import { apiPaths, createApiPath } from "@/data/api";
import { objectToSearchParams } from "@/data/helper";
import { ErrorModel } from "@/types/error";
import { FetchError } from "@/data/fetch-error";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "@/state/stores";

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
			message: (errorData.detail as string) || "Fetching the components failed"
		});
	}
	return res.json();
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
