import { components, operations } from "./core";

export type Run = components["schemas"]["PipelineRunResponseModel"];

export type RunQueryParams = operations["list_runs_api_v1_runs_get"]["parameters"]["query"];
