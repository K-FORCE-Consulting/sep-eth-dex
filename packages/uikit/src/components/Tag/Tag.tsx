import React from "react";
import { scales, TagProps } from "./types";
import { StyledTag } from "./StyledTag";

const Tag: React.FC<React.PropsWithChildren<TagProps>> = ({ startIcon, endIcon, children, ...props }) => (
  <StyledTag {...props}>
    {React.isValidElement(startIcon) &&
      React.cloneElement(startIcon as React.ReactElement<any>, {
        mr: "0.5em",
      })}
    {children}
    {React.isValidElement(endIcon) &&
      React.cloneElement(endIcon as React.ReactElement<any>, {
        ml: "0.5em",
      })}
  </StyledTag>
);

/* eslint-disable react/default-props-match-prop-types */
Tag.defaultProps = {
  variant: "primary",
  scale: scales.MD,
  outline: false,
};

export default Tag;
