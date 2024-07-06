import Flex from "@shared/Flex";
import Text from "@shared/Text";
import FixedBottomButton from "@shared/FixedBottomButton";
import { useRouter } from "next/router";
import { ApplyValues } from "@/models/apply";
import Spacing from "@/components/shared/Spacing";
import { cardDataType } from "@/models/card";
import { css } from "@emotion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

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
      <Text>해외결제: {applyValues.isMaster == true ? <span>신청</span> : <span>신청안함</span>}</Text>
      <Text>후불교통기능: {applyValues.isMaster == true ? <span>신청</span> : <span>신청안함</span>}</Text>
      <Text>후불하이패스카드: {applyValues.isHipass == true ? <span>신청</span> : <span>신청안함</span>}</Text>
      <Text>결제일: {applyValues.payDate}</Text>

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

export default ApplyDone;
