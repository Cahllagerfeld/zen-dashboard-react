import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const DEFAULT_PAGE = "1";
export const DEFAULT_PAGE_SIZE = "10";

export function usePagination() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = searchParams.get("page");
	const size = searchParams.get("size");

	useEffect(() => {
		if (!searchParams.has("page")) {
			searchParams.set("page", DEFAULT_PAGE);
		}
		if (!searchParams.has("size")) {
			searchParams.set("size", DEFAULT_PAGE_SIZE);
		}

		setSearchParams(searchParams);
	}, [searchParams, setSearchParams]);

	return { page, size };
}
