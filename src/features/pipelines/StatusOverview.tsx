import { ExecutionStatus } from "@/types/pipelines";
import StatusBadge from "./StatusBadge";

function StatusOverview({ status }: { status: ExecutionStatus[] }) {
	return (
		<div className="flex gap-2">
			{status.map((status) => (
				<StatusBadge status={status} />
			))}
		</div>
	);
}

export default StatusOverview;
