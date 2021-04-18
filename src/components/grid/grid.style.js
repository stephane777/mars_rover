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
	transition: 0.4s;
	transform: ${(props) => {
		const { roverOrientation } = props;
		const roverRotation = `${roverOrientation}deg`;

		if (props.animation.length > 0) {
			const [direction, move] = props.animation;

			if (move === "f") return `rotate(${roverRotation}) translateY(-4rem)`;

			if (["r", "l"].includes(move)) {
				return move === "r"
					? `rotate(${roverOrientation + 90}deg)`
					: `rotate(${roverOrientation - 90}deg)`;
			}
		} else {
			return `rotate(${roverRotation})`;
		}
	}};
`;
// switch (`${direction}${move.toUppercase()}) {
