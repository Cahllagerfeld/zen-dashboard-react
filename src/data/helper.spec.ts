import { objectToSearchParams } from "./helper";
import { describe, it, expect } from "vitest";

describe("objectToSearchParams", () => {
	it("should convert an object to URLSearchParams correctly", () => {
		const object = {
			key1: "value1",
			key2: "value2",
			key3: null,
			key4: undefined
		};
		const expectedSearchParams = new URLSearchParams();
		expectedSearchParams.set("key1", "value1");
		expectedSearchParams.set("key2", "value2");

		const result = objectToSearchParams(object);

		expect(result.toString()).toEqual(expectedSearchParams.toString());
	});

	it("should handle empty object correctly", () => {
		const object = {};
		const expectedSearchParams = new URLSearchParams();

		const result = objectToSearchParams(object);

		expect(result.toString()).toEqual(expectedSearchParams.toString());
	});

	it("should handle object with null and undefined values correctly", () => {
		const object = {
			key1: null,
			key2: undefined
		};
		const expectedSearchParams = new URLSearchParams();

		const result = objectToSearchParams(object);

		expect(result.toString()).toEqual(expectedSearchParams.toString());
	});
});
