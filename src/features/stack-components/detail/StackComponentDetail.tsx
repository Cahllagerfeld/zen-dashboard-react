import { useParams } from "react-router-dom";
import { useStackComponentDetail } from "./query";
import OverviewCard from "./cards/OverviewCard";

function StackComponentDetail() {
	const params = useParams() as { id: string };
	const { data, isError, isFetching } = useStackComponentDetail({ id: params.id });

	if (isError) return <p>Error</p>;
	if (isFetching) return <p>Fetching</p>;
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2">
			<OverviewCard stackComponent={data!} />
		</div>
	);
}

export default StackComponentDetail;
