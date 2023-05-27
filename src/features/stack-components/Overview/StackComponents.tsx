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

	const [params, setParams] = useState<StackComponentQueryParams>({
		page: page || DEFAULT_PAGE,
		size: size || DEFAULT_PAGE_SIZE
	});
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
	const tableDef = useTableDefinition();

	useEffect(() => {
		if (!searchParams.has("page")) {
			searchParams.set("page", DEFAULT_PAGE);
		}
		if (!searchParams.has("size")) {
			searchParams.set("size", DEFAULT_PAGE_SIZE);
		}

		setSearchParams(searchParams);
	}, [searchParams, setSearchParams]);

	function pageChangeHandler(page: string) {
		setParams((prevParams) => ({
			...prevParams,
			page
		}));
		setSearchParams((existing) => {
			const newSearchParams = new URLSearchParams(existing.toString());
			newSearchParams.set("page", page);
			return newSearchParams;
		});
	}

	function pageSizeChangeHandler(size: string) {
		setParams((prevParams) => ({
			...prevParams,
			size
		}));
		setSearchParams((existing) => {
			const newSearchParams = new URLSearchParams(existing.toString());
			newSearchParams.set("size", size);
			return newSearchParams;
		});
	}

	const { data, isLoading, isSuccess } = useStackComponents({ workspace: activeWorkspace, params });
	return (
		<div>
			<h1 className="mb-4">Stack Components</h1>
			{isLoading && <TableSkeleton />}
			{isSuccess && (
				<div>
					<Table columnDef={tableDef} data={data.items} />
					<Pagination
						pageSizeChangeHandler={pageSizeChangeHandler}
						pageChangeHandler={pageChangeHandler}
						paginate={data}
					/>
				</div>
			)}
		</div>
	);
}

export default StackComponentsOverview;
