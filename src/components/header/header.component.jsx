import React from "react";
import logo from "../../assets/imgs/nasa.svg";
import * as SH from "./header.style";

const Header = () => {
	return (
		<SH.HeaderWrapper className="header">
			<SH.Logo src={logo} data-testid="logo" />
			<SH.Name>MARS ROVER</SH.Name>
		</SH.HeaderWrapper>
	);
};
export { Header };
