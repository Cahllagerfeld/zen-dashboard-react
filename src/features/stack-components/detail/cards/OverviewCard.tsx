import { StackComponent } from "../../../../types/stack-component";

type OverviewCardProps = {
	stackComponent: StackComponent;
};

function OverviewCard({ stackComponent }: OverviewCardProps) {
	return (
		<div className="rounded-3xl bg-white p-8">
			<h2 className="mb-8 text-2xl">Overview</h2>
			<dl className="space-y-4">
				<div>
					<dt className="font-medium">ID</dt>
					<dd className="text-neutral-400">{stackComponent.id}</dd>
				</div>
				<div>
					<dt className="font-medium">Name</dt>
					<dd className="text-neutral-400">{stackComponent.name}</dd>
				</div>
				<div>
					<dt className="font-medium">Shared</dt>
					<dd className="text-neutral-400">{stackComponent.is_shared.toString()}</dd>
				</div>
			</dl>
		</div>
	);
}

export default OverviewCard;
