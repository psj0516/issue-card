import Image from "next/image";

interface ListIconProps {
  value: string;
  status?: boolean;
}

const ListIcon = ({ status, value }: ListIconProps) => {
  if (value == "cardInfo" && status == true) {
    return (
      <Image style={{ paddingRight: "2px" }} src={"https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/tick_blue.png"} width={20} height={20} alt="" />
    );
  } else if (value == "cardInfo" && status == false) {
    return (
      <Image style={{ paddingRight: "2px" }} src={"https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/close_red.png"} width={20} height={20} alt="" />
    );
  } else {
    return (
      <Image
        style={{ paddingRight: "2px" }}
        src={"https://cdn0.iconfinder.com/data/icons/math-business-icon-set/93/1_9-512.png"}
        width={20}
        height={20}
        alt=""
      />
    );
  }
};

export default ListIcon;
