import Flex from "@shared/Flex";
import Text from "@shared/Text";
import FixedBottomButton from "@shared/FixedBottomButton";
import { useRouter } from "next/router";
import { ApplyValues } from "@/models/apply";
import Spacing from "@/components/shared/Spacing";
import { cardDataType } from "@/models/card";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import ListIcon from "@/components/shared/ListIcon";

function ApplyDone({ applyValues, cardData }: { applyValues: Partial<ApplyValues>; cardData: cardDataType }) {
  const router = useRouter();
  const [imgsrc, setImgsrc] = useState(cardData.image);

  useEffect(() => {
    if (cardData.image) {
      const newImageName = cardData.image.replace(".png", "_rotate.png");
      setImgsrc(newImageName);
    }
  }, []);

  return (
    <Flex direction="column">
      <Text typography="t4" bold={true}>
        카드 발급 신청이 완료되었습니다!
      </Text>
      <Spacing size={12} />
      <div css={cardImage(applyValues.colorSelected as string, imgsrc)}></div>
      <Text typography="t5">{cardData.name}</Text>
      <Spacing size={12} />
      <Text typography="t5" bold={true}>
        옵션 확인
      </Text>
      <div css={optionDiv}>
        <ListIcon value="cardInfo" status={applyValues.isMaster ?? false} />
        <Text typography="t5">해외결제</Text>
      </div>
      <div css={optionDiv}>
        <ListIcon value="cardInfo" status={applyValues.isRf ?? false} />
        <Text typography="t5">후불교통기능</Text>
      </div>
      <div css={optionDiv}>
        <ListIcon value="cardInfo" status={applyValues.isHipass ?? false} />
        <Text typography="t5">후불하이패스카드</Text>
      </div>
      <div css={optionDiv}>
        <ListIcon value="payDate" />
        <Text typography="t5">결제일: {applyValues.payDate}</Text>
      </div>

      <FixedBottomButton
        label="확인"
        onClick={() => {
          router.push("/");
        }}
      />
    </Flex>
  );
}

const cardImage = (colorSelected: string, imgsrc: string) => css`
  width: 160px;
  height: 110px;
  background: ${colorSelected};
  border-radius: 6px;
  background-image: url(${imgsrc});
  background-size: cover;
  background-position: center;
`;

const optionDiv = css`
  display: flex;
  align-items: center;
`;

export default ApplyDone;
