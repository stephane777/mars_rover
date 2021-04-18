import React from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import { Grid } from "../grid";
import * as SA from "./app.style";
import { ControlBoard } from "../controlBoard/controlBoard.component";

const initialState = {
	position: [0, 0],
	roverOrientation: 0,
	currentDirection: "N",
	error: "",
	animation: [],
	orders: {
		string: "",
		step: 0,
	},
};

const reducer = (state, action) => {
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
		default:
			return state;
	}
};

const App = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	const {
		position,
		roverOrientation,
		currentDirection,
		animation,
		error,
		orders: { string },
	} = state;
	const { orders } = state;
	let {
		orders: { step },
	} = state;

	React.useEffect(() => {
		if (string && string.length > step) {
			if (isNextMoveNotAllowed()) {
				handleRoverMovingAwayFromGrid();
				return;
			}
			dispatch({
				type: "START_ANIMATION",
				direction: state.currentDirection,
				move: string[step],
			});
			setTimeout(() => {
				const type =
					string[step] === "f"
						? "MOVE_FORWARD"
						: string[step] === "r"
						? "MOVE_RIGHT"
						: string[step] === "l"
						? "MOVE_LEFT"
						: null;

				dispatch({ type });

				setTimeout(() => {
					if (step < string.length - 1)
						dispatch({
							type: "SET_ORDERS",
							orders: { string, step: step + 1 },
						});
					if (string.length === step + 1) {
						dispatch({ type: "RESET_ORDERS" });
					}
				}, 400);
			}, 600);
		}
	}, [orders]);

	// this function add an extra move forward after each Right and Left order
	const addForwardAfterRandL = (orders) => {
		const ordersArray = orders
			.split("")
			.map((order) => (["l", "r"].includes(order) ? `${order}f` : order));
		return ordersArray.join("");
	};

	const roverOrders = (orders) => {
		const newOrdersWithForwardAfterRandL = addForwardAfterRandL(orders);

		dispatch({
			type: "SET_ORDERS",
			orders: { string: newOrdersWithForwardAfterRandL, step: 0 },
		});
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

	// check if the next move is inside the Grid
	const isNextMoveNotAllowed = () => {
		let isRoverMovingAwayFromGrid = false;
		const directionAndMove = `${currentDirection}${string[step].toUpperCase()}`;
		console.log(
			`position: ${position} currentDirection: ${currentDirection} move:${string[step]} moveDirection: ${directionAndMove}`
		);

		// We only care about the move forward, R or L won't change position only orientation
		switch (directionAndMove) {
			case "NF":
				if (position[1] + 1 > 9) isRoverMovingAwayFromGrid = true;
				break;
			case "SF":
				if (position[1] - 1 < 0) isRoverMovingAwayFromGrid = true;
				break;
			case "EF":
				if (position[0] + 1 > 9) isRoverMovingAwayFromGrid = true;
				break;
			case "WF":
				if (position[0] - 1 < 0) isRoverMovingAwayFromGrid = true;
				break;
			default:
				isRoverMovingAwayFromGrid = false;
		}
		return isRoverMovingAwayFromGrid;
	};

	return (
		<div className="App">
			<Header />
			<SA.AppWrapper>
				<h1 style={{ marginTop: "3rem" }}>ROVER CONTROL BOARD</h1>
				<ControlBoard
					direction={currentDirection}
					animation={animation}
					roverOrders={roverOrders}
				/>
				{error && <SA.ErrorMessage>{error}</SA.ErrorMessage>}
				<Grid
					direction={currentDirection}
					position={position}
					animation={animation}
					roverOrientation={roverOrientation}
				/>
			</SA.AppWrapper>
			<Footer />
		</div>
	);
};

export { App };
