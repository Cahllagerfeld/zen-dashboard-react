import { useState } from "react";
import { PipelineQueryParams } from "@/types/pipelines";
import { useSearchParams } from "react-router-dom";

type PipelinesOverviewSerivceConfig = {
	page: number;
	size: number;
};

export function usePipelinesOverviewService({ page, size }: PipelinesOverviewSerivceConfig) {
	const [, setSearchParams] = useSearchParams();
	const [queryParams, setQueryParams] = useState<PipelineQueryParams>({
		page,
		size,
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
