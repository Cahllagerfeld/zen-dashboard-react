import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import KeyValue from "./KeyValue";

describe("KeyValue component", () => {
	it("renders the provided key and value", () => {
		const mockKey = "Name";
		const mockValue = "John Doe";

		render(<KeyValue itemKey={mockKey} value={mockValue} />);

		const keyElement = screen.getByText(mockKey);
		expect(keyElement).toBeInTheDocument();

		const valueElement = screen.getByText(mockValue);
		expect(valueElement).toBeInTheDocument();
	});

	it("renders the provided value as React Node", () => {
		const mockKey = "Age";
		const mockValue = <h2>25</h2>;

		render(<KeyValue itemKey={mockKey} value={mockValue} />);

		const keyElement = screen.getByText(mockKey);
		expect(keyElement).toBeInTheDocument();

		const valueElement = screen.getByRole("heading", { level: 2 });
		expect(valueElement).toBeInTheDocument();
		expect(valueElement).toHaveTextContent("25");
	});
});
