import React from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import { Grid } from "../grid";
import * as SA from "./app.style";
import { ControlBoard } from "../controlBoard/controlBoard.component";

const initialState = {
	position: [0, 0],
	currentDirection: "N",
	error: "",
	animation: [],
};

const reducer = (state, action) => {
	// const { position, currentDirection, error } = state;
	console.log("Reducer action: ");
	console.log(action);

	const move_right = {
		N: "E",
		E: "S",
		S: "W",
		W: "N",
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
			};
		case "MOVE_LEFT":
			return {
				...state,
				currentDirection: "",
			};
		case "SET_ERROR":
			return {
				...state,
				error: action.message,
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
		default:
			return state;
	}
};

const App = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	const { position, currentDirection, animation, error } = state;

	React.useEffect(() => {
		if (animation.length > 0) {
			console.log(`animation happened`);
		}
	}, [animation]);

	// ex: orders = 'FRFLRR'
	const executeOrder = (orders, i) => {
		// if (isNextMoveNotAllowed(position)) {
		// 	handleRoverMovingAwayFromGrid();
		// 	return;
		// }

		dispatch({
			type: "START_ANIMATION",
			direction: state.currentDirection,
			move: orders[i],
		});
		setTimeout(() => {
			const type =
				orders[i] === "f"
					? "MOVE_FORWARD"
					: orders[i] === "r"
					? "MOVE_RIGHT"
					: orders[i] === "l"
					? "MOVE_LEFT"
					: null;
			console.log(`type: ${type} currentDirection: ${currentDirection}`);
			dispatch({ type });
			setTimeout(() => {
				if (orders.length > i + 1) {
					executeOrder(orders, i + 1);
				}
			}, 10);
		}, 700);
	};
	// check if the next move is inside the Grid
	const isNextMoveNotAllowed = (position) => {
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

	// this function add an extra move forward after each Right and Left order
	const addForwardAfterRandL = (orders) => {
		// console.log(orders);
		const ordersArray = orders
			.split("")
			.map((order) => (["l", "r"].includes(order) ? `${order}f` : order));
		return ordersArray.join("");
	};

	const roverOrder = (orders) => {
		const newOrdersWithForwardAfterRandL = addForwardAfterRandL(orders);
		executeOrder(newOrdersWithForwardAfterRandL, 0);
	};
	const handleRoverMovingAwayFromGrid = () => {
		dispatch({
			type: "SET_ERROR",
			message: "Rover is moving away from grid !",
		});
		setTimeout(() => {
			dispatch({ type: "RESET_ERROR" });
		}, 1500);
	};
	return (
		<div className="App">
			<Header />
			<SA.AppWrapper>
				<h1 style={{ marginTop: "3rem" }}>ROVER CONTROL BOARD</h1>
				<ControlBoard roverOrder={roverOrder} animation={animation} />
				{error && <SA.ErrorMessage>{error}</SA.ErrorMessage>}
				<Grid
					direction={currentDirection}
					position={position}
					animation={animation}
				/>
			</SA.AppWrapper>
			<Footer />
		</div>
	);
};

export { App };
