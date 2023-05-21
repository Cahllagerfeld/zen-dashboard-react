import { useState } from "react";
import { useWorkspaceStore } from "../../../state/stores/workspace-store";
import { StackComponentQueryParams, useStackComponents } from "../stack-component-query";

function StackComponentsOverview() {
	const [params, _] = useState<StackComponentQueryParams>({});
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
	const { data } = useStackComponents({ workspace: activeWorkspace, params });
	return (
		<div>
			<p>Stack Components</p>
			<pre className="block whitespace-normal">{JSON.stringify(data)}</pre>
		</div>
	);
}

export default StackComponentsOverview;
