export const apiPaths = {
	currentUser: "/current-user",
	login: "/login",
	workspaces: {
		base: "/workspaces",
		statistics: (workspace: string) => `/workspaces/${workspace}/statistics`,
		components: (workspace: string) => `/workspaces/${workspace}/components`
	}
};

export function createApiPath(path: string) {
	return `${import.meta.env.VITE_API_BASE_URL}${path}`;
}