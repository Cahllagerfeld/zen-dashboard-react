import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "@/state/stores";
import { StackComponentPage, StackComponentQueryParams } from "@/types/stack-component";
import { ErrorModel } from "@/types/error";
import { apiPaths, createApiPath } from "@/data/api";
import { objectToSearchParams } from "@/data/helper";
import { FetchError } from "@/data/fetch-error";

type StackComponentOverviewQuery = {
	workspace: string;
	params: StackComponentQueryParams;
};

export function getStackComponentQueryKey({ workspace, params }: StackComponentOverviewQuery) {
	return ["workspaces", workspace, "components", params];
}

export async function fetchStackComponents(
	{ params, workspace }: StackComponentOverviewQuery,
	token: string
) {
	const url = createApiPath(
		apiPaths.workspaces.components(workspace) + `?${objectToSearchParams(params)}`
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

export function useStackComponents(
	{ workspace, params }: StackComponentOverviewQuery,
	options?: Omit<UseQueryOptions<StackComponentPage, FetchError>, "queryKey" | "queryFn">
) {
	const token = useTokenStore((state) => state.token);
	return useQuery<StackComponentPage, FetchError>({
		queryKey: getStackComponentQueryKey({ workspace, params }),
		queryFn: () => fetchStackComponents({ workspace, params }, token),
		...options
	});
}
