export const routePaths = {
	base: () => "/",
	login: () => "/login",
	workspaces: {
		base: (workspace_id: string) => `/workspaces/${workspace_id}`
	}
};
