import { colors } from "@/styles/colorPalette";
import { css } from "@emotion/react";
import Image from "next/image";

interface CardImageProps {
  background: string;
  color: string;
}

const CardImage = ({ background, color }: CardImageProps) => {
  return (
    <div css={CardStyle}>
      <div className="card">
        <div className="front" style={{ backgroundImage: `url(${background})`, backgroundColor: color }}>
          <div className="row">
            <Image src={"https://i.ibb.co/G9pDnYJ/chip.png"} width={30} height={30} alt="" />
            <Image src={"https://i.ibb.co/WHZ3nRJ/visa.png"} width={30} height={10} alt="" />
          </div>
          <div className="row name">
            <p>GILDONG HONG</p>
            <p>10 / 25</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardStyle = css`
  .card {
    width: 250px;
    height: 150px;
    color: #fff;
    cursor: pointer;
    perspective: 1000px;
    transform: rotate(90deg);
  }

  .front {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px 30px;
    border-radius: 15px;
    overflow: hidden;
    z-index: 1;
    backface-visibility: hidden;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .name {
    font-size: 11px;
    margin-top: 110px;
  }
`;

export default CardImage;
