import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import StyledSelectList from './select-list.style';

const SelectList = ({
  id,
  isLoopable,
  children,
  onSelect,
  anchorElement
}) => {
  const list = useRef();

  const positionList = (boundingRect) => {
    const top = `${boundingRect.height}px`;
    const width = `${boundingRect.width}px`;
    list.current.setAttribute('style', `top: ${top}; width: ${width};`);
  };

  useEffect(() => {
    if (anchorElement) {
      const inputBoundingRect = anchorElement.getBoundingClientRect();
      positionList(inputBoundingRect);
    }
  }, [anchorElement]);

  return (
    <StyledSelectList
      id={ id }
      role='presentation'
      ref={ list }
    >
      { children }
    </StyledSelectList>
  );
};

SelectList.propTypes = {
  /** The ID for the parent <div> */
  id: PropTypes.string,
  /** Child components (such as <Option>) for the <ScrollableList> */
  children: PropTypes.node,
  /** Flag to indicite whether select list is loopable while traversing using up and down keys */
  isLoopable: PropTypes.bool,
  /** A callback for when a child is selected */
  onSelect: PropTypes.func,
  /** DOM element to position the dropdown menu list relative to */
  anchorElement: PropTypes.object
};

export default SelectList;
