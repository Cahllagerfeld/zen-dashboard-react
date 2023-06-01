import { getStackComponentQueryKey, StackComponentDetailQuery } from "./query";
import { describe, it, expect } from "vitest";

describe("getStackComponentQueryKey", () => {
	it("returns the correct query key", () => {
		const query: StackComponentDetailQuery = {
			id: "abc123"
		};
		const expectedQueryKey: string[] = ["components", "abc123"];

		const result = getStackComponentQueryKey(query);

		expect(result).toEqual(expectedQueryKey);
	});

	it("returns the correct query key for numeric id", () => {
		const query: StackComponentDetailQuery = {
			id: "123"
		};
		const expectedQueryKey: string[] = ["components", "123"];

		const result = getStackComponentQueryKey(query);

		expect(result).toEqual(expectedQueryKey);
	});

	it("returns the correct query key for special characters in id", () => {
		const query: StackComponentDetailQuery = {
			id: "!@#$%^&*()_+"
		};
		const expectedQueryKey: string[] = ["components", "!@#$%^&*()_+"];

		const result = getStackComponentQueryKey(query);

		expect(result).toEqual(expectedQueryKey);
	});
});
