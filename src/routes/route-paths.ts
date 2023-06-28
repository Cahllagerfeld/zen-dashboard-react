export const routePaths = {
	home: () => "/",
	login: () => "/login",
	workspaces: {
		detail: (workspaceID: string) => `/workspaces/${workspaceID}`
	},
	components: {
		overview: (workspaceID: string) => `/workspaces/${workspaceID}/components`,
		detail: (id: string) => `/components/${id}`
	},
	pipelines: {
		overview: (workspaceID: string) => `/workspaces/${workspaceID}/pipelines`,
		detail: (id: string) => `/pipelines/${id}`
	}
};
