import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "../../../state/stores";
import { StackComponent, StackComponentType } from "../../../types/stack-component";
import { ErrorModel } from "../../../types/error";
import { apiPaths, createApiPath } from "../../../data/api";
import { ResponsePage } from "../../../types/common";
import { objectToSearchParams } from "../../../data/helper";

type StackComponentOverviewQuery = {
	workspace: string;
	params: StackComponentQueryParams;
};

export type StackComponentQueryParams = {
	sort_by?: string;
	logical_operator?: "or" | "and";
	page?: string;
	size?: string;
	id?: string;
	created?: string;
	updated?: string;
	scope_workspace?: string;
	scope_user?: string;
	scope_type?: string;
	is_shared?: string;
	name?: string;
	flavor?: string;
	type?: StackComponentType;
	workspace_id?: string;
	user_id?: string;
};

export function getStackComponentQueryKey({ workspace, params }: StackComponentOverviewQuery) {
	return ["workspaces", workspace, "runs", params];
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
	if (!res.ok) throw new Error(`Components couldn't be fetched`);
	return res.json();
}

export function useStackComponents(
	{ workspace, params }: StackComponentOverviewQuery,
	options?: Omit<UseQueryOptions<ResponsePage<StackComponent>, ErrorModel>, "queryKey" | "queryFn">
) {
	const token = useTokenStore((state) => state.token);
	return useQuery<ResponsePage<StackComponent>, ErrorModel>({
		queryKey: getStackComponentQueryKey({ workspace, params }),
		queryFn: () => fetchStackComponents({ workspace, params }, token),
		...options
	});
}
