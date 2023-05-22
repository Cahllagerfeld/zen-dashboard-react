import { useState } from "react";
import { useWorkspaceStore } from "../../../state/stores/workspace-store";
import { StackComponentQueryParams, useStackComponents } from "../stack-component-query";
import { useTableDefinition } from "./table";
import Table from "../../../components/table/Table";
import TableSkeleton from "../../../components/table/TableSkeleton";

function StackComponentsOverview() {
	const [params, _] = useState<StackComponentQueryParams>({});
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
	const tableDef = useTableDefinition();
	const { data, isLoading, isSuccess } = useStackComponents({ workspace: activeWorkspace, params });
	return (
		<div>
			<h1 className="mb-4">Stack Components</h1>
			{isLoading && <TableSkeleton />}
			{isSuccess && <Table columnDef={tableDef} data={data.items} />}
		</div>
	);
}

export default StackComponentsOverview;
