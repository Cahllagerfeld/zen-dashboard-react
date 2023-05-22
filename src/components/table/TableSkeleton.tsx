import Skeleton from "react-loading-skeleton";

function TableSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			{[...Array(10).keys()].map((item) => (
				<div key={item} className="rounded-2xl bg-white p-4">
					<Skeleton className="h-6" />
				</div>
			))}
		</div>
	);
}

export default TableSkeleton;
