import React from 'react';
import PropTypes from 'prop-types';
import { StyledFlatTableWrapper, StyledFlatTable } from './flat-table.style';

const FlatTable = ({
  children,
  hasStickyHead,
  colorTheme,
  headerBackground
}) => {
  return (
    <StyledFlatTableWrapper
      headerBackground={ headerBackground }
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
  /** The background color of `TableHeader` */
  headerBackground: PropTypes.string,
  /** `FlatTable` color theme */
  colorTheme: PropTypes.oneOf(['dark', 'light', 'transparent'])
};

FlatTable.defaultProps = {
  colorTheme: 'transparent'
};

export default FlatTable;
