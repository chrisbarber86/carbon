import * as React from 'react';

export interface RadioButtonGroupProps {
  children: React.ReactNode;
  groupName: string;
  label: string;
  labelHelp?: string;
  /** Prop to indicate that an error has occurred */
  error: boolean | string;
  /** Prop to indicate that a warning has occurred */
  warning: boolean | string;
  /** Prop to indicate additional information  */
  info: boolean | string;
  styleOverride?: {
    root?: object;
    content?: object;
    legend?: object;
  };
}

declare const RadioButtonGroup: React.ComponentClass<RadioButtonGroupProps>;

export { RadioButtonGroup };
