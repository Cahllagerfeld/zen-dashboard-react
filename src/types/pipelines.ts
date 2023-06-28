import { components, operations } from "./core";

export type Pipeline = components["schemas"]["PipelineResponseModel"];

export type PipelinePage = components["schemas"]["Page_PipelineResponseModel_"];

export type PipelineQueryParams = NonNullable<
	operations["list_pipelines_api_v1_pipelines_get"]["parameters"]["query"]
>;
