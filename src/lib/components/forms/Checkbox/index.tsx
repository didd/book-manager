import styled from "styled-components";
import { ReactComponent as Check } from "../../font-awesome/solid/check.svg";
import { kabul, white } from "../../colors";
import { useState } from "react";
import { Stack } from "../../Stack";

const Box = styled.button<{ checked: boolean }>`
  height: 16px;
  width: 16px;
  flex-shrink: 0;
  margin-top: 2px;
  background: ${(p) => (p.checked ? kabul : white)};
  cursor: pointer;

  border: 1px solid ${kabul};
  box-sizing: border-box;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
`;

interface Props {
  id?: string;
  checked: boolean;
  label: string;
  onClick: (checked: boolean) => void;
}

export function Checkbox({ id, checked, label, onClick }: Props) {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <Stack align="center">
      <Box
        id={id}
        onClick={() => {
          onClick(!isChecked);
          setIsChecked(!isChecked);
        }}
        checked={checked}
        role="checkbox"
        aria-checked={checked}
      >
        {checked && <CheckIcon />}
      </Box>
      {label}
    </Stack>
  );
}

const CheckIcon = styled(Check)`
  height: 16px;
  width: 16px;
  flex-shrink: 0;
  > path {
    fill: ${white};
  }
`;
