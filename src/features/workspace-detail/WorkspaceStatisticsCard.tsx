interface WorkspaceStatisticsCardProps {
	label: string;
	value: string;
}

function WorkspaceStatisticsCard({ label, value }: WorkspaceStatisticsCardProps) {
	return (
		<div className="flex w-full flex-col gap-2 rounded-lg bg-white p-4 hover:bg-gradient-to-br hover:from-primary hover:to-primary-light hover:text-white">
			<h2 className="first-letter:uppercase">{label}</h2>
			<p className="text-2xl font-medium">{value}</p>
		</div>
	);
}

export default WorkspaceStatisticsCard;
