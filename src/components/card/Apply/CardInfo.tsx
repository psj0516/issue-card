import { useCallback, useState, MouseEvent } from "react";

import Button from "@shared/Button";
import Spacing from "@shared/Spacing";
import FixedBottomButton from "@shared/FixedBottomButton";

import { ApplyValues } from "@models/apply";
import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";

type CardInfoValues = Pick<ApplyValues, "isHipass" | "isMaster" | "isRf" | "colorSelected">;

function CardInfo({ onNext, colorList }: { onNext: (cardInfoValues: Pick<ApplyValues, "isMaster" | "isHipass" | "isRf">) => void; colorList: string[] }) {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isHipass: false,
    isMaster: false,
    isRf: false,
    colorSelected: "",
  });

  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);

  const { isHipass, isMaster, isRf, colorSelected } = cardInfoValues;

  const handleButtonClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement;

    setCardInfoValues((prevValues) => ({
      ...prevValues,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }));
  }, []);

  const handleColorButtonClick = (index: number, color: string) => {
    setSelectedColorIndex(index);
    setCardInfoValues((prevValues) => ({
      ...prevValues,
      colorSelected: color,
    }));
  };

  return (
    <div>
      <Container>
        {colorList.map((color, index) => (
          <button
            key={index}
            css={ButtonStyle(selectedColorIndex === index)}
            style={{ backgroundColor: color }}
            onClick={() => handleColorButtonClick(index, color)}
          ></button>
        ))}
      </Container>

      <Spacing size={12} />
      <Button.Group title="해외결제">
        <Button name="isMaster" weak={isMaster === false} size="medium" data-value={true} onClick={handleButtonClick}>
          Master
        </Button>
        <Button name="isMaster" weak={isMaster === true} size="medium" data-value={false} onClick={handleButtonClick}>
          국내전용
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불교통기능">
        <Button name="isRf" weak={isRf === true} size="medium" data-value={false} onClick={handleButtonClick}>
          신청안함
        </Button>
        <Button name="isRf" weak={isRf === false} size="medium" data-value={true} onClick={handleButtonClick}>
          신청
        </Button>
      </Button.Group>

      <Spacing size={12} />

      <Button.Group title="후불하이패스카드">
        <Button name="isHipass" weak={isHipass === true} size="medium" data-value={false} onClick={handleButtonClick}>
          신청안함
        </Button>
        <Button name="isHipass" weak={isHipass === false} size="medium" data-value={true} onClick={handleButtonClick}>
          신청
        </Button>
      </Button.Group>

      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(cardInfoValues);
        }}
      />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  padding: 4px 2px;
`;

const ButtonStyle = (isSelected: boolean): SerializedStyles => css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  border: ${isSelected ? "3px solid black" : "none"};

  &:not(:first-of-type) {
    margin-left: 16px;
  }
`;

export default CardInfo;
