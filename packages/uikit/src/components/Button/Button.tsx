import React, { cloneElement, ElementType, isValidElement, ReactElement } from "react";
import EXTERNAL_LINK_PROPS from "../../util/externalLinkProps";
import StyledButton from "./StyledButton";
import { ButtonProps, scales, variants } from "./types";

const Button = <E extends ElementType = "button">({
  startIcon,
  endIcon,
  external = false,
  className,
  isLoading = false,
  disabled = false,
  children,
  variant = variants.PRIMARY,
  scale = scales.MD,
  ...rest
}: ButtonProps<E>) => {
  const internalProps = external ? EXTERNAL_LINK_PROPS : {};
  const isDisabled = isLoading || disabled;
  const classNames = className ? [className] : [];

  if (isLoading) {
    classNames.push("pancake-button--loading");
  }

  if (isDisabled && !isLoading) {
    classNames.push("pancake-button--disabled");
  }

  return (
    <StyledButton
      $isLoading={isLoading}
      className={classNames.join(" ")}
      disabled={isDisabled}
      variant={variant}
      scale={scale}
      {...internalProps}
      {...rest}
    >
      <>
        {isValidElement(startIcon) &&
          cloneElement(startIcon as ReactElement<any>, {
            style: { 
              marginRight: "0.5rem", 
              ...((startIcon as ReactElement<any>).props?.style || {}) 
            },
          })}
        {children}
        {isValidElement(endIcon) &&
          cloneElement(endIcon as ReactElement<any>, {
            style: { 
              marginLeft: "0.5rem", 
              ...((endIcon as ReactElement<any>).props?.style || {}) 
            },
          })}
      </>
    </StyledButton>
  );
};

export default Button;
