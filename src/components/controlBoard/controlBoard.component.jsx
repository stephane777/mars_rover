import React from "react";
import * as SCB from "./controlBoard.style";

const ControlBoard = ({ roverOrder, animation, roverOrders }) => {
	const [inputValue, setInputValue] = React.useState("");

	const handleChange = (e) => {
		e.preventDefault();
		const { value } = e.target;
		const regex = /[frl]/g;
		const match = value.match(regex);
		if (!value || value?.length === match?.length) {
			setInputValue(value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(inputValue);
		// roverOrder(inputValue, 0);
		roverOrders(inputValue);
		return "";
	};
	return (
		<SCB.Wrapper className="controlBoard">
			<SCB.Form onSubmit={handleSubmit}>
				<SCB.Label htmlFor="inputControl" className="search__label">
					Contol Rover
				</SCB.Label>
				<SCB.Input
					type="text"
					id="inputControl"
					onChange={handleChange}
					value={inputValue}
					disabled={animation.length > 0}
				/>
				<button disabled={animation.length > 0 || !inputValue} type="submit">
					Send order to rover
				</button>
			</SCB.Form>
		</SCB.Wrapper>
	);
};

export { ControlBoard };
