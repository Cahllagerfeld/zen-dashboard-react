import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Welcome from "./Welcome";

describe("Welcome component", () => {
	it("renders the correct greeting for the morning", () => {
		const mockName = "John Doe";

		// Mock the current time to be morning (between 6 and 12)
		vi.setSystemTime(new Date("2023-07-01T09:00:00.000Z"));

		render(<Welcome name={mockName} />);
		const greetingElement = screen.getByText(/Good morning/i);
		expect(greetingElement).toBeInTheDocument();
		expect(greetingElement).toHaveTextContent(mockName);
	});

	it("renders the correct greeting for the afternoon", () => {
		const mockName = "John Doe";

		// Mock the current time to be afternoon (between 12 and 18)
		vi.setSystemTime(new Date("2023-07-01T15:00:00.000Z"));

		render(<Welcome name={mockName} />);
		const greetingElement = screen.getByText(/Good afternoon/i);
		expect(greetingElement).toBeInTheDocument();
		expect(greetingElement).toHaveTextContent(mockName);
	});

	it("renders the correct greeting for the evening", () => {
		const mockName = "John Doe";

		// Mock the current time to be evening (between 18 and 22)
		vi.setSystemTime(new Date("2023-07-01T20:00:00.000Z"));

		render(<Welcome name={mockName} />);
		const greetingElement = screen.getByText(/Good evening/i);
		expect(greetingElement).toBeInTheDocument();
		expect(greetingElement).toHaveTextContent(mockName);
	});
});
