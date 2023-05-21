export const routePaths = {
	home: () => "/",
	login: () => "/login",
	workspaces: {
		detail: (workspaceID: string) => `/workspaces/${workspaceID}`
	},
	components: {
		overview: (workspaceID: string) => `/workspaces/${workspaceID}/components`
	}
};
