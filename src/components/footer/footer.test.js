import React from "react";
import "@testing-library/jest-dom";
import axios from "axios";
import { render, screen, act, cleanup } from "@testing-library/react";
import { Footer } from "./footer.component";

afterEach(cleanup);

describe("it should render the component", () => {
	it("should render the footer component", () => {
		const { container } = render(<Footer />);
		expect(container.firstChild.className).toMatch("footer");
	});
	it("should show Created by ...", () => {
		render(<Footer />);
		expect(
			screen.getByText(/Created by Stephane Candelas./i)
		).toBeInTheDocument();
	});
	it("should contain a link", () => {
		render(<Footer />);
		expect(screen.queryByTestId("github-link")).toBeTruthy();
		expect(screen.queryByTestId("github-svg")).toBeTruthy();
	});
});
describe("it should match the snapshot", () => {
	it("should match snapshot", () => {
		const testUnit = render(<Footer />);
		expect(testUnit).toMatchSnapshot();
	});
});
