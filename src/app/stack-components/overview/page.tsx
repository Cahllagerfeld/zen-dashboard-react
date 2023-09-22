import { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/state/stores/workspace-store";
import { useStackComponents } from "./query";
import TableSkeleton from "@/components/table/TableSkeleton";
import Pagination from "@/components/pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import { StackComponentQueryParams } from "@/types/stack-component";
import Sidebar from "./Sidebar";
import BasePage from "@/components/common/BasePage";
import { columns } from "./TableDef";
import { DataTable } from "@/components/table/DataTable";
import DefaultHeader from "@/components/DefaultHeader";

function StackComponentsOverview() {
	const DEFAULT_PAGE = "1";
	const DEFAULT_PAGE_SIZE = "10";
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page");
	const size = searchParams.get("size");
	const id = searchParams.get("id");

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
		<BasePage header={<DefaultHeader title="Stack Components" />}>
			{isLoading && <TableSkeleton colAmount={columns.length} />}
			{isSuccess && (
				<div className="flex">
					<div className={`${id ? "w-2/3" : "w-full"}`}>
						<DataTable columns={columns} data={data.items} />
						<Pagination
							pageSizeChangeHandler={pageSizeChangeHandler}
							pageChangeHandler={pageChangeHandler}
							paginate={data}
						/>
					</div>
					{id && <Sidebar id={id} resetSelected={resetID} />}
				</div>
			)}
		</BasePage>
	);
}

export default StackComponentsOverview;
