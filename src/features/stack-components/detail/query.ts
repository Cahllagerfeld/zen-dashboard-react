import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { StackComponent } from "../../../types/stack-component";
import { ErrorModel } from "../../../types/error";
import { apiPaths, createApiPath } from "../../../data/api";
import { useTokenStore } from "../../../state/stores";
import { FetchError } from "../../../data/fetch-error";

export type StackComponentDetailQuery = {
	id: string;
};

export function getStackComponentQueryDetailKey({ id }: StackComponentDetailQuery) {
	return ["components", id];
}

export async function fetchStackComponentDetail({ id }: StackComponentDetailQuery, token: string) {
	const url = createApiPath(apiPaths.components.detail(id));
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
			message: errorData?.detail[0] || `Fetching the component ${id} failed`
		});
	}
	return res.json();
}

export function useStackComponentDetail(
	{ id }: StackComponentDetailQuery,
	options?: Omit<UseQueryOptions<StackComponent, ErrorModel>, "queryKey" | "queryFn">
) {
	const token = useTokenStore((state) => state.token);
	return useQuery<StackComponent, ErrorModel>({
		queryKey: getStackComponentQueryDetailKey({ id }),
		queryFn: () => fetchStackComponentDetail({ id }, token),
		...options
	});
}
