import { useRef } from "react";
import styled from "styled-components";
import ReactSelect, { StylesConfig } from "react-select";
import {
  backgroundGray,
  errorRed,
  kabul,
  lightGray,
  lightKabul,
} from "../../colors";

const selectHeight = 48;
const fontSize = 18;

const colourStyles: StylesConfig = {
  container: (base) => ({
    ...base,
    width: "100%",
    maxWidth: "100%",
    marginTop: 8,
    fontFamily: "inherit",
  }),
  input: (base) => ({
    ...base,
    fontFamily: "inherit",
    fontSize,
    "& input": {
      fontFamily: "inherit",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    fontFamily: "inherit",
    fontSize,
  }),
  control: (base, state) => ({
    ...base,
    cursor: "pointer",
    height: selectHeight,
    minHeight: selectHeight,
    border: `1px solid ${
      state.selectProps["aria-errormessage"]
        ? errorRed
        : state.isFocused
        ? kabul
        : lightGray
    }`,
    borderRadius: 2,
    boxShadow: "none",
    ":hover": {
      border: `1px solid ${state.isFocused ? kabul : lightKabul}`,
    },
  }),
  singleValue: (base) => ({
    ...base,
    fontFamily: "inherit",
    fontSize,
    width: "100%",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  option: (base, state) => ({
    ...base,
    fontFamily: "inherit",
    fontSize: 18,
    cursor: "pointer",
    borderBottom: `1px solid ${backgroundGray}`,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    alignItems: "center",
    background: state.isSelected ? backgroundGray : "transparent",
    color: kabul,
    ":hover, :active, :focus": {
      background: backgroundGray,
    },
  }),
};

export interface SelectProps {
  value: string | { value: string; label: string };
  placeholder: string;
  label?: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  disabled?: boolean;
  className?: string;
  errors?: string | string[];
}
export function Select(props: SelectProps) {
  const selectRef = useRef<ReactSelect>(null);

  const hasError = Array.isArray(props.errors)
    ? props.errors.length > 0
    : !!props.errors;

  const select = (
    <ReactSelect
      // @ts-ignore no idea how to make this one happy
      ref={selectRef}
      label={props.label}
      placeholder={props.placeholder}
      value={
        props.value
          ? typeof props.value === "string"
            ? { value: props.value, label: props.value }
            : props.value
          : undefined
      }
      onChange={(option: any) => props.onChange(option?.value)}
      options={props.options}
      isDisabled={props.disabled}
      styles={colourStyles}
      error={hasError}
    />
  );

  return (
    <Root className={props.className}>
      {props.label && <Label>{props.label}</Label>}
      <SelectWrapper>{select}</SelectWrapper>
    </Root>
  );
}

Select.defaultProps = {
  colourStyles,
};

const Root = styled.div`
  margin-bottom: 32px;
`;

const Label = styled.label`
  font-size: 14px;
  line-height: 18px;
  font-weight: 300;
  color: ${kabul};
`;

const SelectWrapper = styled.div`
  margin-top: 5px;
`;
