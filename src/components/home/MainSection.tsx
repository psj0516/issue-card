import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Flex from "../shared/Flex";
import CardImage from "../shared/CardImage";
import { colors } from "@/styles/colorPalette";
import { CreditScoreSkeleton } from "./CreditScore";
import dynamic from "next/dynamic";
import Spacing from "../shared/Spacing";
import Text from "../shared/Text";

const CreditScore = dynamic(() => import("@components/home/CreditScore"), {
  ssr: false,
  loading: () => <CreditScoreSkeleton />,
});

const MainSection = () => {
  return (
    <Container>
      <Flex justify="space-between">
        <div css={MainStyle}>
          <div css={MainTextStyle}>
            <p>나만을 위한</p>
            <p>
              <span>최고의 카드 </span>찾고
            </p>
            <p>혜택을 챙겨보세요</p>
          </div>

          <Spacing size={40} />
          <CreditScore />
          <Spacing size={40} />
          <div css={SubTextStyle}>
            <div>
              <Text bold={true} typography="t2" color="amber">
                10%
              </Text>
              <Text typography="t7" color="deepblue" textAlign="center">
                평균 할인율
                <br />
                편의점, 마트, 영화 등.
              </Text>
            </div>
            <div>
              <Text bold={true} typography="t2" color="amber">
                20K
              </Text>
              <Text typography="t7" color="deepblue" textAlign="center">
                명의 고객이 만족 중
                <br />
                (총 고객 수 22K)
              </Text>
            </div>
          </div>
        </div>
        <div css={CardContainer}>
          <div className="card-box">
            <div className="card one">
              <CardImage background={"/textures/texture1_rotate.png"} color={colors.deepblue} />
            </div>
            <div className="card two">
              <CardImage background={"/textures/texture2_rotate.png"} color={colors.lightgray} />
            </div>
            <div className="card three">
              <CardImage background={"/textures/texture2_rotate.png"} color={colors.amber} />
            </div>
          </div>
        </div>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 24px;
  margin-top: 20px;
  margin-bottom: 70px;
`;

const MainStyle = css`
  display: flex;
  flex-direction: column;
`;

const MainTextStyle = css`
  font-size: 50px;
  font-weight: 600;
  color: ${colors.deepblue};

  p span {
    color: ${colors.amber};
  }
`;

const SubTextStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const CardContainer = css`
  display: flex;
  margin-top: 120px;
  position: relative;

  .card-box {
    position: absolute;
    right: 400px;
  }

  .card {
    position: absolute;
    animation-iteration-count: infinite;
    animation-duration: 2s;
  }

  .one {
    animation-name: anim-one;
    @keyframes anim-one {
      from {
        transform: translate(0) rotate(0deg);
      }
      50% {
        transform: translate(-100px, 10px) rotate(-10deg);
      }
      to {
        transform: translate(0) rotate(0deg);
      }
    }
  }
  .two {
    animation-name: anim-two;
    @keyframes anim-two {
      from {
        transform: translate(0);
      }
      50% {
        transform: translate(0px, -10px);
      }
      to {
        transform: translate(0);
      }
    }
  }
  .three {
    animation-name: anim-three;
    @keyframes anim-three {
      from {
        transform: translate(0) rotate(0deg);
      }
      50% {
        transform: translate(100px, -10px) rotate(10deg);
      }
      to {
        transform: translate(0) rotate(0deg);
      }
    }
  }
  .four {
    animation-name: anim-five;
    @keyframes anim-five {
      from {
        transform: translate(0) rotate(0deg);
      }
      50% {
        transform: translate(15px, 5px) rotate(15deg);
      }
      to {
        transform: translate(0) rotate(0deg);
      }
    }
  }
  .five {
    animation-name: anim-eight;
    @keyframes anim-eight {
      from {
        transform: translate(0) rotate(0deg);
      }
      50% {
        transform: translate(28px, 14px) rotate(35deg);
      }
      to {
        transform: translate(0) rotate(0deg);
      }
    }
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export default MainSection;
