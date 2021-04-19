import styled from "styled-components";

export const Wrapper = styled.div`
	margin: 3rem 0;
`;

export const Form = styled.form``;

export const Input = styled.input`
	text-transform: uppercase;
	font-size: 1.4rem;
	padding: 0.5rem;
	max-width: 22rem;
	border: 2px solid var(--color-grey-dark-3);
	border-color: var(--color-primary);
`;
export const Label = styled.label`
	font-size: 1.4rem;
`;

export const Direction = styled.p`
	font-size: 1.4rem;
`;

export const Button = styled.button`
	padding: 0.6rem;
	width: 6rem;
	outline: none;
	:hover {
		cursor: pointer;
		background-color: var(--color-primary);
		color: var(--color-white);
	}
	border: 1px solid var(--color-primary);
	box-shadow: 3px 2px 5px var(--color-primary);
	border-radius: 5px;
	:active {
		box-shadow: 3px 2px 5px var(--color-primary);
		transform: translate(0.2rem);
	}
	&[disabled] {
		background-color: lightgrey;
		color: #eee;
		box-shadow: none;
		border-color: lightgrey;
	}
`;
const Column = styled.div`
	display: flex;
	align-items: center;
	margin: 0 1rem;
`;
export const ColumnLabel = styled(Column)`
	min-width: 12rem;
	@media only screen and (max-width: 576px) {
		min-width: 8rem;
	}
`;
export const ColumnData = styled(Column)`
	min-width: 24rem;
	@media only screen and (max-width: 576px) {
		min-width: 16rem;
	}
`;

export const Row = styled.div`
	display: flex;
	margin: 0.4rem 0;
`;
