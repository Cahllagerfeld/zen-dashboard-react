import { useParams } from "react-router-dom";
import { useStackComponentDetail } from "./query";
import OverviewCard from "./cards/OverviewCard";
import { ReactComponent as Cube } from "../../../assets/cube.svg";
import ConfigCard from "./cards/ConfigCard";
import StackComponent404 from "./StackComponent404";

function StackComponentDetail() {
	const params = useParams() as { id: string };
	const { data, isError, error, isLoading } = useStackComponentDetail({ id: params.id });

	if (isError) {
		if (error.status === 404) return <StackComponent404 />;
		return <p>Error</p>;
	}
	if (isLoading) return <p>Fetching</p>;
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Cube width={32} height={32} strokeWidth={2.2} />
				<h1 className="text- text-[2rem]">{data.name}</h1>
			</div>
			<div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8">
				<OverviewCard stackComponent={data} />
				<ConfigCard config={data.configuration} />
			</div>
		</div>
	);
}

export default StackComponentDetail;
