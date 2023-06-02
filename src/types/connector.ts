import { User } from "./user";
import { Workspace } from "./workspace";

export type ServiceConnector = {
	id: string;
	created: string;
	updated: string;
	user?: User;
	workspace: Workspace;
	is_shared: boolean;
	name: string;
	connector_type: string;
	description?: string;
	auth_method: string;
	resource_types?: string[];
	resource_id?: string;
	supports_instances?: boolean;
	expires_at?: string;
	expiration_seconds?: number;
	configuration?: Record<string, string>;
	secrets?: Record<string, string>;
	labels?: Record<string, string>;
	secret_id?: string;
};
