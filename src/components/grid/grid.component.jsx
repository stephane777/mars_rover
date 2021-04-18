import React from "react";
import * as SG from "./grid.style";
import rover from "../../assets/imgs/rover.png";

const Grid = ({ position, animation, direction, roverOrientation }) => {
	const grid = [...Array(100).keys()];
	// console.log(`animation from Grid`);
	// console.log(animation);
	// console.log(`props.direction from Grid: ${direction}`);
	console.log(`roverOrientation from Grid : ${roverOrientation}`);
	return (
		<SG.GridWrapper className="grid">
			{grid.map((cell, i) => {
				const index = `${99 - i}`.length === 1 ? `0${99 - i}` : `${99 - i}`;
				const switchIndex = `${index[1]}${index[0]}`;
				const matchIndex = `${position[1]}${position[0]}`;
				const isPositionMatchIndex = matchIndex === index;
				return (
					<SG.Cell key={i} id={switchIndex}>
						{isPositionMatchIndex && (
							<SG.Rover
								src={rover}
								alt="rover"
								animation={animation}
								direction={direction}
								roverOrientation={roverOrientation}
							></SG.Rover>
						)}
					</SG.Cell>
				);
			})}
		</SG.GridWrapper>
	);
};

export { Grid };
