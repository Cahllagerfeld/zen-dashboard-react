import { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/state/stores/workspace-store";
import { StackComponentQueryParams, useStackComponents } from "./query";
import Table from "@/components/table/Table";
import TableSkeleton from "@/components/table/TableSkeleton";
import Pagination from "@/components/pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { StackComponent } from "@/types/stack-component";
import Sidebar from "./Sidebar";

function StackComponentsOverview() {
	const DEFAULT_PAGE = "1";
	const DEFAULT_PAGE_SIZE = "10";
	const [searchParams, setSearchParams] = useSearchParams();

	const [selected, setSelected] = useState("");

	const columnHelper = createColumnHelper<StackComponent>();

	const tableDef = [
		columnHelper.accessor("id", {
			header: () => "ID",
			cell: (id) => <button onClick={() => setSelected(id.getValue())}>{id.getValue()}</button>
		}),
		columnHelper.accessor("name", {
			header: () => "Name",
			cell: (name) => name.getValue()
		}),
		columnHelper.accessor("type", {
			header: "Type",
			cell: (type) => type.getValue()
		}),
		columnHelper.accessor("flavor", {
			header: "Flavor",
			cell: (flavor) => flavor.getValue()
		}),
		columnHelper.accessor("is_shared", {
			header: "Shared",
			cell: (isShared) => (isShared.getValue() ? "Yes" : "No")
		}),
		columnHelper.accessor("created", {
			header: "Created",
			cell: ({ getValue }) => {
				return <time>{new Date(getValue()).toLocaleString()}</time>;
			}
		})
	];

	const page = searchParams.get("page");
	const size = searchParams.get("size");

	const [params, setParams] = useState<StackComponentQueryParams>({
		page: page || DEFAULT_PAGE,
		size: size || DEFAULT_PAGE_SIZE
	});
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);

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
			newSearchParams.set("page", "1");
			return newSearchParams;
		});
	}

	const { data, isLoading, isSuccess } = useStackComponents({ workspace: activeWorkspace, params });
	return (
		<div>
			<h1 className="mb-4 text-[2rem]">Stack Components</h1>
			{isLoading && <TableSkeleton colAmount={tableDef.length} />}
			{isSuccess && (
				<div className="flex">
					<div className={`${selected ? "w-2/3" : "w-full"}`}>
						<Table columnDef={tableDef} data={data.items} />
						<Pagination
							pageSizeChangeHandler={pageSizeChangeHandler}
							pageChangeHandler={pageChangeHandler}
							paginate={data}
						/>
					</div>
					{selected && <Sidebar id={selected} setSelected={setSelected} />}
				</div>
			)}
		</div>
	);
}

export default StackComponentsOverview;
