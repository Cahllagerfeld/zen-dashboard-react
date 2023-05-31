import { routePaths } from "./route-paths";
import { describe, it, expect } from "vitest";

describe("routePaths", () => {
	it("should generate correct path for home", () => {
		const expectedPath = "/";
		expect(routePaths.home()).toEqual(expectedPath);
	});

	it("should generate correct path for login", () => {
		const expectedPath = "/login";
		expect(routePaths.login()).toEqual(expectedPath);
	});

	it("should generate correct path for workspaces.detail", () => {
		const workspaceID = "example";
		const expectedPath = `/workspaces/${workspaceID}`;
		expect(routePaths.workspaces.detail(workspaceID)).toEqual(expectedPath);
	});

	it("should generate correct path for components.overview", () => {
		const workspaceID = "example";
		const expectedPath = `/workspaces/${workspaceID}/components`;
		expect(routePaths.components.overview(workspaceID)).toEqual(expectedPath);
	});
});
