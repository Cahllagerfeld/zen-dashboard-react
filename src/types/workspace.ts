export interface Workspace {
	id: string;
	created: string;
	updated: string;
	name: string;
	description: string;
}

export interface WorkspaceResponsePage {
	index: number;
	max_size: number;
	total_pages: number;
	total: number;
	items: Workspace[];
}
