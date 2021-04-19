export const initialState = {
	position: [0, 0],
	currentDirection: "N",
	error: "",
	animation: [],
	roverOrientation: 0,
	orders: {
		string: "",
		step: 0,
	},
};
export const reducer = (state, action) => {
	const move_right = {
		N: "E",
		E: "S",
		S: "W",
		W: "N",
	};
	const move_left = {
		N: "W",
		E: "N",
		S: "E",
		W: "S",
	};

	switch (action.type) {
		case "MOVE_FORWARD":
			return {
				...state,
				animation: [],
				position: state.position.map((pos, i) => {
					// Grid x direction
					if (!i) {
						return state.currentDirection === "E"
							? pos + 1
							: state.currentDirection === "W"
							? pos - 1
							: pos;
						// Grid y direction
					} else {
						return state.currentDirection === "N"
							? pos + 1
							: state.currentDirection === "S"
							? pos - 1
							: pos;
					}
				}),
			};
		case "MOVE_RIGHT":
			return {
				...state,
				animation: [],
				currentDirection: move_right[state.currentDirection],
				roverOrientation: state.roverOrientation + 90,
			};
		case "MOVE_LEFT":
			return {
				...state,
				animation: [],
				currentDirection: move_left[state.currentDirection],
				roverOrientation: state.roverOrientation - 90,
			};
		case "SET_ERROR":
			return {
				...state,
				error: action.message,
				orders: {
					string: "",
					step: 0,
				},
			};
		case "RESET_ERROR":
			return {
				...state,
				error: "",
			};
		case "START_ANIMATION":
			return {
				...state,
				animation: [action.direction, action.move],
			};
		case "SET_ORDERS":
			return {
				...state,
				orders: {
					string: action.orders.string,
					step: action.orders.step,
				},
			};
		case "RESET_ORDERS":
			return {
				...state,
				orders: {
					string: "",
					step: 0,
				},
			};
		case "RESET_POSITION":
			return {
				...state,
				position: [0, 0],
			};
		default:
			return state;
	}
};
