import Link from "next/link";
import CreditScoreChart from "@shared/CreditScoreChart";
import Flex from "@shared/Flex";
import Text from "@shared/Text";
import Button from "@shared/Button";
import Spacing from "@shared/Spacing";
import Skeleton from "@shared/Skeleton";
import { css } from "@emotion/react";

function CreditScore() {
  return (
    <Flex justify="space-between" align="center">
      <Flex direction="column">
        <Text bold={true} css={MediaTextStyle} typography="t2" color="deepblue">
          나의 신용도를 확인하고 <br />
          맞춤 카드 추천받기
        </Text>
        <Spacing size={20} />
        <Link href="/credit">
          <Button css={ButtonStyle}>내 추천 카드 보러가기</Button>
        </Link>
      </Flex>
      <CreditScoreChart width={80} height={80} score={0} />
    </Flex>
  );
}

export function CreditScoreSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Skeleton width={155} height={50} />
          <Spacing size={8} />
          <Skeleton width={155} height={31} />
        </Flex>
      </Flex>
    </div>
  );
}

const MediaTextStyle = css`
  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const ButtonStyle = css`
  font-size: 15px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export default CreditScore;
