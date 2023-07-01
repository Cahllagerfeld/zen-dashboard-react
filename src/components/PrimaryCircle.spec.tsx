import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PrimaryCircle from "./PrimaryCircle";

describe("PrimaryCircle", () => {
	it("renders the provided text as the first character inside a circle", () => {
		const { getByText } = render(<PrimaryCircle text="Hello" />);
		const circle = getByText("H");

		expect(circle).toBeInTheDocument();
		expect(circle.tagName).toBe("SPAN");
		expect(circle).toHaveClass("text-xl uppercase text-white");
	});

	it('renders the circle with the background color of "primary"', () => {
		const { container } = render(<PrimaryCircle text="Hello" />);
		const circle = container.querySelector(".bg-primary");

		expect(circle).toBeInTheDocument();
		expect(circle.tagName).toBe("DIV");
		expect(circle).toHaveClass("flex h-12 w-12 items-center justify-center rounded-full");
	});
});
