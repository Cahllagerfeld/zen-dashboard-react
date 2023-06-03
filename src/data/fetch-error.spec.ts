import { TestContext, describe } from "vitest";
import { FetchError } from "./fetch-error";

describe("FetchError", (test) => {
	// Test case 1: Verify the instance properties
	test("should have correct instance properties", (context: TestContext) => {
		const error = new FetchError({
			message: "Not Found",
			status: 404,
			statusText: "Not Found"
		});

		context.expect(error.status).toBe(404);
		context.expect(error.statusText).toBe("Not Found");
		context.expect(error.message).toBe("Not Found");
	});

	// Test case 2: Verify the inherited properties and behavior
	test("should be an instance of Error", (context: TestContext) => {
		const error = new FetchError({
			message: "Not Found",
			status: 404,
			statusText: "Not Found"
		});

		context.expect(error).toBeInstanceOf(Error);
		context.expect(error).toBeInstanceOf(FetchError);
		context.expect(error.message).toBe("Not Found");
	});

	// Test case 3: Verify the thrown error
	test("should throw an error with the specified message", (context: TestContext) => {
		const errorMessage = "Internal Server Error";
		const errorFn = () => {
			throw new FetchError({
				message: errorMessage,
				status: 500,
				statusText: "Internal Server Error"
			});
		};

		context.expect(errorFn).toThrowError(errorMessage);
	});
});
