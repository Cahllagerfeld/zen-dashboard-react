import { useParams } from "react-router-dom";
import { useStackComponentDetail } from "@/data/stack-components/detail-components-query";
import OverviewCard from "./cards/OverviewCard";
import { ReactComponent as Cube } from "@/assets/cube.svg";
import ConfigCard from "./cards/ConfigCard";
import StackComponent404 from "./StackComponent404";
import Tabs from "./Tabs";
import BasePage from "@/components/common/BasePage";

function StackComponentDetail() {
	const { id } = useParams() as { id: string };
	const { data, isError, error, isLoading } = useStackComponentDetail({ id });

	if (isError) {
		if (error.status === 404) return <StackComponent404 id={id} />;
		return <p>Error</p>;
	}
	if (isLoading) return <p>Fetching</p>;
	return (
		<BasePage>
			<div className="flex flex-col gap-4 xl:gap-8">
				<div className="flex items-center gap-2">
					<Cube width={32} height={32} strokeWidth={2.2} />
					<h1 className="text- text-[2rem]">{data.name}</h1>
				</div>
				<div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-8">
					<OverviewCard stackComponent={data} />
					<ConfigCard config={data.configuration} />
				</div>
				<Tabs id={id} />
			</div>
		</BasePage>
	);
}

export default StackComponentDetail;
