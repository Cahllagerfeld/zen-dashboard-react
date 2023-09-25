import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { StackComponent } from "@/types/stack-component";
import { apiPaths, createApiPath } from "@/data/api";
import { useTokenStore } from "@/state/stores";
import { FetchError } from "@/data/fetch-error";
import { performAuthenticatedRequest } from "../requests";

export type StackComponentDetailQuery = {
	id: string;
};

export function getStackComponentQueryDetailKey({ id }: StackComponentDetailQuery) {
	return ["components", id];
}

export async function fetchStackComponentDetail({ id }: StackComponentDetailQuery, token: string) {
	const url = createApiPath(apiPaths.components.detail(id));

	return performAuthenticatedRequest<StackComponent>({
		token,
		url,
		errorMessage: `Fetching the component ${id} failed`
	});
}

export function useStackComponentDetail(
	{ id }: StackComponentDetailQuery,
	options?: Omit<UseQueryOptions<StackComponent, FetchError>, "queryKey" | "queryFn">
) {
	const token = useTokenStore((state) => state.token);
	return useQuery<StackComponent, FetchError>({
		queryKey: getStackComponentQueryDetailKey({ id }),
		queryFn: () => fetchStackComponentDetail({ id }, token),
		...options
	});
}
