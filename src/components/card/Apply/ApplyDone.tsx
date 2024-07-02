import Flex from "@shared/Flex";
import Text from "@shared/Text";
import FixedBottomButton from "@shared/FixedBottomButton";
import { useRouter } from "next/router";
import { ApplyValues } from "@/models/apply";
import { useQuery } from "react-query";
import { getCard } from "@/remote/card";
import { Card } from "@/models/card";

function ApplyDone({ applyValues, cardData }: { applyValues: Partial<ApplyValues>; cardData: { name: string; color: string[] } }) {
  const router = useRouter();

  return (
    <Flex direction="column">
      <Text>카드 발급 신청이 완료되었습니다.</Text>
      <Text>{cardData.name}</Text>
      <Flex>
        <Text>색상:</Text>
        <div style={{ width: 100, height: 20, backgroundColor: applyValues.colorSelected }}></div>
      </Flex>
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

export default ApplyDone;
