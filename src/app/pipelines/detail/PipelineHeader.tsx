import { Pipeline } from "@/types/pipelines";
import { convertUTC } from "../../../lib/dates";
import StatusOverview from "../StatusOverview";

type Props = {
	pipeline: Pipeline;
};

export default function PipelineHeader({ pipeline }: Props) {
	return (
		<div className="flex w-full flex-col justify-center gap-2 border-b border-theme-border-moderate bg-theme-surface-primary p-5">
			<p className="text-text-sm text-theme-text-secondary">{pipeline.id.split("-")[0]}</p>
			<div className="flex items-center gap-2">
				<h1 className="text-display-xs font-semibold">{pipeline.name}</h1>
				<p className="flex min-h-[28px] min-w-[48px] items-center justify-center rounded-rounded bg-primary-50 text-text-sm font-semibold text-primary-500">
					v{pipeline.version}
				</p>
				<StatusOverview status={pipeline.status!} />
			</div>
			<p className="text-text-sm text-theme-text-secondary">
				Created by <span className="text-theme-text-primary">{pipeline.user?.name}</span> at{" "}
				{convertUTC(pipeline.created)}
			</p>
		</div>
	);
}
