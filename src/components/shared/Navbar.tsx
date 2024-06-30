import { css } from "@emotion/react";

import { colors } from "@styles/colorPalette";
import Flex from "@shared/Flex";
import Link from "next/link";

function Navbar() {
  return (
    <Flex justify="space-between" align="center" css={navbarStyles}>
      <Link href="/">홈</Link>
    </Flex>
  );
}

const navbarStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray100};
`;

export default Navbar;
