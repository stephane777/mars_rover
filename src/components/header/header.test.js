import React from "react";
import "@testing-library/jest-dom";

import { render, screen, cleanup } from "@testing-library/react";
import { Header } from "./header.component";

afterEach(cleanup);

describe("it should render the component", () => {
	it("should render the footer component", () => {
		const { container } = render(<Header />);
		expect(container.firstChild.className).toMatch("header");
	});
	it("should show the logo", () => {
		render(<Header />);
		expect(screen.getByTestId("logo")).toBeTruthy();
	});
	it("should show monzo", () => {
		render(<Header />);
		expect(screen.getByText(/mars rover/i)).toBeInTheDocument();
	});
});
describe("it should match the snapshot", () => {
	it("should match snapshot", () => {
		const testUnit = render(<Header />);
		expect(testUnit).toMatchSnapshot();
	});
});
