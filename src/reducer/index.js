export const initialState = {
	position: [0, 0, 0],
	error: "",
	animation: "",
	orders: {
		string: "",
		step: 0,
	},
};
export const reducer = (state, action) => {
	const getDegree = (degree) => {
		const deg = degree % 360;
		return deg >= 0 ? deg : deg + 360;
	};

	switch (action.type) {
		case "MOVE_FORWARD":
			return {
				...state,
				animation: "",
				position: state.position.map((pos, i) => {
					// Grid x direction
					const degree = getDegree(state.position[2]);
					if (!i) {
						return degree === 90 ? pos + 1 : degree === 270 ? pos - 1 : pos;
						// Grid y direction
					} else if (i === 1) {
						return degree === 0 ? pos + 1 : degree === 180 ? pos - 1 : pos;
					} else {
						return pos;
					}
				}),
			};
		case "MOVE_RIGHT":
			return {
				...state,
				animation: "",
				position: [...state.position.slice(0, 2), state.position[2] + 90],
			};
		case "MOVE_LEFT":
			return {
				...state,
				animation: "",
				position: [...state.position.slice(0, 2), state.position[2] - 90],
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
				animation: action.move,
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
				position: [0, 0, 0],
			};
		default:
			return state;
	}
};
