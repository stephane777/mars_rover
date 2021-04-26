import React from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import { Grid } from "../grid";
import * as SA from "./app.style";
import { ControlBoard } from "../controlBoard/controlBoard.component";
import { initialState, reducer } from "../../reducer";
import { getDegree } from "../../utils";

const App = () => {
	const [state, dispatch] = React.useReducer(reducer, initialState);
	const {
		position,
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
					if (step < string.length - 1) {
						dispatch({
							type: "SET_ORDERS",
							orders: { string, step: step + 1 },
						});
					}
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
	const handleResetPosition = () => {
		dispatch({ type: "RESET_POSITION" });
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
		console.log(`animation: ${orders.string[orders.step]}`);
		const currentMove = orders.string[orders.step];
		if (currentMove !== "f") return;
		const degree = getDegree(position[2]);
		// const cardinal = getCardinal(degree);
		// We only care about the move forward, R or L won't change position only orientation
		// const directionAndMove = `${cardinal}${string[step].toUpperCase()}`;
		switch (degree) {
			case 0:
				if (position[1] + 1 > 9) isRoverMovingAwayFromGrid = true;
				break;
			case 180:
				if (position[1] - 1 < 0) isRoverMovingAwayFromGrid = true;
				break;
			case 90:
				if (position[0] + 1 > 9) isRoverMovingAwayFromGrid = true;
				break;
			case 270:
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
				<SA.Heading style={{ marginTop: "3rem" }}>
					ROVER CONTROL BOARD
				</SA.Heading>
				<ControlBoard
					animation={animation}
					roverOrders={roverOrders}
					position={position}
					resetPosition={handleResetPosition}
				/>
				{error && <SA.ErrorMessage>{error}</SA.ErrorMessage>}
				<Grid position={position} animation={animation} />
			</SA.AppWrapper>
			<Footer />
		</div>
	);
};

export { App };
