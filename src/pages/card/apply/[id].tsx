import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Terms from "@/components/card/Apply/Terms";
import BasicInfo from "@/components/card/Apply/BasicInfo";
import CardInfo from "@/components/card/Apply/CardInfo";

import { ApplyValues } from "@models/apply";
import ApplyDone from "@/components/card/Apply/ApplyDone";
import { getCard } from "@/remote/card";

interface cardDataType {
  name: string;
  color: string[];
}

function ApplyPage() {
  const { id } = useParams() as { id: string };
  const [step, setStep] = useState(0);
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    cardId: id,
  });
  const [cardData, setCardData] = useState<cardDataType>({ name: "", color: [] });

  useEffect(() => {
    if (step === 3) {
      console.log(applyValues);
    }
  }, [applyValues, step]);

  useEffect(() => {
    getCardData();
  }, []);

  const getCardData = async () => {
    const data = await getCard(id as string);
    if (data == null || data == undefined) {
      return;
    }

    setCardData({ name: data.name, color: data.color });
  };

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

  const handleSubmit = () => {
    console.log(applyValues);
  };

  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfoChange} colorList={cardData.color} /> : null}
      {step === 3 ? <ApplyDone applyValues={applyValues} cardData={cardData} /> : null}
    </div>
  );
}

export default ApplyPage;
