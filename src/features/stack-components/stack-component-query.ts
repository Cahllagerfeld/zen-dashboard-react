import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useTokenStore } from "../../state/stores";
import { StackComponent } from "../../types/stack-component";
import { ErrorModel } from "../../types/error";

type StackComponentQuery = {
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
	type?: string;
	workspace_id?: string;
	user_id?: string;
};

export function getStackComponentQueryKey({ workspace, params }: StackComponentQuery) {
	return ["workspaces", workspace, "runs", params];
}

export function useStackComponents(
	{ workspace, params }: StackComponentQuery,
	options?: Omit<UseQueryOptions<StackComponent, ErrorModel>, "queryKey" | "queryFn">
) {
	const token = useTokenStore((state) => state.token);
	return useQuery<StackComponent, ErrorModel>({
		queryKey: getStackComponentQueryKey({ workspace, params }),
		queryFn: async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_BASE_URL}/workspaces/${workspace}/components`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			if (!response.ok) throw new Error(`Components couldn't be fetched`);
			return response.json();
		},
		...options
	});
}
