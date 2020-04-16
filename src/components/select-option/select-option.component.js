import React from 'react';
import PropTypes from 'prop-types';
import StyledOption from './select-option.style';

const Option = ({
  text,
  children,
  onSelectOption,
  value,
  ...props
}) => {
  function onSelect() {
    onSelectOption({ text, value });
  }

  return (
    <StyledOption
      data-component='select-option'
      onClick={ onSelect }
      { ...props }
    >
      { children || text }
    </StyledOption>
  );
};

Option.propTypes = {
  /** The option's visible text, displayed within <Textbox> of <Select>, and used for filtering */
  text: PropTypes.string.isRequired,
  /** Optional: alternative rendered content, displayed within <SelectList> of <Select> (eg: an icon, an image, etc) */
  children: PropTypes.node,
  /** The option's invisible internal value */
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  /** if defined, this object can be used to provide optional extra properties */
  options: PropTypes.object,
  /** returns value when the element is selected */
  onSelectOption: PropTypes.func
};

export default Option;
