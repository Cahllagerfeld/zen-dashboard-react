import { useParams } from "react-router-dom";
import { usePipelineDetail } from "./query";
import { ReactComponent as PipelineIcon } from "@/assets/pipeline.svg";

function PipelineDetail() {
	const { id } = useParams() as { id: string };

	console.log(id);

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
		</div>
	);
}

export default PipelineDetail;
