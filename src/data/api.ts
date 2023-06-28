export const apiPaths = {
	currentUser: "/current-user",
	login: "/login",
	workspaces: {
		base: "/workspaces",
		statistics: (workspace: string) => `/workspaces/${workspace}/statistics`,
		components: (workspace: string) => `/workspaces/${workspace}/components`,
		stacks: (workspace: string) => `/workspaces/${workspace}/stacks`,
		pipelines: (workspace: string) => `/workspaces/${workspace}/pipelines`
	},
	components: {
		detail: (id: string) => `/components/${id}`
	}
};

export function createApiPath(path: string) {
	return `${import.meta.env.VITE_API_BASE_URL}${path}`;
}
