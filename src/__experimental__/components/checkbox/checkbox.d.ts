import * as React from 'react';

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  fieldHelpInline?: boolean;
  id?: string;
  inputWidth?: number | string;
  label?: string;
  labelAlign?: string;
  labelWidth?: number | string;
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  reverse?: boolean;
  size?: string;
  value: string;
  /** Prop to indicate that an error has occurred */
  error?: boolean | string;
  /** Prop to indicate that a warning has occurred */
  warning?: boolean | string;
  /** Prop to indicate additional information  */
  info: boolean | string;
}

declare const Checkbox: React.ComponentClass<CheckboxProps>;

export { Checkbox };
