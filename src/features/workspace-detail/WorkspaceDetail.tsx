import { useParams } from "react-router-dom";
import { useWorkspaceStatisticsQuery } from "./workspace-detail-query";
import WorkspaceStatisticsCard from "./WorkspaceStatisticsCard";
import WorkspaceSkeletonStatisticsCard from "./WorkspaceStatisticsSkeletonCard";

function WorkspaceDetail() {
	const { workspace } = useParams() as { workspace: string };
	const { data } = useWorkspaceStatisticsQuery({ workspace });
	return (
		<div>
			<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
				{Object.entries(data || { 0: 0, 1: 0, 2: 0, 3: 0 })
					.sort((a, b) => a[0].localeCompare(b[0]))
					.map(([key, value], index) => (
						<li key={index}>
							{data ? (
								<WorkspaceStatisticsCard label={key} value={value} />
							) : (
								<WorkspaceSkeletonStatisticsCard />
							)}
						</li>
					))}
			</ul>
		</div>
	);
}

export default WorkspaceDetail;
