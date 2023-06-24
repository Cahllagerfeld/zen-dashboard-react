import { StackPage, StackQueryParams } from "@/types/stack";
import { apiPaths, createApiPath } from "@/data/api";
import { objectToSearchParams } from "@/data/helper";
import { ErrorModel } from "@/types/error";
import { FetchError } from "@/data/fetch-error";
import { useTokenStore } from "@/state/stores";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type StackQueryOverview = {
	workspace: string;
	params: StackQueryParams;
};

export function getStackQueryKey({ workspace, params }: StackQueryOverview) {
	return ["workspaces", workspace, "stacks", params];
}

export async function fetchStacks({ params, workspace }: StackQueryOverview, token: string) {
	const url = createApiPath(
		apiPaths.workspaces.stacks(workspace) + `?${objectToSearchParams(params)}`
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
			message: (errorData.detail as string) || "Fetching the stacks failed"
		});
	}
	return res.json();
}

export function useStacks(
	{ workspace, params }: StackQueryOverview,
	options?: Omit<UseQueryOptions<StackPage, FetchError>, "queryKey" | "queryFn">
) {
	const token = useTokenStore((state) => state.token);
	return useQuery<StackPage, FetchError>({
		queryKey: getStackQueryKey({ workspace, params }),
		queryFn: () => fetchStacks({ workspace, params }, token),
		...options
	});
}
