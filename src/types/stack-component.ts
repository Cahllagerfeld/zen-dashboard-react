import { ServiceConnector } from "./connector";
import { User } from "./user";
import { Workspace } from "./workspace";

export type StackComponent = {
	id: string;
	created: string;
	updated: string;
	user?: User;
	workspace: Workspace;
	is_shared: boolean;
	name: string;
	type: StackComponentType;

	flavor: string;
	configuration: Record<string, string | object | boolean>;
	labels: Record<string, string>;
	connector_resource_id?: string;
	connector?: ServiceConnector;
};

export type StackComponentType =
	| "alerter"
	| "annotator"
	| "artifact_store"
	| "container_registry"
	| "data_validator"
	| "experiment_tracker"
	| "feature_store"
	| "image_builder"
	| "model_deployer"
	| "orchestrator"
	| "secrets_manager"
	| "step_operator"
	| "model_registry ";
