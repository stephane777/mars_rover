import React from "react";
import * as SCB from "./controlBoard.style";
import PropTypes from "prop-types";
import { getDegree, getCardinal } from "../../utils";

const ControlBoard = ({ animation, roverOrders, position, resetPosition }) => {
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

		roverOrders(inputValue);
		setInputValue("");
	};
	return (
		<SCB.Wrapper className="controlBoard">
			<SCB.Form onSubmit={handleSubmit}>
				<SCB.Row>
					<SCB.ColumnLabel>
						<SCB.Label htmlFor="inputControl" className="search__label">
							Send order to rover:
						</SCB.Label>
					</SCB.ColumnLabel>
					<SCB.ColumnData
						style={{ display: "flex", justifyContent: "space-between" }}
					>
						<SCB.Input
							type="text"
							id="inputControl"
							onChange={handleChange}
							value={inputValue}
							disabled={animation.length > 0 && !inputValue}
						/>
						<SCB.Button disabled={!inputValue} type="submit">
							Go!
						</SCB.Button>
					</SCB.ColumnData>
				</SCB.Row>
				<SCB.Row>
					<SCB.ColumnLabel>
						<SCB.Label>Rover direction:</SCB.Label>
					</SCB.ColumnLabel>
					<SCB.ColumnData>
						<SCB.Direction>{getCardinal(getDegree(position[2]))}</SCB.Direction>
					</SCB.ColumnData>
				</SCB.Row>
			</SCB.Form>
			<SCB.Row>
				<SCB.ColumnLabel>
					<SCB.Label> Rover position:</SCB.Label>
				</SCB.ColumnLabel>
				<SCB.ColumnData
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<SCB.Label>{`X:${position[0]} Y:${position[1]}`}</SCB.Label>
					<SCB.Button onClick={resetPosition}>Reset</SCB.Button>
				</SCB.ColumnData>
			</SCB.Row>
		</SCB.Wrapper>
	);
};

ControlBoard.prototype = {
	animation: PropTypes.array.isRequired,
	direction: PropTypes.string.isRequired,
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
	resetPosition: PropTypes.func.isRequired,
	roverOrders: PropTypes.func.isRequired,
};
export { ControlBoard };
