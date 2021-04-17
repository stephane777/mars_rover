import styled from "styled-components";

export const FooterWrapper = styled.div`
	height: 10vh;
	display: flex;
	padding-left: 4rem;
	background-color: var(--color-primary);
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const Footer = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const CreatedBy = styled.p`
	color: lightgray;
	margin-left: 2rem;
	margin-bottom: 0;
	font-size: 1.2rem;
	font-weight: light;
`;

export const Svg = styled.svg`
	fill: lightgray;
	width: 2rem;
	height: 2rem;
`;
