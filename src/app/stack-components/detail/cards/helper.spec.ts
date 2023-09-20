import { describe, it, expect } from "vitest";
import { titleCase } from "./helper";

describe("titleCase", () => {
	it("should capitalize the first letter of a single word", () => {
		const input = "hello";
		const expectedOutput = "Hello";
		const output = titleCase(input);
		expect(output).toEqual(expectedOutput);
	});

	it("should capitalize the first letter of each word separated by hyphens", () => {
		const input = "hello-world";
		const expectedOutput = "Hello World";
		const output = titleCase(input);
		expect(output).toEqual(expectedOutput);
	});

	it("should capitalize the first letter of each word separated by underscores", () => {
		const input = "hello_world";
		const expectedOutput = "Hello World";
		const output = titleCase(input);
		expect(output).toEqual(expectedOutput);
	});

	it("should ignore leading hyphens and underscores", () => {
		const input = "-hello_world";
		const expectedOutput = "Hello World";
		const output = titleCase(input);
		expect(output).toEqual(expectedOutput);
	});

	it("should return an empty string for an empty input", () => {
		const input = "";
		const expectedOutput = "";
		const output = titleCase(input);
		expect(output).toEqual(expectedOutput);
	});
});
