// check if the next move is inside the Grid
export const isNextMoveNotAllowed = (position) => {
	let isRoverMovingAwayFromGrid = false;
	switch (currentDirection) {
		case "N":
			// console.log("N", position);
			if (position[1] + 1 > 9) isRoverMovingAwayFromGrid = true;
			break;
		case "S":
			if (position[1] - 1 < 0) isRoverMovingAwayFromGrid = true;
			break;
		case "E":
			if (position[0] + 1 > 9) isRoverMovingAwayFromGrid = true;
			break;
		case "W":
			if (position[0] - 1 < 0) isRoverMovingAwayFromGrid = true;
			break;
		default:
			isRoverMovingAwayFromGrid = false;
	}
	return isRoverMovingAwayFromGrid;
};
