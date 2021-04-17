import styled from "styled-components";

export const GridWrapper = styled.div`
	display: flex;
	flex-direction: row-reverse;
	flex-wrap: wrap;
	width: 40rem;
	height: 40rem;
`;

export const Cell = styled.div`
	border: 1px solid #ccc;
	width: 10%;
	height: 10%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const Rover = styled.img`
	width: 2rem;
	height: 2rem;
	transition: 0.6s;
	transform: ${(props) => {
		const { direction } = props.direction;
		// console.log(`direction: ${direction}`);
		if (props.animation.length > 0) {
			const [direction, move] = props.animation;

			// console.log(`direction: ${direction} move: ${move}`);
			// direction: N move: r
			// direction: N move: f

			if (direction === "N" && move === "f") return `translateY(-4rem)`;
			if (direction === "E" && move === "f") return "tanslateX(4rem)";
			if (direction === "S" && move === "f") return "translateY(4rem)";
			if (direction === "W" && move === "f") return "translateX(-4rem)";

			if (direction === "N" && move === "r") return "rotate(90deg)";
			if (direction === "E" && move === "r") return "rotate(180deg)";
			if (direction === "S" && move === "r") return "rotate(270deg)";
			if (direction === "W" && move === "r") return "rotate(0)";
		} else {
			return direction === "N"
				? "rotate(0)"
				: direction === "E"
				? "rotate(90deg)"
				: direction === "S"
				? "rotate(180deg)"
				: direction === "W"
				? "rotate(270deg)"
				: "rotate(0)";
		}
	}};
`;
