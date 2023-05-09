export const routePaths = {
	home: () => "/",
	login: () => "/login",
	workspaces: {
		detail: (workspace_id: string) => `/workspaces/${workspace_id}`
	}
};
