import React from "react";
import sprite from "../../assets/imgs/sprite.svg";

import * as SF from "./footer.style";

const Footer = () => {
	return (
		<SF.FooterWrapper className="footer">
			<SF.Footer>
				<a
					href="https://github.com/stephane777"
					className="footer__link"
					target="_blank"
					rel="noreferrer"
					data-testid="github-link"
				>
					<SF.Svg data-testid="github-svg">
						<use
							href={`${sprite}#icon-github`}
							className="grid__icon-use"
						></use>
					</SF.Svg>
				</a>
				<SF.CreatedBy>Created by Stephane Candelas.</SF.CreatedBy>
			</SF.Footer>
		</SF.FooterWrapper>
	);
};
export { Footer };
