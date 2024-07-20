import Flex from "@shared/Flex";
import Text from "@shared/Text";
import { useRouter } from "next/router";
import { ApplyValues } from "@/models/apply";
import Spacing from "@/components/shared/Spacing";
import { cardDataType } from "@/models/card";
import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import ListIcon from "@/components/shared/ListIcon";
import { colors } from "@/styles/colorPalette";
import Button from "@/components/shared/Button";

function ApplyDone({ applyValues, cardData, setStepsInit }: { applyValues: Partial<ApplyValues>; cardData: cardDataType; setStepsInit: () => void }) {
  const router = useRouter();
  const [imgsrc, setImgsrc] = useState(cardData.image);

  useEffect(() => {
    if (cardData.image) {
      const newImageName = cardData.image.replace(".png", "_rotate.png");
      setImgsrc(newImageName);
    }
  }, []);

  return (
    <Flex direction="column" align="center">
      <Spacing size={30} />
      <Text css={fadeIn} typography="t3" bold={true} color="deepblue">
        카드 발급 신청이 완료되었습니다!
      </Text>
      <Spacing size={20} />
      <div css={[InfoDiv, fadeInWithDelay]}>
        <div css={cardImage(applyValues.colorSelected as string, imgsrc)}></div>
        <div css={InfoStyle}>
          <Text typography="t4" color="deepblue" bold={true}>
            {cardData.name}
          </Text>
          <Spacing size={40} />
          <div css={optionDiv}>
            <ListIcon value="cardInfo" status={applyValues.isMaster ?? false} />
            <Text typography="t5">해외결제(Master)</Text>
          </div>
          <div css={optionDiv}>
            <ListIcon value="cardInfo" status={applyValues.isRf ?? false} />
            <Text typography="t5">후불교통기능</Text>
          </div>
          <div css={optionDiv}>
            <ListIcon value="cardInfo" status={applyValues.isHipass ?? false} />
            <Text typography="t5">후불하이패스</Text>
          </div>
          <div css={optionDiv}>
            <ListIcon value="payDate" />
            <Text typography="t5">결제일: {applyValues.payDate}</Text>
          </div>
          <Spacing size={40} />
          <Text typography="t7" color="deepblue">
            실물 카드 배송은
            <br />
            신청일로부터 3 - 5일의 기간이 소요됩니다.
            <br />
            문의사항은 해당 카드사로 연락 바랍니다.
          </Text>
          <Spacing size={20} />
          <Button
            style={{ width: "100%" }}
            onClick={() => {
              router.push("/");
            }}
          >
            확인
          </Button>
          <Spacing size={10} />
          <Button weak={true} style={{ width: "100%" }} onClick={setStepsInit}>
            옵션 변경
          </Button>
        </div>
      </div>
    </Flex>
  );
}

const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = css`
  animation: ${fadeInKeyframes} 1s ease-in-out;
`;

const fadeInWithDelay = css`
  animation: ${fadeInKeyframes} 1s ease-in-out;
  animation-delay: 0.5s;
  animation-fill-mode: both;
`;

const InfoDiv = css`
  width: 460px;
  background-color: ${colors.gray50};
  border-radius: 15px;
`;

const InfoStyle = css`
  background-color: ${colors.gray50};
  padding: 10px 30px 30px 30px;
  border-radius: 15px;
  text-align: center;
`;

const cardImage = (colorSelected: string, imgsrc: string) => css`
  width: 100%;
  height: 150px;
  background: ${colorSelected};
  border-radius: 15px 15px 0px 0px;
  background-image: url(${imgsrc});
  background-size: cover;
  background-position: center;
`;

const optionDiv = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ApplyDone;
