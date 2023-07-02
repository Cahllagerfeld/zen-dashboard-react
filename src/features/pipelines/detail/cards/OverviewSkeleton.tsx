import Skeleton from "react-loading-skeleton";
import Card from "@/components/Card";

function SkeletonOverview() {
	return (
		<Card className="@container">
			<div className="text-xl">
				<Skeleton height={24} className="mb-2" />
			</div>
			<div className="columns-1 @xl:columns-2">
				<Skeleton className="mb-2" height={24} count={6} />
			</div>
		</Card>
	);
}

export default SkeletonOverview;
