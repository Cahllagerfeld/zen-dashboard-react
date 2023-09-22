interface WorkspaceStatisticsCardProps {
	label: string;
	value: string;
}

function WorkspaceStatisticsCard({ label, value }: WorkspaceStatisticsCardProps) {
	return (
		<div className="flex w-full flex-col gap-2 rounded-md bg-white p-4">
			<h2 className="first-letter:uppercase">{label}</h2>
			<p className="text-2xl font-medium">{value}</p>
		</div>
	);
}

export default WorkspaceStatisticsCard;
