import React from "react";
import "@testing-library/jest-dom";
import {
	render,
	screen,
	act,
	within,
	waitForElementToBeRemoved,
	waitFor,
	cleanup,
	fireEvent,
} from "@testing-library/react";
import { App } from "./app.component";

afterEach(cleanup);

describe("it should render the component", () => {
	it("should render the footer component", () => {
		const { container } = render(<App />);
		expect(container.firstChild.className).toMatch("App");
	});
	it("should show Rover Control Board", () => {
		render(<App />);
		expect(screen.getByRole("heading")).toBeInTheDocument();
		expect(screen.getByText(/rover control board/i)).toBeInTheDocument();
	});
	it("should show Send order to rover", () => {
		render(<App />);
		expect(screen.getByLabelText("Send order to rover:")).toBeInTheDocument();
		expect(screen.getByText(/send order to rover:/i)).toBeInTheDocument();
	});
	it("should show Rover Direction", () => {
		render(<App />);
		expect(screen.getByText(/rover direction/i)).toBeInTheDocument();
	});
	it("should show Rover position", () => {
		render(<App />);
		expect(screen.getByText(/rover position/i)).toBeInTheDocument();
	});
	it("should show a Go! button and disabled", () => {
		render(<App />);
		expect(screen.getByRole("button", { name: /Go!/i })).toBeDisabled();
		expect(screen.getByRole("button", { name: /Go!/i })).toBeInTheDocument();
	});
	it("should show a reset position button", () => {
		render(<App />);
		expect(screen.getByRole("button", { name: /reset/i })).not.toBeDisabled();
		expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
	});

	it("should contain a grid with 100 cell", () => {
		const arrayOf100 = [...Array(100).keys()];

		render(<App />);
		expect.assertions(100);
		arrayOf100.forEach((cell, i) => {
			const dataTestId = `${i}`.length === 1 ? `0${i}` : i;
			expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
		});
	});

	it("should show the Rover image at position [0,0]", () => {
		render(<App />);
		const cellInitialPosition = document.getElementById("00");
		expect(screen.getByRole("img", { name: /rover/i })).toBeInTheDocument();
		expect(screen.getByRole("img", { name: /rover/i })).toHaveAttribute(
			"alt",
			"rover"
		);
		const img = within(cellInitialPosition).getByRole("img", {
			name: /rover/i,
		});
		expect(img).toBeInTheDocument();
	});

	// it("should move the rover to the right", async () => {
	// 	render(<App />);
	// 	// const cellInitialPosition = document.getElementById("10");

	// 	const goButton = screen.getByRole("button", { name: /Go!/i });
	// 	const input = screen.getByRole("textbox", {
	// 		name: /send order to rover:/i,
	// 	});
	// 	expect(screen.getByTestId(/rover_09/)).toBeInTheDocument();
	// 	act(() => {
	// 		fireEvent.change(input, {
	// 			target: { value: "r" },
	// 		});
	// 		fireEvent.click(goButton);
	// 	});
	// 	await waitFor(() => {
	// 		expect(screen.getByTestId("rover_19")).toBeInTheDocument();
	// 	});
	// 	// await waitForElementToBeRemoved(() => screen.getByTestId(/rover_09/i));
	// 	screen.debug();

	// 	// const rover = await screen.findByTestId(`rover_09`);
	// 	// expect(rover).toBeInTheDocument();
	// });

	describe("it should match the snapshot", () => {
		it("should match snapshot", () => {
			const testUnit = render(<App />);
			expect(testUnit).toMatchSnapshot();
		});
	});
});
