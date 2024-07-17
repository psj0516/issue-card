import { colors } from "@/styles/colorPalette";
import Image from "next/image";

interface ListIconProps {
  value: string;
  status?: boolean;
}

const ListIcon = ({ status, value }: ListIconProps) => {
  if (value == "cardInfo" && status == true) {
    return (
      <svg style={{ paddingRight: "2px" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={colors.deepblue} viewBox="0 0 30 30">
        <path d="M15 3C8.373 3 3 8.373 3 15c0 6.627 5.373 12 12 12s12-5.373 12-12C27 8.373 21.627 3 15 3z M21.707 12.707l-7.56 7.56 c-0.188 0.188-0.442 0.293-0.707 0.293s-0.52-0.105-0.707-0.293l-3.453-3.453c-0.391-0.391-0.391-1.023 0-1.414s1.023-0.391 1.414 0 l2.746 2.746l6.853-6.853c0.391-0.391 1.023-0.391 1.414 0S22.098 12.316 21.707 12.707z"></path>
      </svg>
    );
  } else if (value == "cardInfo" && status == false) {
    return (
      <svg style={{ paddingRight: "2px" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={colors.amber} viewBox="0 0 24 24">
        <path
          fill-rule="evenodd"
          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
          clip-rule="evenodd"
        />
      </svg>
    );
  } else {
    return (
      <svg style={{ paddingRight: "2px" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={colors.black} viewBox="0 0 24 24">
        <path
          fill-rule="evenodd"
          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
          clip-rule="evenodd"
        />
      </svg>
    );
  }
};

export default ListIcon;
