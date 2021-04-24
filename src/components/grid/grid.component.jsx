import React from "react";
import * as SG from "./grid.style";
import rover from "../../assets/imgs/rover.png";
import PropTypes from "prop-types";

const Grid = ({ position, animation, direction, roverOrientation }) => {
	const grid = [...Array(100).keys()];

	return (
		<SG.GridWrapper className="grid">
			{grid.map((cell, i) => {
				// const index = `${99 - i}`.length === 1 ? `0${99 - i}` : `${99 - i}`;
				const index = `${20 - i}`.length === 1 ? `0${20 - i}` : `${99 - i}`;
				const switchIndex = `${index[1]}${index[0]}`;
				const matchIndex = `${position[1]}${position[0]}`;
				const isPositionMatchIndex = matchIndex === index;
				return (
					<SG.Cell key={i} id={switchIndex} data-testid={switchIndex}>
						{isPositionMatchIndex && (
							<SG.Rover
								src={rover}
								alt="rover"
								animation={animation}
								direction={direction}
								roverOrientation={roverOrientation}
								data-testid={`rover_${switchIndex}`}
							></SG.Rover>
						)}
					</SG.Cell>
				);
			})}
		</SG.GridWrapper>
	);
};
Grid.prototype = {
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
	animation: PropTypes.array.isRequired,
	direction: PropTypes.string.isRequired,
	roverOrientation: PropTypes.number.isRequired,
};
export { Grid };
