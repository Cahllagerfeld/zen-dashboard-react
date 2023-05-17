export type Workspace = {
	id: string;
	created: string;
	updated: string;
	name: string;
	description: string;
};

export type WorkspaceResponsePage = {
	index: number;
	max_size: number;
	total_pages: number;
	total: number;
	items: Workspace[];
};
