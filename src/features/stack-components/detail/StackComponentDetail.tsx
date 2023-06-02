import { useParams } from "react-router-dom";
import { useStackComponentDetail } from "./query";
import OverviewCard from "./cards/OverviewCard";
import { ReactComponent as Cube } from "../../../assets/cube.svg";

function StackComponentDetail() {
	const params = useParams() as { id: string };
	const { data, isError, isLoading } = useStackComponentDetail({ id: params.id });

	if (isError) return <p>Error</p>;
	if (isLoading) return <p>Fetching</p>;
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Cube width={32} height={32} strokeWidth={2.2} />
				<h1 className="text- text-[2rem]">{data.name}</h1>
			</div>
			<div className="grid grid-cols-1 xl:grid-cols-2">
				<OverviewCard stackComponent={data} />
			</div>
		</div>
	);
}

export default StackComponentDetail;
