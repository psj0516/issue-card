import { useCallback, useState, MouseEvent } from "react";
import Agreement from "@shared/Agreement";
import FixedBottomButton from "@shared/FixedBottomButton";

import { TermsList } from "@constants/apply";
import { ApplyValues } from "@models/apply";

function Terms({ onNext }: { onNext: (terms: ApplyValues["terms"]) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() => {
    return TermsList.reduce<Record<string, boolean>>(
      (prev, term) => ({
        ...prev,
        [term.id]: false,
      }),
      {}
    );
  });

  const handleAllAgreement = useCallback((_: MouseEvent<HTMLElement>, checked: boolean) => {
    setTermsAgreements((prevTerms) => {
      return Object.keys(prevTerms).reduce(
        (prev, key) => ({
          ...prev,
          [key]: checked,
        }),
        {}
      );
    });
  }, []);

  const allAgrred = Object.values(termsAgreements).every((동의여부) => 동의여부);

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={allAgrred} onChange={handleAllAgreement}>
          약관에 모두 동의
        </Agreement.Title>
        {TermsList.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreements[id]}
            onChange={(_, checked) => {
              setTermsAgreements((prevTerms) => ({
                ...prevTerms,
                [id]: checked,
              }));
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={allAgrred === false}
        onClick={() => {
          onNext(Object.keys(termsAgreements));
        }}
      />
    </div>
  );
}

export default Terms;
