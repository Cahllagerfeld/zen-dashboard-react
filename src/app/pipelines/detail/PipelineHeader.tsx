import { Pipeline } from "@/types/pipelines";
import { convertUTC } from "../../../lib/dates";
import StatusOverview from "../StatusOverview";
import { Badge } from "@/components/BadgeNew";

type Props = {
	pipeline: Pipeline;
};

export default function PipelineHeader({ pipeline }: Props) {
	return (
		<div className="flex w-full flex-col justify-center gap-2 border-b border-theme-border-moderate bg-theme-surface-primary p-5">
			<p className="text-text-sm text-theme-text-secondary">{pipeline.id.split("-")[0]}</p>
			<div className="flex items-center gap-2">
				<h1 className="text-display-xs font-semibold">{pipeline.name}</h1>
				<Badge>v{pipeline.version}</Badge>
				<StatusOverview status={pipeline.status!} />
			</div>
			<p className="text-text-sm text-theme-text-secondary">
				Created by <span className="text-theme-text-primary">{pipeline.user?.name}</span> at{" "}
				{convertUTC(pipeline.created)}
			</p>
		</div>
	);
}
