import { useParams } from "react-router-dom";
import { useWorkspaceStatisticsQuery } from "../../../data/workspaces/detail-workspaces-query";
import WorkspaceStatisticsCard from "./WorkspaceStatisticsCard";
import WorkspaceSkeletonStatisticsCard from "./WorkspaceStatisticsSkeletonCard";
import BasePage from "@/components/common/BasePage";
import DefaultHeader from "@/components/DefaultHeader";

function WorkspaceDetail() {
	const { workspace } = useParams() as { workspace: string };
	const { data } = useWorkspaceStatisticsQuery({ workspace });
	return (
		<BasePage header={<DefaultHeader title="Workspaces" />}>
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
		</BasePage>
	);
}

export default WorkspaceDetail;
