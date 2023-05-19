import { User } from "./user";
import { Workspace } from "./workspace";

export type StackComponent = {
	id: string;
	created: string;
	updated: string;
	user: User;
	workspace: Workspace;
	is_shared: boolean;
	name: string;
	type: string;
	flavor: string;
	configuration: Record<string, string>;
	labels: Record<string, string>;
};
