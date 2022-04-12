import { Fragment, ReactNode, useState } from "react";
import styled from "styled-components";
import { PrimaryButton, SecondaryButton } from "./buttons";
import { kabul, lightGray, lightKabul, midGray, white } from "./colors";
import { Stack } from "./Stack";
import { ReactComponent as ChevronLeft } from "../components/font-awesome/solid/chevron.svg";

type Steps = {
  heading: string;
  subHeading: string;
};

type Props = {
  title: string;
  steps: Steps[];
  backText?: string;
  nextText?: string;
  finalText?: string;
  canGoForward: boolean;
  initialStep: number;
  onCurrentIndex: (index: number) => void;
  onComplete: () => void;
  children: ReactNode;
};

export function Wizard({
  title,
  steps,
  backText = "Back",
  nextText = "Next",
  finalText = "Complete",
  canGoForward,
  initialStep,
  onCurrentIndex,
  onComplete,
  children,
}: Props) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const numberOfSteps = steps.length;

  const stepBack = () => {
    if (currentStep > 0) {
      onCurrentIndex(currentStep - 1);
      setCurrentStep(currentStep - 1);
      return;
    }
    onCurrentIndex(0);
    setCurrentStep(0);
  };

  const stepForward = () => {
    if (currentStep + 1 < numberOfSteps) {
      onCurrentIndex(currentStep + 1);
      setCurrentStep(currentStep + 1);
      return;
    }
    onCurrentIndex(numberOfSteps - 1);
    setCurrentStep(numberOfSteps - 1);
  };

  return (
    <>
      <Title>{title}</Title>
      <Stack spacing={5} align="baseline">
        {steps.map((step, index) => (
          <Fragment key={index}>
            <Step>
              <Heading active={currentStep === index}>{step.heading}</Heading>
              <SubHeading>{step.subHeading}</SubHeading>
            </Step>
            {numberOfSteps > 1 && index < numberOfSteps - 1 && <Divider />}
          </Fragment>
        ))}
      </Stack>
      <Body>{children}</Body>
      <Stack justify="end">
        <SecondaryButton
          icon={<BackIcon />}
          action={stepBack}
          disabled={currentStep === 0}
        >
          {backText}
        </SecondaryButton>
        {currentStep === numberOfSteps - 1 ? (
          <PrimaryButton
            type="submit"
            action={onComplete}
            disabled={!canGoForward}
          >
            {finalText}
          </PrimaryButton>
        ) : (
          <PrimaryButton action={stepForward} disabled={!canGoForward}>
            {nextText}
          </PrimaryButton>
        )}
      </Stack>
    </>
  );
}

const Body = styled.div`
  min-height: 50px;
`;

const Step = styled(Stack).attrs({ direction: "column", spacing: 10 })`
  width: auto;
`;

const Title = styled.h4`
  font-size: 16px;
  margin: 0;
`;

const Divider = styled.div`
  height: 1px;
  background: ${lightGray};
  width: 100%;
`;

const Heading = styled(Stack).attrs({ justify: "center", align: "center" })<{
  active: boolean;
}>`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background: ${(p) => (p.active ? kabul : lightKabul)};
  color: ${(p) => (p.active ? white : kabul)};
`;

const SubHeading = styled.div`
  font-size: 12px;
`;

const BackIcon = styled(ChevronLeft)`
  > path {
    fill: ${midGray};
  }
  margin-top: -5px;
`;
