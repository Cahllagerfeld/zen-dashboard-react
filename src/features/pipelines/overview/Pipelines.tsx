import { useWorkspaceStore } from "@/state/stores/workspace-store";
import { usePipelines } from "./query";
import { useState } from "react";
import { PipelineQueryParams } from "@/types/pipelines";

function Pipelines() {
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
	const [queryParams, setQueryParams] = useState<PipelineQueryParams>({});
	const { data, isSuccess, isError, isLoading } = usePipelines({
		workspace: activeWorkspace,
		params: queryParams
	});

	if (isLoading) return <p>Loading...</p>;
	return (
		<div>
			{data?.items.map((item) => (
				<p>{item.name}</p>
			))}
		</div>
	);
}

export default Pipelines;
