import { useState } from "react";
import { useWorkspaceStore } from "../../../state/stores/workspace-store";
import { StackComponentQueryParams, useStackComponents } from "../stack-component-query";
import { useTableDefinition } from "./table";
import Table from "../../../components/table/Table";

function StackComponentsOverview() {
	const [params, _] = useState<StackComponentQueryParams>({});
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
	const tableDef = useTableDefinition();
	const { data, isLoading, isSuccess } = useStackComponents({ workspace: activeWorkspace, params });
	return (
		<div>
			<p>Stack Components</p>
			{isLoading && <p>Loading...</p>}
			{isSuccess && <Table columnDef={tableDef} data={data.items} />}
		</div>
	);
}

export default StackComponentsOverview;
