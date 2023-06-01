import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { StackComponent } from "../../../types/stack-component";
import { ErrorModel } from "../../../types/error";
import { apiPaths, createApiPath } from "../../../data/api";
import { useTokenStore } from "../../../state/stores";

export type StackComponentDetailQuery = {
	id: string;
};

export function getStackComponentQueryDetailKey({ id }: StackComponentDetailQuery) {
	return ["components", id];
}

export async function fetchStackComponentDetail(id: string, token: string) {
	const url = createApiPath(apiPaths.components.detail(id));
	const res = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (!res.ok) throw new Error(`Component ${id} couldn't be fetched`);
	return res.json();
}

export function useStackComponentDetail(
	{ id }: StackComponentDetailQuery,
	options?: Omit<UseQueryOptions<StackComponent, ErrorModel>, "queryKey" | "queryFn">
) {
	const token = useTokenStore((state) => state.token);
	return useQuery<StackComponent, ErrorModel>({
		queryKey: getStackComponentQueryDetailKey({ id }),
		queryFn: () => fetchStackComponentDetail(id, token),
		...options
	});
}
