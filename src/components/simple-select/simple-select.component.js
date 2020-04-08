import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Textbox from '../../__experimental__/components/textbox';
import StyledSimpleSelect from './simple-select.style';
import SelectList from '../select-list';
import guid from '../../utils/helpers/guid';

const SimpleSelect = ({
  value,
  defaultValue,
  id,
  name,
  children,
  onOpen,
  transparent
}) => {
  const selectListId = guid();
  const textboxProps = {
    value,
    defaultValue,
    id,
    name,
    onClick: handleClick,
    onFocus: handleFocus
  };
  const [textboxRef, setTextboxRef] = useState();
  const [open, setOpen] = useState(false);

  function handleClick() {
    openList();
  }

  function handleFocus() {
    openList();
  }

  function openList() {
    setOpen(true);
    if (onOpen) {
      onOpen();
    }
  }

  return (
    <StyledSimpleSelect
      aria-controls={ open ? selectListId : '' }
      transparent={ transparent }
    >
      <div ref={ setTextboxRef }>
        <Textbox
          { ...textboxProps }
        />
      </div>
      <SelectList anchorElement={ textboxRef } id={ selectListId }>
        { children }
      </SelectList>
    </StyledSimpleSelect>
  );
};

const valuePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object
]);

SimpleSelect.propTypes = {
  /** The selected value(s), when the component is operating in controlled mode */
  value: valuePropType,
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue: valuePropType,
  /** ID attribute of the component */
  id: PropTypes.string,
  /** Name attribute of the component */
  name: PropTypes.string,
  /** Child components (such as <Option>) for the <SelectList> */
  children: PropTypes.node,
  /** A custom callback for when the dropdown menu opens */
  onOpen: PropTypes.func,
  /** If true the component input has no border and is transparent */
  transparent: PropTypes.bool
};

export default SimpleSelect;
