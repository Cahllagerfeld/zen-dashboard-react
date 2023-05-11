import Skeleton from "react-loading-skeleton";

function WorkspaceSkeletonCard() {
	return (
		<div className="flex w-full flex-col gap-2 rounded-lg bg-white  p-4">
			<Skeleton />
			<Skeleton className="h-6" />
		</div>
	);
}

export default WorkspaceSkeletonCard;
