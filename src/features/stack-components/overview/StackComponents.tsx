import { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/state/stores/workspace-store";
import { useStackComponents } from "./query";
import Table from "@/components/table/Table";
import TableSkeleton from "@/components/table/TableSkeleton";
import Pagination from "@/components/pagination/Pagination";
import { ReactComponent as OpenSidebar } from "@/assets/open-sidebar.svg";
import { Link, useSearchParams } from "react-router-dom";
import { StackComponent, StackComponentQueryParams } from "@/types/stack-component";
import { createColumnHelper } from "@tanstack/react-table";
import Sidebar from "./Sidebar";
import { routePaths } from "@/routes/route-paths";

function StackComponentsOverview() {
	const DEFAULT_PAGE = "1";
	const DEFAULT_PAGE_SIZE = "10";
	const [searchParams, setSearchParams] = useSearchParams();

	const columnHelper = createColumnHelper<StackComponent>();

	const tableDef = [
		columnHelper.accessor("id", {
			header: () => "ID",
			cell: (id) => (
				<Link className="link" to={routePaths.components.detail(id.getValue())}>
					{id.getValue()}
				</Link>
			)
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
		}),
		columnHelper.accessor("id", {
			id: "sidebar",
			header: "",
			meta: {
				className: "w-8"
			},
			cell: ({ getValue }) => {
				return (
					<button className="w-8" onClick={() => setID(getValue())}>
						<OpenSidebar />
					</button>
				);
			}
		})
	];

	const page = searchParams.get("page");
	const size = searchParams.get("size");
	const id = searchParams.get("id");

	function setID(id: string) {
		setSearchParams((existing) => {
			const newSearchParams = new URLSearchParams(existing.toString());
			newSearchParams.set("id", id);
			return newSearchParams;
		});
	}

	function resetID() {
		setSearchParams((existing) => {
			const newSearchParams = new URLSearchParams(existing.toString());
			newSearchParams.delete("id");
			return newSearchParams;
		});
	}

	const [params, setParams] = useState<StackComponentQueryParams>({
		page: parseInt(page || DEFAULT_PAGE),
		size: parseInt(size || DEFAULT_PAGE_SIZE)
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

	function pageChangeHandler(page: number) {
		setParams((prevParams) => ({
			...prevParams,
			page
		}));
		setSearchParams((existing) => {
			const newSearchParams = new URLSearchParams(existing.toString());
			newSearchParams.set("page", page.toString());
			return newSearchParams;
		});
	}

	function pageSizeChangeHandler(size: number) {
		setParams((prevParams) => ({
			...prevParams,
			size
		}));
		setSearchParams((existing) => {
			const newSearchParams = new URLSearchParams(existing.toString());
			newSearchParams.set("size", size.toString());
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
					<div className={`${id ? "w-2/3" : "w-full"}`}>
						<Table columnDef={tableDef} data={data.items} />
						<Pagination
							pageSizeChangeHandler={pageSizeChangeHandler}
							pageChangeHandler={pageChangeHandler}
							paginate={data}
						/>
					</div>
					{id && <Sidebar id={id} resetSelected={resetID} />}
				</div>
			)}
		</div>
	);
}

export default StackComponentsOverview;
