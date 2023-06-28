import { useWorkspaceStore } from "@/state/stores/workspace-store";
import { usePipelines } from "./query";
import { useState } from "react";
import { PipelineQueryParams } from "@/types/pipelines";
import Table from "@/components/table/Table";
import { tableDef } from "./TableDef";

function Pipelines() {
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);

	const [queryParams] = useState<PipelineQueryParams>({});
	const { data, isLoading, isError } = usePipelines({
		workspace: activeWorkspace,
		params: queryParams
	});

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error</p>;
	return (
		<div>
			<h1 className="mb-4 text-[2rem]">Pipelines</h1>
			<Table columnDef={tableDef} data={data.items} />
		</div>
	);
}

export default Pipelines;
