import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import StyledSelectList from './select-list.style';

const SelectList = ({
  id,
  children,
  onSelectOption,
  anchorElement,
  styleOverride
}) => {
  const list = useRef();

  useEffect(() => {
    if (anchorElement) {
      const inputBoundingRect = anchorElement.getBoundingClientRect();
      const top = `${inputBoundingRect.height}px`;
      const width = `${inputBoundingRect.width}px`;
      list.current.setAttribute('style', `top: ${top}; width: ${width};`);
    }
  }, [anchorElement]);

  function applyListProps() {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, { onSelectOption: onSelect });
    });
  }

  function onSelect(optionData) {
    onSelectOption(optionData);
  }

  return (
    <StyledSelectList
      id={ id }
      role='presentation'
      ref={ list }
      styleOverride={ styleOverride }
    >
      { applyListProps() }
    </StyledSelectList>
  );
};

SelectList.defaultProps = {
  styleOverride: {}
};

SelectList.propTypes = {
  /** The ID for the parent <div> */
  id: PropTypes.string,
  /** Child components (such as <Option>) for the <ScrollableList> */
  children: PropTypes.node,
  /** A callback for when a child is selected */
  onSelectOption: PropTypes.func,
  /** DOM element to position the dropdown menu list relative to */
  anchorElement: PropTypes.object,
  /** Allows to override existing component styles */
  styleOverride: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

export default SelectList;
