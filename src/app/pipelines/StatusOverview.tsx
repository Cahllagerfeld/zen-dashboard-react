import { ExecutionStatus } from "@/types/pipelines";
import StatusBadge from "./StatusBadge";

function StatusOverview({ status }: { status: ExecutionStatus[] }) {
	return (
		<div className="flex gap-2">
			{status.map((status, i) => (
				<StatusBadge key={i} status={status} />
			))}
		</div>
	);
}

export default StatusOverview;
