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
	orders: {
		string: "",
		step: 0,
	},
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
		console.log(`useEffect : string:${string} step:${step}`);
		if (string && step < 9 && string.length > step) {
			// console.log(`animation happened`);
			// console.log(`string: ${string}`);
			// console.log(`step: ${step}`);
			console.log(`dispatch animation: string: ${string} step:${step}`);
			dispatch({
				type: "START_ANIMATION",
				direction: state.currentDirection,
				move: string[step],
			});
			setTimeout(() => {
				if (step < 9) {
					const type =
						string[step] === "f"
							? "MOVE_FORWARD"
							: string[step] === "r"
							? "MOVE_RIGHT"
							: string[step] === "l"
							? "MOVE_LEFT"
							: null;

					// console.log(`type: ${type} currentDirection: ${currentDirection}`);
					dispatch({ type });
					// console.log(`set_orders: step:${step} ++step: ${++step}`);
					dispatch({ type: "SET_ORDERS", orders: { string, step: step + 1 } });
					if (string.length === step - 1) {
						dispatch({ type: "RESET_ORDERS" });
					}
				}
			}, 1000);
		}
	}, [orders]);

	// this function add an extra move forward after each Right and Left order
	const addForwardAfterRandL = (orders) => {
		// console.log(orders);
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
		// executeOrder(newOrdersWithForwardAfterRandL, 0);
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
				<ControlBoard animation={animation} roverOrders={roverOrders} />
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
