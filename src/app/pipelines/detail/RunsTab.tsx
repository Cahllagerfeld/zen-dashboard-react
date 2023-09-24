import { Pipeline } from "@/types/pipelines";
import { useRuns } from "@/data/runs/all-runs-query";
import { useWorkspaceStore } from "@/state/stores/workspace-store";

type RunsTabProps = {
	id: Pipeline["id"];
};

export default function RunsTab({ id }: RunsTabProps) {
	const workspace = useWorkspaceStore((state) => state.activeWorkspace);
	const { data, isError, isLoading } = useRuns({
		workspace,
		params: {
			pipeline_id: id,
			size: 10
		}
	});
	if (isError) return <p>Error</p>;
	if (isLoading) return <p>Loading...</p>;
	return (
		<ul>
			{data.items.map((run) => (
				<li key={run.id}>{run.name}</li>
			))}
		</ul>
	);
}
