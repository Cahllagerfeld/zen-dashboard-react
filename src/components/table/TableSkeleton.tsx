import Skeleton from "react-loading-skeleton";

type TableSkeletonProps = {
	colAmount?: number;
};

function TableSkeleton({ colAmount = 5 }: TableSkeletonProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between gap-8 px-4">
				{[...Array(colAmount).keys()].map((col) => (
					<Skeleton containerClassName="block w-full" key={col} className="h-6" />
				))}
			</div>
			{[...Array(10).keys()].map((item) => (
				<div key={item} className="flex justify-between gap-8 rounded-2xl bg-white p-4">
					{[...Array(colAmount).keys()].map((col) => (
						<Skeleton containerClassName="block w-full" key={col} className="h-6" />
					))}
				</div>
			))}
		</div>
	);
}

export default TableSkeleton;
