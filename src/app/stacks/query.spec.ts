import { StackQueryOverview, getStackQueryKey } from "./query";
import { describe, it, expect } from "vitest";

describe("getStackQueryKey", () => {
	it("returns the correct stack query key", () => {
		const input: StackQueryOverview = {
			workspace: "exampleWorkspace",
			params: { component_id: "123" }
		};

		const expectedOutput = ["workspaces", "exampleWorkspace", "stacks", { component_id: "123" }];
		const output = getStackQueryKey(input);

		expect(output).toEqual(expectedOutput);
	});
});
