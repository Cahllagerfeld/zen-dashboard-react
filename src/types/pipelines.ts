import { components, operations } from "./core";

export type Pipeline = components["schemas"]["PipelineResponseModel"];

export type PipelinePage = components["schemas"]["Page_PipelineResponseModel_"];

export type PipelineQueryParams = NonNullable<
	operations["list_pipelines_api_v1_pipelines_get"]["parameters"]["query"]
>;

export type ExecutionStatus = components["schemas"]["ExecutionStatus"];

export type StepSpec = components["schemas"]["StepSpec"];

export type PipelineRunQueryParams = NonNullable<
	operations["list_pipeline_runs_api_v1_pipelines__pipeline_id__runs_get"]["parameters"]["query"]
>;
