import { useWorkspaceStore } from "@/state/stores/workspace-store";
import { usePipelines } from "@/data/pipelines/all-pipelines-query";
import { ChangeEvent, useEffect } from "react";
import Pagination from "@/components/pagination/Pagination";
import BasePage from "@/components/common/BasePage";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "./TableDef";
import DefaultHeader from "@/components/DefaultHeader";
import { Input } from "@/components/Input";
import { ReactComponent as Magnifying } from "@/assets/magnifying.svg";
import { produce } from "immer";
import debounce from "lodash.debounce";
import { useDebouncedSearch } from "@/lib/hooks/debounce";
import { usePagination } from "@/lib/hooks/pagination";
import { usePipelinesOverviewService } from "./service";

function Pipelines() {
	const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);

	const { page, size } = usePagination();

	const { setQueryParams, queryParams, pageChangeHandler, pageSizeChangeHandler } =
		usePipelinesOverviewService({ page, size });

	const { data, isLoading, isError, isSuccess } = usePipelines({
		workspace: activeWorkspace,
		params: queryParams
	});

	useEffect(() => {
		return () => {
			debouncedSearch.cancel();
		};
	}, []);

	const debouncedSearch = useDebouncedSearch(
		debounce((value: string) => {
			setQueryParams((prevState) =>
				produce(prevState, (draft) => {
					draft.name = value ? `contains:${value}` : undefined;
				})
			);
		}),
		500
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
