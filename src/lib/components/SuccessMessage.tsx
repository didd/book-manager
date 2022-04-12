import styled from "styled-components";
import { ReactComponent as Check } from "../components/font-awesome/solid/check.svg";
import { PrimaryButton } from "./buttons";
import { kabul, lightKabul } from "./colors";
import { Stack } from "./Stack";

type Props = {
  message: string;
  buttonText: string;
  onClick: () => void;
};

export function SuccessMessage({ message, buttonText, onClick }: Props) {
  return (
    <Stack direction="column" align="center" justify="center" spacing={25}>
      <Circle>
        <CheckIcon />
      </Circle>
      {message}
      <PrimaryButton action={onClick}>{buttonText}</PrimaryButton>
    </Stack>
  );
}

const Circle = styled(Stack).attrs({ align: "center", justify: "center" })`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  background: ${lightKabul};
`;
const CheckIcon = styled(Check)`
  height: 25px;
  width: 25px;
  flex-shrink: 0;
  > path {
    fill: ${kabul};
  }
`;
