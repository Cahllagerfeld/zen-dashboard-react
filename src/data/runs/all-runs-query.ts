import { RunQueryParams, RunsPage } from "@/types/runs";
import { apiPaths, createApiPath } from "../api";
import { objectToSearchParams } from "../helper";
import { ErrorModel } from "@/types/error";
import { FetchError } from "../fetch-error";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "@/state/stores";

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

	const res = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (!res.ok) {
		const errorData: ErrorModel = await res.json();
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: (errorData.detail as string) || "Fetching Runs failed"
		});
	}
	return res.json();
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
