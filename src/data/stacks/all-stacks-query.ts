import { StackPage, StackQueryParams } from "@/types/stack";
import { apiPaths, createApiPath } from "@/data/api";
import { objectToSearchParams } from "@/data/helper";
import { FetchError } from "@/data/fetch-error";
import { useTokenStore } from "@/state/stores";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { performAuthenticatedRequest } from "../requests";

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

	return performAuthenticatedRequest<StackPage>({
		url,
		errorMessage: "Fetching the stacks failed",
		token
	});
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
2;
