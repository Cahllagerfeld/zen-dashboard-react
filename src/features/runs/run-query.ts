type RunQueryKey = {
	workspace: string;
	params: RunQueryParams;
};

export type RunQueryParams = {
	sort_by?: string;
	logical_operator?: "or" | "and";
	page?: string;
	size?: string;
	id?: string;
	created?: string;
	updated?: string;
	scope_workspace?: string;
	name?: string;
	orchestrator_run_id?: string;
	pipeline_id?: string;
	workspace_id?: string;
	user_id?: string;
	stack_id?: string;
	schedule_id?: string;
	build_id?: string;
	deployment_id?: string;
	code_repository_id?: string;
	status?: string;
	start_time?: string;
	end_time?: string;
	num_steps?: string;
	unlisted?: string;
};

export function getRunQueryKey({ workspace, params }: RunQueryKey) {
	return ["workspaces", workspace, "runs", params];
}
