import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export const paginationSchema = z.object({
	page: z.coerce.number().min(1).catch(DEFAULT_PAGE).default(DEFAULT_PAGE),
	size: z.coerce.number().min(1).catch(DEFAULT_PAGE_SIZE).default(DEFAULT_PAGE_SIZE)
});

export function usePagination() {
	const [searchParams, setSearchParams] = useSearchParams();

	const { page, size } = paginationSchema.parse({
		page: searchParams.get("page"),
		size: searchParams.get("size")
	});

	useEffect(() => {
		searchParams.set("page", page.toString());
		searchParams.set("size", size.toString());

		setSearchParams(searchParams);
	}, [setSearchParams, page, size]);

	return { page, size };
}
