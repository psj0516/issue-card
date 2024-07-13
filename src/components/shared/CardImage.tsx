import { colors } from "@/styles/colorPalette";
import { css } from "@emotion/react";
import Image from "next/image";

interface CardImageProps {
  background: string;
  color: string;
  rotate: string;
}

const CardImage = ({ background, color, rotate }: CardImageProps) => {
  return (
    <div css={CardStyle}>
      <div className="card" style={{ transform: `rotate(${rotate})` }}>
        <div className="card-inner">
          <div className="front" style={{ backgroundImage: `url(${background})`, backgroundColor: color }}>
            <div className="row">
              <Image src={"https://i.ibb.co/G9pDnYJ/chip.png"} width={30} height={30} alt="" />
              <Image src={"https://i.ibb.co/WHZ3nRJ/visa.png"} width={30} height={10} alt="" />
            </div>
            <div className="row card-no">
              <p>5432</p>
              <p>2101</p>
              <p>8282</p>
              <p>0909</p>
            </div>
            <div className="row name">
              <p>GILDONG HONG</p>
              <p>10 / 25</p>
            </div>
          </div>
          <div className="back" style={{ backgroundColor: color }}>
            <div className="bar"></div>
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
  }

  .card-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transition: transform 1s;
    transform-style: preserve-3d;
  }

  .front,
  .back {
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

  .card-no {
    font-size: 18px;
    margin-top: 60px;
  }

  .name {
    font-size: 11px;
    margin-top: 30px;
  }

  .bar {
    background: #222;
    margin-left: -30px;
    margin-right: -30px;
    height: 30px;
    margin-top: 10px;
  }

  .card-cvv p {
    background: #fff;
    color: #000;
    font-size: 22px;
    padding: 10px 20px;
  }

  .card-text {
    margin-top: 30px;
    font-size: 14px;
  }
  .back {
    transform: rotateX(180deg);
  }

  .card:hover .card-inner {
    transform: rotateX(-180deg);
  }
`;

export default CardImage;
