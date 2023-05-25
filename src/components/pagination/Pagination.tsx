import { ResponsePage } from "../../types/common";

type PaginationProps = {
	paginate: Omit<ResponsePage<any>, "items">;
	pageChangeHandler: (page: string) => void;
};

function Pagination({ paginate, pageChangeHandler }: PaginationProps) {
	return (
		<div className="flex justify-center gap-2">
			{[...Array(paginate.total_pages).keys()].map((item) => (
				<button
					onClick={() => pageChangeHandler((item + 1).toString())}
					className={`aspect-square h-8 rounded-lg border border-neutral-300 ${
						item + 1 === paginate.index ? "bg-primary text-white" : ""
					}`}
					key={item}
				>
					{item + 1}
				</button>
			))}
		</div>
	);
}

export default Pagination;
