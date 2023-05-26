import { ResponsePage } from "../../types/common";

type PaginationProps = {
	paginate: Omit<ResponsePage<any>, "items">;
	pageChangeHandler: (page: string) => void;
};

function Pagination({ paginate, pageChangeHandler }: PaginationProps) {
	const { index, max_size, total, total_pages } = paginate;
	const startRange = (index - 1) * max_size + 1;
	const endRange = Math.min(index * max_size, total);

	console.log({ startRange, endRange });

	return (
		<div className="flex justify-center gap-2">
			<p>{`${startRange}-${endRange} of ${total}`}</p>
			<button
				disabled={index === 1}
				onClick={() => pageChangeHandler((index - 1).toString())}
				aria-label="Go to previous page"
			>
				Back
			</button>
			<button
				disabled={index === total_pages}
				onClick={() => pageChangeHandler((index + 1).toString())}
				aria-label="Go to next page"
			>
				Next
			</button>
			<button
				disabled={index === 1}
				onClick={() => pageChangeHandler("1")}
				aria-label="Go to first page"
			>
				First
			</button>
			<button
				disabled={index === total_pages}
				onClick={() => pageChangeHandler(total_pages.toString())}
				aria-label="Go to last page"
			>
				Last
			</button>
		</div>
	);
}

export default Pagination;
