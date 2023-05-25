import { useEffect, useState } from "react";
import { useWorkspaceStore } from "../../../state/stores/workspace-store";
import { StackComponentQueryParams, useStackComponents } from "../stack-component-query";
import { useTableDefinition } from "./table";
import Table from "../../../components/table/Table";
import TableSkeleton from "../../../components/table/TableSkeleton";
import Pagination from "../../../components/pagination/Pagination";
import { useSearchParams } from "react-router-dom";

function StackComponentsOverview() {
	const DEFAULT_PAGE = "1";
	const DEFAULT_PAGE_SIZE = "10";
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page");
	const size = searchParams.get("size");

	const [params, _] = useState<StackComponentQueryParams>({
		page: page || DEFAULT_PAGE,
		size: size || DEFAULT_PAGE_SIZE
	});
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
	const tableDef = useTableDefinition();

	useEffect(() => {
		if (!page || !size) {
			setSearchParams(
				(existing) => ({
					...existing,
					page: data?.index.toString() || DEFAULT_PAGE,
					size: data?.max_size.toString() || DEFAULT_PAGE_SIZE
				}),
				{
					replace: true
				}
			);
		}
	}, []);

	const { data, isLoading, isSuccess } = useStackComponents({ workspace: activeWorkspace, params });
	return (
		<div>
			<h1 className="mb-4">Stack Components</h1>
			{isLoading && <TableSkeleton />}
			{isSuccess && (
				<div>
					<Table columnDef={tableDef} data={data.items} />
					<Pagination paginate={data} />
				</div>
			)}
		</div>
	);
}

export default StackComponentsOverview;
