import React from 'react';
import PropTypes from 'prop-types';
import { StyledFlatTableWrapper, StyledFlatTable } from './flat-table.style';

const FlatTable = ({
  children,
  hasStickyHead,
  colorTheme,
  styleOverride
}) => {
  return (
    <StyledFlatTableWrapper
      styleOverride={ styleOverride.headerBackground }
      hasStickyHead={ hasStickyHead }
      colorTheme={ colorTheme }
    >
      <StyledFlatTable data-component='flat-table'>
        { children }
      </StyledFlatTable>
    </StyledFlatTableWrapper>
  );
};

FlatTable.propTypes = {
  /** FlatTableHead and FlatTableBody */
  children: PropTypes.node.isRequired,
  /** If true, the header does not scroll with the content */
  hasStickyHead: PropTypes.bool,
  /** Override `TableHeader` background color */
  styleOverride: PropTypes.object,
  /** Setup one of theme colors to the Table */
  colorTheme: PropTypes.string
};

FlatTable.defaultProps = {
  styleOverride: {},
  colorTheme: 'transparent'
};

export default FlatTable;
