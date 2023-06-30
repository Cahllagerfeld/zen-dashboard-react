import { ReactComponent as Check } from "@/assets/check.svg";
import { ReactComponent as X } from "@/assets/x.svg";
import { ExecutionStatus } from "@/types/pipelines";
import * as Tooltip from "@radix-ui/react-tooltip";

type StatusBadgeProps = {
	status: ExecutionStatus;
};

function StatusBadge({ status }: StatusBadgeProps) {
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<div>
						{status === "failed" && <X className="stroke-red-700" />}
						{status === "completed" && <Check className="stroke-green-700" />}
					</div>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						sideOffset={1}
						className="rounded-md bg-white px-4 py-2 leading-none shadow-sharper "
					>
						{status}
						<Tooltip.Arrow className="fill-white" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}

export default StatusBadge;
