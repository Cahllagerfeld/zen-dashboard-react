import KeyValue from "../../../../../components/KeyValue";

type OrchestratorConfigCardProps = {
	config: Record<string, any>;
};

function OrchestratorConfigCard({ config }: OrchestratorConfigCardProps) {
	return (
		<div className="rounded-3xl bg-white p-8">
			<h2 className="mb-8 text-2xl">Configuration</h2>
			<dl className="columns-1 space-y-4 xl:columns-2">
				{config.kubeflow_namespace && (
					<KeyValue itemKey="Kubeflow Namespace" value={config.kubeflow_namespace} />
				)}
				{config.client_username && (
					<KeyValue itemKey="Client Username" value={config.client_username} />
				)}
				{config.client_password && (
					<KeyValue itemKey="Client Password" value={config.client_password} />
				)}
			</dl>
		</div>
	);
}

export default OrchestratorConfigCard;
