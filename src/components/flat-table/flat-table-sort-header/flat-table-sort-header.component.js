import React from 'react';
import PropTypes from 'prop-types';
import FlatTableHeader from '../flat-table-header/flat-table-header.component';
import Event from '../../../utils/helpers/events';
import StyledFlatTableSortHeaderStyle from './flat-table-sort-header.style';

const FlatTableSortHeader = ({ children, onClick, ...props }) => {
  const onKeyDown = (e) => {
    if (Event.isEnterOrSpaceKey(e)) {
      e.preventDefault();
      return onClick();
    }

    return null;
  };

  return (
    <FlatTableHeader { ...props }>
      <StyledFlatTableSortHeaderStyle
        onKeyDown={ onKeyDown }
        tabIndex={ 0 }
        onClick={ onClick }
      >
        {children}
      </StyledFlatTableSortHeaderStyle>
    </FlatTableHeader>
  );
};

FlatTableSortHeader.propTypes = {
  /** Content alignment */
  align: PropTypes.oneOf(['center', 'left', 'right']),
  /** Callback fired when the `FlatTableSortHeader` is clicked */
  onClick: PropTypes.func,
  /** Sets the content of `FlatTableSortHeader` */
  children: PropTypes.node
};

export default FlatTableSortHeader;
