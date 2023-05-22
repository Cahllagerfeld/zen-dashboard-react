import { ResponsePage } from "./common";

export type Workspace = {
	id: string;
	created: string;
	updated: string;
	name: string;
	description: string;
};

export type WorkspaceResponsePage = ResponsePage<Workspace>;
