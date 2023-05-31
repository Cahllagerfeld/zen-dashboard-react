import { apiPaths, createApiPath } from "./api";
import { describe, it, expect } from "vitest";

describe("apiPaths", () => {
	it("should have the correct values for currentUser, login, workspaces.base", () => {
		expect(apiPaths.currentUser).toEqual("/current-user");
		expect(apiPaths.login).toEqual("/login");
		expect(apiPaths.workspaces.base).toEqual("/workspaces");
	});

	it("should generate correct values for workspaces.statistics", () => {
		const workspace = "example";
		const expectedPath = "/workspaces/example/statistics";
		expect(apiPaths.workspaces.statistics(workspace)).toEqual(expectedPath);
	});

	it("should generate correct values for workspaces.components", () => {
		const workspace = "example";
		const expectedPath = "/workspaces/example/components";
		expect(apiPaths.workspaces.components(workspace)).toEqual(expectedPath);
	});
});

describe("createApiPath", () => {
	it("should generate correct API path when given a path", () => {
		const path = "/example";
		const expectedApiPath = `${import.meta.env.VITE_API_BASE_URL}/example`;
		expect(createApiPath(path)).toEqual(expectedApiPath);
	});
});
