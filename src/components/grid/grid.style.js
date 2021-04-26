import styled from "styled-components";
import marsImg from "../../assets/imgs/mars.jpg";

export const GridWrapper = styled.div`
	position: relative;
	box-sizing: content-box;
	background-image: url(${marsImg});
	display: flex;
	flex-direction: row-reverse;
	flex-wrap: wrap;
	width: 40rem;
	height: 40rem;
	margin: 6rem 0;
	@media only screen and (max-width: 576px) {
		height: 35rem;
		width: 35rem;
	}
`;
export const Grid = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 40rem;
	height: 40rem;
	background-size: 4rem 4rem;
	background-image: linear-gradient(to right, #7d7d7d 1px, transparent 1px),
		linear-gradient(to bottom, #7d7d7d 1px, transparent 1px);
`;

export const Rover = styled.img`
	position: absolute;
	top: ${(props) => {
		const { position } = props;
		return `${37 - position[1] * 4}rem`;
	}};
	left: ${(props) => {
		const { position } = props;
		return `${1 + position[0] * 4}rem`;
	}};
	width: 2rem;
	height: 2rem;
	transition: 0.4s;
	transform: ${(props) => {
		const degree = props.position[2];
		// console.log(`degree from Rover: ${degree}`);

		if (props.animation.length > 0) {
			// console.log(`props.animation.length: ${props.animation.length}`);
			const move = props.animation;

			if (move === "f") return `rotate(${degree}deg) translateY(-4rem)`;

			if (["r", "l"].includes(move)) {
				return move === "r"
					? `rotate(${degree + 90}deg)`
					: `rotate(${degree - 90}deg)`;
			}
		} else {
			return `rotate(${degree}deg)`;
		}
	}};
`;
