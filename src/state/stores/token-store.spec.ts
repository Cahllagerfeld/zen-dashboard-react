import { describe, it, expect } from "vitest";
import { useTokenStore } from "./token-store";

describe("useTokenStore", () => {
	// Test case 1: Verify initial state
	it("should have an empty token on initialization", () => {
		const { token } = useTokenStore.getState();

		expect(token).toBe("");
	});

	// Test case 2: Verify setToken function
	it("should update token when setToken is called", () => {
		const { setToken, token } = useTokenStore.getState();

		expect(token).toBe("");

		setToken("my-token");

		expect(token).toBe("my-token");
	});

	// Test case 3: Verify reset function
	it("should reset token when reset is called", () => {
		const { setToken, reset, token } = useTokenStore.getState();

		setToken("my-token");

		expect(token).toBe("my-token");

		reset();

		expect(token).toBe("");
	});
});
