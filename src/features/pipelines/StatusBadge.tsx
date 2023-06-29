import { ReactComponent as Check } from "@/assets/check.svg";
import { ReactComponent as X } from "@/assets/x.svg";
import { ExecutionStatus } from "@/types/pipelines";

type StatusBadgeProps = {
	status: ExecutionStatus;
};

function StatusBadge({ status }: StatusBadgeProps) {
	if (status === "failed") return <X className="stroke-red-700" />;
	return <Check className="stroke-green-700" />;
}

export default StatusBadge;
