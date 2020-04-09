import * as React from 'react';

export interface FlatTableSortHeaderProps {
  /** Callback fired when the `FlatTableSortHeader` is clicked */
  onClick: () => void;
  /** Sets the content of `FlatTableSortHeader` */
  children: React.ReactNode | string;
}

declare const FlatTableSortHeader: React.FunctionComponent<FlatTableSortHeaderProps>;

export default FlatTAbleSortHeader;
