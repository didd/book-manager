import { ReactNode } from "react";
import styled, { css, StyledComponent } from "styled-components";
import { backgroundGray, kabul, lightKabul, midGray, white } from "../colors";
import { Stack } from "../Stack";

type Props = {
  type?: "button" | "submit" | "reset" | undefined;
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  action: () => void;
  children: string;
};

const Base = ({
  type,
  icon,
  disabled,
  className,
  action,
  component,
  children,
}: Props & {
  component: StyledComponent<
    "button",
    any,
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >;
}) => {
  const Component = component;
  return (
    <Component
      className={disabled ? "disabled" : className}
      onClick={disabled ? undefined : action}
      type={type}
    >
      <Stack align="center" justify="center">
        {icon && <Icon>{icon}</Icon>}
        {children}
      </Stack>
    </Component>
  );
};

export const PrimaryButton = (props: Props) => (
  <Base {...props} component={Primary} />
);

export const SecondaryButton = (props: Props & { active?: boolean }) => (
  <Base {...props} component={props.active ? Primary : Secondary} />
);

const commonStyles = css`
  border-radius: 5px;
  padding: 8px 24px;
  border: none;
  box-sizing: border-box;
  transition: background 0.1s;
  cursor: pointer;

  &:hover {
    transition: none;
  }

  &.disabled,
  &.disabled:hover {
    background: ${backgroundGray};
    cursor: default;
    color: ${midGray};
    border-color: transparent;
    filter: none;
  }
`;

const Primary = styled.button`
  ${commonStyles};
  color: ${white};
  background: ${kabul};
`;

const Secondary = styled.button`
  ${commonStyles};
  background: white;
  border: 1px solid ${lightKabul};
`;

const Icon = styled.i`
  height: 10px;
  width: 10px;
`;
