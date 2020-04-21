import * as React from 'react';

export interface NumeralDateProps {
  defaultValue?: object;
  dateFormat?: string[];
  inputIcon?: string;
  placeholder: string;
  value?: object;
  id?: string;
  name?: string;
  onBlur?: () => void;
  onChange?: () => void;
  /** Prop to indicate that an error has occurred */
  error?: boolean | string;
  /** Prop to indicate that a warning has occurred */
  warning?: boolean | string;
  /** Prop to indicate additional information  */
  info: boolean | string;
}
declare const NumeralDate: React.ComponentType<NumeralDateProps>;
export default NumeralDate;
