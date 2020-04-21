import * as React from 'react';

interface CheckboxGroupProps {
  children: React.FunctionComponent | React.ComponentClass;
  groupName: string;
  /** Prop to indicate that an error has occurred */
  error?: boolean | string;
  /** Prop to indicate that a warning has occurred */
  warning?: boolean | string;
  /** Prop to indicate additional information  */
  info: boolean | string;
}

declare const CheckboxGroup: React.ComponentClass<CheckboxGroupProps>;

export { CheckboxGroup };
