import { useParams } from "react-router-dom";
import { usePipelineDetail } from "./query";
import { ReactComponent as PipelineIcon } from "@/assets/pipeline.svg";
import OverviewCard from "./cards/Overview";
import DagCard from "./cards/Dag";
import Tabs from "./Tabs";

function PipelineDetail() {
	const { id } = useParams() as { id: string };

	const { data, isError, isLoading } = usePipelineDetail(id);

	if (isError) {
		return <p>Error</p>;
	}
	if (isLoading) return <p>Fetching</p>;

	return (
		<div className="flex flex-col gap-4 xl:gap-8">
			<div className="flex items-center gap-2">
				<PipelineIcon width={32} height={32} strokeWidth={2.2} />
				<h1 className="text- text-[2rem]">{data.name}</h1>
			</div>
			<div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8">
				<OverviewCard pipeline={data} />
				<DagCard spec={data.spec.steps} />
			</div>
			<Tabs id={id} />
		</div>
	);
}

export default PipelineDetail;
