import { useWorkspaceStore } from "@/state/stores/workspace-store";
import { usePipelines } from "@/data/pipelines/all-pipelines-query";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { PipelineQueryParams } from "@/types/pipelines";
import Pagination from "@/components/pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import BasePage from "@/components/common/BasePage";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "./TableDef";
import DefaultHeader from "@/components/DefaultHeader";
import { Input } from "@/components/Input";
import { ReactComponent as Magnifying } from "@/assets/magnifying.svg";
import { produce } from "immer";
import debounce from "lodash.debounce";

function Pipelines() {
	const DEFAULT_PAGE = "1";
	const DEFAULT_PAGE_SIZE = "10";
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);

	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page");
	const size = searchParams.get("size");

	const [queryParams, setQueryParams] = useState<PipelineQueryParams>({
		page: parseInt(page || DEFAULT_PAGE),
		size: parseInt(size || DEFAULT_PAGE_SIZE),
		name: undefined
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
		return () => {
			debouncedSearch.cancel();
		};
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

	const debouncedSearch = useCallback(
		debounce((value: string) => {
			setQueryParams((prevState) =>
				produce(prevState, (draft) => {
					draft.name = value ? `contains:${value}` : undefined;
				})
			);
		}, 500),
		[]
	);

	function searchHandler(e: ChangeEvent<HTMLInputElement>) {
		const { value } = e.target;
		debouncedSearch(value);
	}

	if (isError) return <p>Error</p>;
	return (
		<BasePage header={<DefaultHeader title="Pipelines" />}>
			<div className="space-y-4">
				<Input onChange={searchHandler} iconLeft={<Magnifying />} placeholder="Search..." />
				{isLoading && <p>Loading...</p>}
				{isSuccess && (
					<>
						<DataTable columns={columns} data={data.items} />
						<Pagination
							pageChangeHandler={pageChangeHandler}
							pageSizeChangeHandler={pageSizeChangeHandler}
							paginate={data}
						/>
					</>
				)}
			</div>
		</BasePage>
	);
}

export default Pipelines;
