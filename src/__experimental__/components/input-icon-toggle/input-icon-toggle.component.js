import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/icon/icon';
import InputIconToggleStyle from './input-icon-toggle.style';

/**
 * An InputIconToggle Component.
 *
 * == How to use an InputIconToggle in a component:
 *
 * In your file
 *
 *   import InputIconToggle from 'carbon-react/lib/components/input-icon-toggle';
 *
 * To render an InputIconToggle:
 *
 *   <InputIconToggle
 *      content=''
 *      iconType='foo'
 *      inputId='bar'
 *    />
 *
 * Component has to be placed next to an input element, inputId prop must be the same as the id of that input.
*/
const InputIconToggle = (props) => {
  const {
    iconType,
    content,
    inputId,
    disabled,
    ...styleProps
  } = props;

  if (disabled) return null;

  return (
    <InputIconToggleStyle
      htmlFor={ inputId }
      key='label-icon'
      { ...styleProps }
    >
      { content || <Icon type={ iconType } /> }
    </InputIconToggleStyle>
  );
};

InputIconToggle.propTypes = {
  /**
   * Optional content to be rendered instead of an icon, when empty a simple icon will be rendered
   */
  content: PropTypes.node,
  /**
   * Type of an icon to render
   */
  disabled: PropTypes.bool,
  /**
   * Type of an icon to render
   */
  iconType: PropTypes.string.isRequired,
  /**
   * Id of an input that icon toggle should reside in
   */
  inputId: PropTypes.string.isRequired,
  /**
   * Hover state of the parent component
   */
  isHovered: PropTypes.bool.isRequired
};

export default InputIconToggle;
