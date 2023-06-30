import { Pipeline } from "@/types/pipelines";
import KeyValue from "@/components/KeyValue";
import StatusOverview from "../../StatusOverview";
import Card from "@/components/Card";

type DetailCard = {
	pipeline: Pipeline;
};

function OverviewCard({ pipeline }: DetailCard) {
	return (
		<Card className="@container">
			<h2 className="mb-8 text-2xl">Overview</h2>
			<dl className="columns-1 space-y-4 @xl:columns-2">
				<KeyValue itemKey="ID" value={pipeline.id} />
				<KeyValue itemKey="Name" value={pipeline.name} />
				<KeyValue itemKey="Version" value={pipeline.version} />
				{pipeline.status && (
					<KeyValue itemKey="Status" value={<StatusOverview status={pipeline.status} />} />
				)}
				{pipeline.user && <KeyValue itemKey="Author" value={pipeline.user?.name} />}
				<KeyValue itemKey="Created" value={new Date(pipeline.created).toLocaleString()} />
			</dl>
		</Card>
	);
}

export default OverviewCard;
