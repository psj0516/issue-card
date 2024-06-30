import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Flex from "@shared/Flex";
import Text from "@shared/Text";
import Spacing from "@shared/Spacing";
import CreditScoreChart from "@shared/CreditScoreChart";
import ListRow from "@shared/ListRow";
import { getSearchCards } from "@/remote/card";
import Badge from "@/components/shared/Badge";
import { Card } from "@/models/card";
import { css } from "@emotion/react";
import { colors } from "@/styles/colorPalette";

function CreditPage() {
  const navigate = useRouter();
  const [score, setScore] = useState(0);
  const [data, setData] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCardData = async (score: number) => {
    setIsLoading(true);
    try {
      const data = await getSearchCards(score);
      setData(data);
    } catch (error) {
      console.error("Error fetching card data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(score);
    fetchCardData(score);
  }, [score]);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const randomScore = randomNumber * 10;
    setScore(randomScore);
  }, []);

  return (
    <>
      <div>
        <Spacing size={40} />
        <Flex align="center" direction="column">
          <Text typography="t4" bold={true} textAlign="center">
            나의 신용점수
          </Text>
          <Spacing size={10} />
          <CreditScoreChart score={score} />
        </Flex>
        <Spacing size={80} />
      </div>
      <Text bold={true} style={{ padding: "12px 24px", display: "inline-block" }}>
        추천 카드
      </Text>
      {isLoading ? (
        <p css={pStyles}>불러오는 중...</p>
      ) : data.length > 0 ? (
        data.map((card, index) => (
          <ListRow
            key={card.id}
            contents={<ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />}
            right={card.payback != null ? <Badge label={card.payback} /> : null}
            withArrow={true}
            onClick={() => {
              navigate.push(`/card/${card.id}`);
            }}
          />
        ))
      ) : (
        <p css={pStyles}>나의 신용점수에 적절한 카드가 없습니다.</p>
      )}
      <div style={{ padding: "8px 24px" }}>
        <ul css={recList}>
          <ListRow
            contents={<ListRow.Texts title="더 많은 카드" subTitle="더 많은 카드 찾아보기" />}
            withArrow={true}
            onClick={() => {
              navigate.push("/card");
            }}
          />
        </ul>
      </div>
    </>
  );
}

const pStyles = css`
  padding: 8px 24px;
`;

const recList = css`
  background: ${colors.gray200};
  border-radius: 4px;
`;

export default CreditPage;
