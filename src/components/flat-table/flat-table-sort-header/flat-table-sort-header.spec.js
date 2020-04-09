import React from 'react';
import { mount } from 'enzyme';
import { FlatTableSortHeader, FlatTableRow } from '..';
import FlatTable from '../flat-table.component';
import FlatTableHead from '../flat-table-head/flat-table-head.component';
import FlatTableBody from '../flat-table-body/flat-table-body.component';
import FlatTableCell from '../flat-table-cell/flat-table-cell.component';
import StyledFlatTableSortHeaderStyle from './flat-table-sort-header.style';

describe('FlatTableSortHeader', () => {
  let wrapper;
  let onClickFn;
  let onKeyDownFn;
  const enterKey = { keyCode: 13, which: 13 };
  const spaceKey = { keyCode: 32, which: 32 };
  const randomKey = { keyCode: 82, which: 82 };

  beforeEach(() => {
    onClickFn = jest.fn();
    onKeyDownFn = jest.fn();
    wrapper = renderFlatTable({ onClick: onClickFn }, { onKeyDown: onKeyDownFn });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should react to space key', () => {
    wrapper.find(StyledFlatTableSortHeaderStyle).first().simulate('keyDown', spaceKey);

    expect(onClickFn).toHaveBeenCalledTimes(1);
  });

  it('should react to enter key', () => {
    wrapper.find(StyledFlatTableSortHeaderStyle).first().simulate('keyDown', enterKey);

    expect(onClickFn).toHaveBeenCalledTimes(1);
  });

  it('should not react to different key than enter key or space key', () => {
    wrapper.find(StyledFlatTableSortHeaderStyle).first().simulate('keyDown', randomKey);

    expect(onClickFn).toHaveBeenCalledTimes(0);
  });
});

function renderFlatTable(props, styledSortProps, renderer = mount) {
  return renderer(
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableSortHeader { ...props }>
            <StyledFlatTableSortHeaderStyle { ...styledSortProps }>
              header 1
            </StyledFlatTableSortHeaderStyle>
          </FlatTableSortHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>cell2</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
}
