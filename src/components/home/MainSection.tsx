import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Flex from "../shared/Flex";
import Image from "next/image";
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
          <div>
            <CardImage background={"/textures/texture1_rotate.png"} color={colors.deepblue} rotate="110deg" />
          </div>
          <div style={{ marginLeft: "-80px" }}>
            <CardImage background={"/textures/texture2_rotate.png"} color={colors.amber} rotate="120deg" />
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

  @media (max-width: 1024px) {
    display: none;
  }
`;

export default MainSection;
