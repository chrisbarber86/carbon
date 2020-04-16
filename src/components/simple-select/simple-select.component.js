import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import Textbox from '../../__experimental__/components/textbox';
import StyledSimpleSelect from './simple-select.style';
import SelectList from '../select-list';
import guid from '../../utils/helpers/guid';
import Events from '../../utils/helpers/events';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';

const SimpleSelect = ({
  value,
  defaultValue,
  id,
  name,
  disabled,
  readOnly,
  children,
  size,
  transparent,
  opensOnFocus,
  assignInputRef,
  onOpen,
  onChange,
  onClick,
  onFocus,
  styleOverride
}) => {
  const selectListId = guid();
  const [textboxRef, setTextboxRef] = useState();
  const [isOpen, setOpenState] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const containerRef = useRef();
  const setOpen = useCallback((val) => {
    if (val && !isOpen && onOpen) {
      onOpen();
    }
    setOpenState(val);
  }, [isOpen, onOpen]);
  const onTextboxKeyDown = useCallback(((event) => {
    event.preventDefault();

    if (Events.isBackspaceKey(event)) {
      // remove single item here
    } else if (Events.isEscKey(event)) {
      setOpen(false);
    }
  }), [setOpen]);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    } else {
      setSelectedValue(defaultValue);
    }
  }, [value, defaultValue]);

  useEffect(() => {
    const matchingOption = React.Children.toArray(children).find(option => (option.props.value === defaultValue));

    if (matchingOption) {
      setTextValue(matchingOption.props.text);
    }
  }, [defaultValue, children]);

  useEffect(() => {
    const clickEvent = 'click';
    const clickHandler = (event) => {
      if (!Events.composedPath(event).includes(containerRef.current)) {
        setOpen(false);
      }
    };

    document.addEventListener(clickEvent, clickHandler);

    return function cleanup() {
      document.removeEventListener(clickEvent, clickHandler);
    };
  }, [setOpen]);

  function handleTextboxClick() {
    if (onClick) {
      onClick();
    }

    openList();
  }

  function handleTextboxFocus() {
    if (onFocus) {
      onFocus();
    }

    if (opensOnFocus) {
      openList();
    }
  }

  function openList() {
    if (disabled || readOnly) {
      return;
    }

    setOpen(true);

    if (onOpen) {
      onOpen();
    }
  }

  function onSelectOption(optionData) {
    setOpen(false);

    setSelectedValue(optionData.value);
    setTextValue(optionData.text);

    if (onChange) {
      onchange(optionData.value);
    }
  }

  function getTextboxProps() {
    const { menu, root, ...textboxStyleOverride } = styleOverride;

    return {
      id,
      name,
      disabled,
      readOnly,
      size,
      onClick: handleTextboxClick,
      onFocus: handleTextboxFocus,
      assignInputRef,
      value: selectedValue,
      formattedValue: textValue,
      inputRef: assignInputRef,
      onKeyDown: onTextboxKeyDown,
      styleOverride: textboxStyleOverride
    };
  }

  return (
    <StyledSimpleSelect
      aria-controls={ isOpen ? selectListId : '' }
      transparent={ transparent }
      ref={ containerRef }
      styleOverride={ styleOverride.root }
    >
      <div ref={ setTextboxRef }>
        <Textbox
          inputIcon='dropdown'
          placeholder='Please Select...'
          { ...getTextboxProps() }
        />
      </div>
      { isOpen && (
        <SelectList
          anchorElement={ textboxRef }
          id={ selectListId }
          onSelectOption={ onSelectOption }
          styleOverride={ styleOverride.menu }
        >
          { children }
        </SelectList>
      ) }
    </StyledSimpleSelect>
  );
};

SimpleSelect.defaultProps = {
  styleOverride: {},
  opensOnFocus: true
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
  /** Child components (such as Option) for the SelectList */
  children: PropTypes.node,
  /** If true the Component will be read-only */
  readOnly: PropTypes.bool,
  /** If true the Component will be disabled? */
  disabled: PropTypes.bool,
  /** Focus opens the menu */
  opensOnFocus: PropTypes.bool,
  /** Size of an input */
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  /** If true the component input has no border and is transparent */
  transparent: PropTypes.bool,
  /** A callback to retrieve the input reference */
  assignInputRef: PropTypes.func,
  /** A custom callback for when the dropdown menu opens */
  onOpen: PropTypes.func,
  /** A custom callback for when changes occur */
  onChange: PropTypes.func,
  /** Callback function for when the Select Textbox is clicked. */
  onClick: PropTypes.func,
  /** Callback function for when the Select Textbox is focused. */
  onFocus: PropTypes.func,
  /** Allows to override existing component styles */
  styleOverride: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    menu: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  })
};

export default SimpleSelect;
