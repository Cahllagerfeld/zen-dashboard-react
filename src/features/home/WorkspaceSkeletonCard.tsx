import Skeleton from "react-loading-skeleton";

function WorkspaceSkeletonCard() {
	return (
		<div className="flex w-full  select-text flex-col gap-2 rounded-2xl bg-white from-primary to-primary-light p-4 hover:bg-primary hover:bg-gradient-to-br hover:text-white sm:w-1/2 xl:w-1/4">
			<h2 className="text-xl">
				<Skeleton />
			</h2>
			<Skeleton count={2} />
		</div>
	);
}

export default WorkspaceSkeletonCard;
