import * as React from 'react';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  fieldHelp?: string;
  fieldHelpInline?: boolean;
  id?: string;
  inputWidth?: number | string;
  label?: string;
  labelHelp?: string;
  labelAlign?: string;
  labelInline?: boolean;
  labelWidth?: number | string;
  loading?: boolean;
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  reverse?: boolean;
  size?: string;
  theme?: object;
  value: string;
  error?: boolean | string;
  warning?: boolean | string;
  info?: boolean | string;
}

declare const Switch: React.ComponentClass<SwitchProps>;

export { Switch as default };
