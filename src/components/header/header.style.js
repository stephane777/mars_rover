import styled from "styled-components";

export const HeaderWrapper = styled.header`
	display: flex;
	align-items: center;
	height: 10vh;
	display: flex;
	padding-left: 4rem;
	background-color: var(--color-primary);
`;

export const Logo = styled.img`
	width: 6rem;
	height: 6rem;
`;
export const Name = styled.span`
	margin-left: 1rem;
	font-size: 2rem;
	color: var(--color-white);
	font-family: "helvetica", sans-serif;
`;
