import { useParams } from "react-router-dom";
import { usePipelineDetail } from "./query";
import { ReactComponent as PipelineIcon } from "@/assets/pipeline.svg";
import OverviewCard from "./cards/Overview";
import DagCard from "./cards/Dag";
import Tabs from "./Tabs";
import SkeletonOverview from "./cards/OverviewSkeleton";
import Skeleton from "react-loading-skeleton";

function PipelineDetail() {
	const { id } = useParams() as { id: string };

	const { data, isError, isLoading, isSuccess } = usePipelineDetail(id);

	if (isError) {
		return <p>Error</p>;
	}

	return (
		<div className="flex flex-col gap-4 xl:gap-8">
			<div className="flex items-center gap-2">
				<PipelineIcon width={32} height={32} strokeWidth={2.2} />
				{isLoading && <Skeleton height={32} width={200} />}
				{isSuccess && <h1 className="text- text-[2rem]">{data.name}</h1>}
			</div>
			<div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8">
				{isLoading && <SkeletonOverview />}
				{isSuccess && (
					<>
						<OverviewCard pipeline={data} />
						<DagCard spec={data.spec.steps} />
					</>
				)}
			</div>
			<Tabs id={id} />
		</div>
	);
}

export default PipelineDetail;
