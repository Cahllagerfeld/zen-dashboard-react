import { useWorkspaceStore } from "@/state/stores/workspace-store";
import { usePipelines } from "./query";
import { useEffect, useState } from "react";
import { PipelineQueryParams } from "@/types/pipelines";
import Table from "@/components/table/Table";
import { tableDef } from "./TableDef";
import Pagination from "../../../components/pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import BasePage from "../../../components/common/BasePage";

function Pipelines() {
	const DEFAULT_PAGE = "1";
	const DEFAULT_PAGE_SIZE = "10";
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);

	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page");
	const size = searchParams.get("size");

	const [queryParams, setQueryParams] = useState<PipelineQueryParams>({
		page: parseInt(page || DEFAULT_PAGE),
		size: parseInt(size || DEFAULT_PAGE_SIZE)
	});

	const { data, isLoading, isError, isSuccess } = usePipelines({
		workspace: activeWorkspace,
		params: queryParams
	});

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
		setQueryParams((prevParams) => ({
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
		setQueryParams((prevParams) => ({
			...prevParams,
			size,
			page: 1
		}));
		setSearchParams((existing) => {
			const newSearchParams = new URLSearchParams(existing.toString());
			newSearchParams.set("size", size.toString());
			newSearchParams.set("page", "1");
			return newSearchParams;
		});
	}

	if (isError) return <p>Error</p>;
	return (
		<BasePage title="Pipelines">
			{isLoading && <p>Loading...</p>}
			{isSuccess && (
				<div>
					<Table columnDef={tableDef} data={data.items} />
					<Pagination
						pageChangeHandler={pageChangeHandler}
						pageSizeChangeHandler={pageSizeChangeHandler}
						paginate={data}
					/>
				</div>
			)}
		</BasePage>
	);
}

export default Pipelines;
