import { useState } from "react";
import { PipelineQueryParams } from "@/types/pipelines";
import { useSearchParams } from "react-router-dom";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/hooks/pagination";

type PipelinesOverviewSerivceConfig = {
	page: string | null;
	size: string | null;
};

export function usePipelinesOverviewService({ page, size }: PipelinesOverviewSerivceConfig) {
	const [, setSearchParams] = useSearchParams();
	const [queryParams, setQueryParams] = useState<PipelineQueryParams>({
		page: parseInt(page || DEFAULT_PAGE),
		size: parseInt(size || DEFAULT_PAGE_SIZE),
		name: undefined
	});

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

	return {
		queryParams,
		setQueryParams,
		pageChangeHandler,
		pageSizeChangeHandler
	};
}
