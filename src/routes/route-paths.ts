export const routePaths = {
	login: () => "/login",
	workspaces: {
		base: (workspace_id: string) => `/workspaces/${workspace_id}`
	}
};
