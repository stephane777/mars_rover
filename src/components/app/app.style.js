import styled from "styled-components";

export const AppWrapper = styled.main`
	min-height: 80vh;
	max-width: 120rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ErrorMessage = styled.p`
	color: var(--alert);
	background-color: var(--bg-alert);
	width: 40rem;
	font-size: 1.4rem;
	text-align: center;
	padding: 1rem;
	border-radius: 6px;
	border-color: var(--border-alert);
`;
