import { useParams } from "react-router-dom";
import { usePipelineDetail } from "@/data/pipelines/detail-pipelines-query";
import { ReactComponent as Run } from "@/assets/run.svg";
import { ReactComponent as Settings } from "@/assets/settings.svg";
import BasePage from "@/components/common/BasePage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import PipelineHeader from "./PipelineHeader";
import { useBreadcrumbs } from "@/components/breadcrumb/BreadcrumbContext";
import { useEffect } from "react";
import RunsTab from "./RunsTab";
import { useTabQuery } from "./useTabQuery";

function PipelineDetail() {
	const { setItems } = useBreadcrumbs();
	const { id } = useParams() as { id: string };
	const { activeTab, handleTabChange } = useTabQuery();

	const { data, isError, isLoading } = usePipelineDetail(id);

	useEffect(() => {
		if (!isLoading && !isError) {
			setItems([
				// Todo: Adjust link here
				{ label: "Pipelines", href: "/workspaces/default/pipelines" },
				{ label: data?.name, href: `/pipelines/${data.id}` }
			]);
		}
	}, [isLoading, isError, setItems]);

	if (isError) {
		return <p>Error</p>;
	}
	if (isLoading) return <p>Fetching</p>;

	return (
		<BasePage header={<PipelineHeader pipeline={data} />}>
			<div className="flex flex-col gap-4 xl:gap-8">
				<Tabs value={activeTab} onValueChange={handleTabChange} defaultValue="runs">
					<TabsList>
						<TabsTrigger icon={<Run />} value="runs">
							Runs
						</TabsTrigger>
						<TabsTrigger icon={<Settings />} value="config">
							Configuration
						</TabsTrigger>
					</TabsList>
					<TabsContent value="runs">
						<RunsTab id={id} />
					</TabsContent>
					<TabsContent value="config">Config to come</TabsContent>
				</Tabs>
			</div>
		</BasePage>
	);
}

export default PipelineDetail;
