type StackComponentQueryKey = {
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

export function getStackComponentQueryKEy({ workspace, params }: StackComponentQueryKey) {
	return ["workspaces", workspace, "runs", params];
}
