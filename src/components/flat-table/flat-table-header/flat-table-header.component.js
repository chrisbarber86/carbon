import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper';
import { StyledFlatTableHeader, StyledFlatTableHeaderContent } from './flat-table-header.style';
import Events from '../../../utils/helpers/events';

const FlatTableHeader = ({
  align, children, onClick
}) => {
  const handleKeyDown = (e) => {
    if (Events.isEnterOrSpaceKey(e)) {
      e.preventDefault();

      return onClick(children);
    }

    return null;
  };

  return (
    <StyledFlatTableHeader
      align={ align }
      data-element='flat-table-header'
    >
      <StyledFlatTableHeaderContent
        tabIndex={ 0 }
        onKeyDown={ onClick ? handleKeyDown : null }
        onClick={ onClick ? () => onClick(children) : null }
      >
        { children }
      </StyledFlatTableHeaderContent>
    </StyledFlatTableHeader>
  );
};

FlatTableHeader.propTypes = {
  /** Content alignment */
  align: PropTypes.oneOf(OptionsHelper.alignFull),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

FlatTableHeader.defaultProps = {
  align: 'left'
};

export default FlatTableHeader;
