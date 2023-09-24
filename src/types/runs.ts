import { components, operations } from "./core";

export type Run = components["schemas"]["PipelineRunResponseModel"];

export type RunQueryParams = NonNullable<
	operations["list_runs_api_v1_runs_get"]["parameters"]["query"]
>;

export type RunsPage = components["schemas"]["Page_PipelineRunResponseModel_"];
