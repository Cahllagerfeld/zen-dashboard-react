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
	type:
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
	flavor: string;
	configuration: Record<string, string>;
	labels: Record<string, string>;
	connector_resource_id?: string;
	connector?: ServiceConnector;
};
