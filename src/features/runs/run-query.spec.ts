import { expect, test } from "vitest";
import { getRunQueryKey } from "./run-query";

test("generate a correct query key for Runs", () => {
	const queryKey = getRunQueryKey({ workspace: "default", params: { id: "Test" } });
	expect(queryKey).toStrictEqual(["workspaces", "default", "runs", { id: "Test" }]);
});
