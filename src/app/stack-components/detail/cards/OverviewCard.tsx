import Badge from "@/components/Badge";
import KeyValue from "@/components/KeyValue";
import { StackComponent } from "@/types/stack-component";
import Card from "@/components/Card";
import { convertUTC } from "@/lib/dates";

type OverviewCardProps = {
	stackComponent: StackComponent;
};

function OverviewCard({ stackComponent }: OverviewCardProps) {
	return (
		<Card className="@container">
			<h2 className="mb-8 text-2xl">Overview</h2>
			<dl className="columns-1 space-y-4 @xl:columns-2">
				<KeyValue itemKey="ID" value={stackComponent.id} />
				<KeyValue itemKey="Name" value={stackComponent.name} />
				<KeyValue
					itemKey="Shared"
					value={
						<Badge intent={stackComponent.is_shared ? "success" : "error"}>
							{stackComponent.is_shared.toString()}
						</Badge>
					}
				/>
				{stackComponent.user && <KeyValue itemKey="Author" value={stackComponent.user?.name} />}
				<KeyValue itemKey="Created" value={convertUTC(stackComponent.created)} />
			</dl>
		</Card>
	);
}

export default OverviewCard;
