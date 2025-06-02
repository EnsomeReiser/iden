import { Slot } from "@/components/slot";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "bun:test";
import type React from "react";
import { createRoot } from "react-dom/client";

describe("Slot component", () => {
	test("should return null with empty children", () => {
		const div = render(<Slot />);
		expect(div.container.innerHTML).toBe("");
	});

	test("should throw error if more than one children", () => {
		expect(() =>
			render(
				<Slot>
					<div>Hello,</div>
					<div>World</div>
				</Slot>,
			),
		).toThrow("Only one child allowed");
	});

	test("should return null on invalid children", () => {
		const div = render(<Slot>{null}</Slot>);
		expect(div.container.innerHTML).toBe("");
	});

	test("should merge children className", () => {
		const div = render(
			<Slot className="outer">
				<div className="inner">Hello, World!</div>
			</Slot>,
		);

		expect(div.getByText("Hello, World!").className).toBe("outer inner");
	});
});
