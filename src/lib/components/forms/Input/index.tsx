import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import {
  backgroundGray,
  darkGray3,
  errorRed,
  kabul,
  lightGray,
  midGray,
  white,
} from "../../colors";

export type Props = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  className?: string;
  id: string;
  as?: "textarea";
  label?: string;
  error?: string;
};

export function Input(props: Props) {
  const { id, label, className, error, as, ...rest } = props;

  return (
    <Root className={className} hasLabel={!!label}>
      {label && <label htmlFor={id}>{label}</label>}
      {as === "textarea" ? (
        <InputElement {...rest} as="textarea" rows={3} />
      ) : (
        <InputElement {...rest} />
      )}
      <Error>{error}</Error>
    </Root>
  );
}

const InputElement = styled.input`
  width: 100%;
  background: ${white};
  border: 1px solid ${lightGray};
  box-sizing: border-box;
  border-radius: 2px;

  padding: 10px;
  margin-top: 8px;
  font-size: 18px;
  line-height: 146%;
  font-weight: 300;
  font-family: inherit;
  color: ${darkGray3};
  outline: none;

  &:hover {
    border-color: ${kabul};
  }

  &:focus {
    border-color: ${midGray};
  }

  &:disabled {
    background-color: ${backgroundGray};
  }
`;

const Root = styled.div<{
  hasLabel?: boolean;
}>`
  display: flex;
  flex-direction: column;

  ${(props) => (props.hasLabel ? "margin-bottom: 25px;" : "")}
  label {
    font-size: 14px;
    line-height: 18px;
    font-weight: 300;
    color: ${kabul};
  }
`;

const Error = styled.div`
  margin-top: 5px;
  color: ${errorRed};
`;
