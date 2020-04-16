import React from 'react';
import PropTypes from 'prop-types';
import Event from '../../../utils/helpers/events/events';
import Icon from '../../icon';
import StyledSort from './sort.style';

const Sort = ({ children, onClick, sortType }) => {
  const onKeyDown = (e) => {
    if (Event.isEnterOrSpaceKey(e)) {
      e.preventDefault();
      return onClick();
    }

    return null;
  };

  return (
    <StyledSort
      type='button'
      onKeyDown={ onKeyDown }
      tabIndex={ 0 }
      onClick={ onClick }
    >
      {children}
      {sortType && <Icon type={ sortType === 'asc' ? 'sort_up' : 'sort_down' } />}
    </StyledSort>

  );
};

Sort.propTypes = {
  /** if `asc` it will show `sort_up` icon, if `desc` it will show `sort_down` */
  sortType: PropTypes.oneOf(['asc', 'desc']),
  /** Callback fired when the `FlatTableSortHeader` is clicked */
  onClick: PropTypes.func,
  /** Sets the content of `FlatTableSortHeader` */
  children: PropTypes.node
};

export default Sort;
