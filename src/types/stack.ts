import { components, operations } from "./core";

export type Stack = components["schemas"]["ComponentResponseModel"];

export type StackPage = components["schemas"]["Page_ComponentResponseModel_"];

export type StackQueryParams = NonNullable<
	operations["list_stacks_api_v1_stacks_get"]["parameters"]["query"]
>;
