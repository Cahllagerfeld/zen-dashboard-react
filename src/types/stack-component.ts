import { components, operations } from "./core";

export type StackComponent = components["schemas"]["ComponentResponseModel"];

export type StackComponentPage = components["schemas"]["Page_ComponentResponseModel_"];

export type StackComponentType = components["schemas"]["StackComponentType"];

export type StackComponentQueryParams = NonNullable<
	operations["list_stack_components_api_v1_components_get"]["parameters"]["query"]
>;
