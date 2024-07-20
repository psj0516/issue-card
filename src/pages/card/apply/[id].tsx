import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Terms from "@/components/card/Apply/Terms";
import BasicInfo from "@/components/card/Apply/BasicInfo";
import CardInfo from "@/components/card/Apply/CardInfo";
import ApplyDone from "@/components/card/Apply/ApplyDone";
import ProgressBar from "@shared/ProgressBar";

import { ApplyValues } from "@models/apply";
import { getCard } from "@/remote/card";
import { cardDataType } from "@models/card";

const LAST_STEP = 3;

function ApplyPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const [step, setStep] = useState(0);
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    cardId: "",
  });
  const [cardData, setCardData] = useState<cardDataType>({ name: "", color: [], image: "" });

  useEffect(() => {
    if (id) {
      setApplyValues((prevValues) => ({
        ...prevValues,
        cardId: id,
      }));
      getCardData(id);
    }
  }, [id]);

  const getCardData = async (cardId: string) => {
    const data = await getCard(cardId);
    if (data) {
      setCardData({ name: data.name, color: data.color, image: data.image });
    }
  };

  useEffect(() => {
    if (step === 3) {
      console.log(applyValues);
    }
  }, [applyValues, step]);

  const handleTermsChange = (terms: ApplyValues["terms"]) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      terms,
    }));

    setStep((prevStep) => prevStep + 1);
  };

  const handleBasicInfoChange = (infoValues: Pick<ApplyValues, "salary" | "payDate" | "creditScore">) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...infoValues,
    }));

    setStep((prevStep) => prevStep + 1);
  };

  const handleCardInfoChange = (cardInfoValues: Pick<ApplyValues, "isHipass" | "isMaster" | "isRf">) => {
    setApplyValues((prevValues) => ({
      ...prevValues,
      ...cardInfoValues,
    }));

    setStep((prevStep) => prevStep + 1);
  };

  const setStepsInit = () => {
    setStep(2);
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProgressBar progress={step / LAST_STEP} />
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfoChange} colorList={cardData.color} /> : null}
      {step === 3 ? <ApplyDone applyValues={applyValues} cardData={cardData} setStepsInit={setStepsInit} /> : null}
    </div>
  );
}

export default ApplyPage;
