import { css } from "@emotion/react";
import { colors } from "./colorPalette";

export const buttonColorMap = {
  primary: css`
    background-color: ${colors.deepblue};
    color: ${colors.white};
  `,
  success: css`
    background-color: ${colors.teal900};
    color: ${colors.white};
  `,
  error: css`
    background-color: ${colors.amber};
    color: ${colors.white};
  `,
};

export const buttonWeakMap = {
  primary: css`
    background-color: ${colors.white};
    color: ${colors.deepblue};
    border: 1px solid ${colors.deepblue};
  `,
  success: css`
    background-color: ${colors.white};
    color: ${colors.teal900};
    border: 1px solid ${colors.teal900};
  `,
  error: css`
    background-color: ${colors.white};
    color: ${colors.amber};
    border: 1px solid ${colors.amber};
  `,
};

export const buttonSizeMap = {
  small: css`
    font-size: 13px;
    padding: 8px 9px;
  `,
  medium: css`
    font-size: 15px;
    padding: 10px 15px;
  `,
  large: css`
    font-size: 18px;
    padding: 12px 10px;
  `,
};

export type ButtonColor = keyof typeof buttonColorMap;
export type ButtonSize = keyof typeof buttonSizeMap;
