import { RunQueryParams } from "@/types/runs";
import { getRunKey } from "./all-runs-query";
import { describe, test, expect } from "vitest";

describe("getRunQueryKey", () => {
	test("should return the correct query key when all params are provided", () => {
		const workspace = "exampleWorkspace";
		const params: RunQueryParams = {
			sort_by: "name",
			logical_operator: "or",
			page: 1,
			size: 10,
			id: "123",
			created: "2023-01-01",
			updated: "2023-02-01",
			scope_workspace: "exampleScope",
			name: "exampleName",
			orchestrator_run_id: "456",
			pipeline_id: "789",
			workspace_id: "101112",
			user_id: "131415",
			stack_id: "161718",
			schedule_id: "192021",
			build_id: "222324",
			deployment_id: "252627",
			code_repository_id: "282930",
			status: "running",
			start_time: "2023-03-01",
			end_time: "2023-04-01",
			num_steps: 50,
			unlisted: true
		};
		const expectedKey = ["workspaces", workspace, "runs", params];

		const result = getRunKey({ workspace, params });

		expect(result).toEqual(expectedKey);
	});

	test("should return the correct query key when only required params are provided", () => {
		const workspace = "exampleWorkspace";
		const params: RunQueryParams = {};

		const expectedKey = ["workspaces", workspace, "runs", params];

		const result = getRunKey({ workspace, params });

		expect(result).toEqual(expectedKey);
	});

	test("should return the correct query key when only workspace is provided", () => {
		const workspace = "exampleWorkspace";
		const params: RunQueryParams = {};

		const expectedKey = ["workspaces", workspace, "runs", params];

		const result = getRunKey({ workspace, params });

		expect(result).toEqual(expectedKey);
	});

	test("should return the correct query key when only params are provided", () => {
		const workspace = "";
		const params: RunQueryParams = {
			sort_by: "name",
			logical_operator: "and",
			page: 2,
			size: 20
		};
		const expectedKey = ["workspaces", workspace, "runs", params];

		const result = getRunKey({ workspace, params });

		expect(result).toEqual(expectedKey);
	});

	test("should return the correct query key when workspace and a single param are provided", () => {
		const workspace = "exampleWorkspace";
		const params: RunQueryParams = {
			sort_by: "name"
		};
		const expectedKey = ["workspaces", workspace, "runs", params];

		const result = getRunKey({ workspace, params });

		expect(result).toEqual(expectedKey);
	});
});
