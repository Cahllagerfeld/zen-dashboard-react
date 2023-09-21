import { useParams } from "react-router-dom";
import { usePipelineDetail } from "./query";
import { ReactComponent as Run } from "@/assets/run.svg";
import { ReactComponent as Settings } from "@/assets/settings.svg";
import BasePage from "@/components/common/BasePage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import PipelineHeader from "./PipelineHeader";

function PipelineDetail() {
	const { id } = useParams() as { id: string };

	const { data, isError, isLoading } = usePipelineDetail(id);

	if (isError) {
		return <p>Error</p>;
	}
	if (isLoading) return <p>Fetching</p>;

	return (
		<BasePage header={<PipelineHeader pipeline={data} />}>
			<div className="flex flex-col gap-4 xl:gap-8">
				<Tabs defaultValue="account">
					<TabsList>
						<TabsTrigger icon={<Run />} value="account">
							Runs
						</TabsTrigger>
						<TabsTrigger icon={<Settings />} value="password">
							Configuration
						</TabsTrigger>
					</TabsList>
					<TabsContent value="account">Make changes to your account here.</TabsContent>
					<TabsContent value="password">Change your password here.</TabsContent>
				</Tabs>
			</div>
		</BasePage>
	);
}

export default PipelineDetail;
