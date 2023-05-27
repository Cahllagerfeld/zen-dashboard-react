import { ResponsePage } from "../../types/common";
import { ReactComponent as ChevronRight } from "../../assets/chevron-right.svg";
import { ReactComponent as ChevronLeft } from "../../assets/chevron-left.svg";
import { ReactComponent as ChevronStart } from "../../assets/chevron-start.svg";
import { ReactComponent as ChevronEnd } from "../../assets/chevron-end.svg";

type PaginationProps = {
	paginate: Omit<ResponsePage<any>, "items">;
	pageChangeHandler: (page: string) => void;
	pageSizeChangeHandler: (size: string) => void;
};

function Pagination({ paginate, pageChangeHandler, pageSizeChangeHandler }: PaginationProps) {
	const { index, max_size, total, total_pages } = paginate;
	const startRange = (index - 1) * max_size + 1;
	const endRange = Math.min(index * max_size, total);

	return (
		<div className="flex items-center justify-end gap-2">
			<p className="mr-4">{`${startRange}-${endRange} of ${total}`}</p>
			<button
				className={`${index === 1 ? "hidden" : ""}`}
				disabled={index === 1}
				onClick={() => pageChangeHandler("1")}
				aria-label="Go to first page"
			>
				<ChevronStart />
			</button>
			<button
				className={`${index === 1 ? "hidden" : ""}`}
				disabled={index === 1}
				onClick={() => pageChangeHandler((index - 1).toString())}
				aria-label="Go to previous page"
			>
				<ChevronLeft />
			</button>
			<button
				className={`${index === total_pages ? "hidden" : ""}`}
				disabled={index === total_pages}
				onClick={() => pageChangeHandler((index + 1).toString())}
				aria-label="Go to next page"
			>
				<ChevronRight />
			</button>

			<button
				className={`${index === total_pages ? "hidden" : ""}`}
				disabled={index === total_pages}
				onClick={() => pageChangeHandler(total_pages.toString())}
				aria-label="Go to last page"
			>
				<ChevronEnd />
			</button>
			<div className="ml-8">
				Rows per page:
				<select
					defaultValue={max_size.toString()}
					onChange={(e) => pageSizeChangeHandler(e.target.value)}
					className="ml-2 rounded-lg border-none bg-transparent pl-1"
				>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="50">50</option>
				</select>
			</div>
		</div>
	);
}

export default Pagination;
