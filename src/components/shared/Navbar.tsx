import { css } from "@emotion/react";

import { colors } from "@styles/colorPalette";
import Flex from "@shared/Flex";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <Flex justify="space-between" align="center" css={navbarStyles}>
      <Link href="/" css={linkStyles}>
        <Image src="/icons/credit-card.svg" alt="home" width={30} height={30} /> <span style={{ color: colors.amber }}>B</span>-CARD
      </Link>
    </Flex>
  );
}

const navbarStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
`;

const linkStyles = css`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: ${colors.deepblue};
`;

export default Navbar;
