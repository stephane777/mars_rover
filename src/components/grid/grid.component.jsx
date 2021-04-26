import React from "react";
import * as SG from "./grid.style";
import rover from "../../assets/imgs/rover.png";
import PropTypes from "prop-types";

const Grid = ({ position, animation }) => {
	return (
		<SG.GridWrapper className="grid">
			<SG.Grid>
				<SG.Rover
					position={position}
					src={rover}
					alt="rover"
					animation={animation}
				></SG.Rover>
			</SG.Grid>
		</SG.GridWrapper>
	);
};
Grid.prototype = {
	position: PropTypes.arrayOf(PropTypes.number).isRequired,
	animation: PropTypes.array.isRequired,
};
export { Grid };
