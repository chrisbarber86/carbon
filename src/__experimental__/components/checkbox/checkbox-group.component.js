import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { StyledCheckboxGroup } from './checkbox.style';
import FormField from '../form-field';

const CheckboxGroup = (props) => {
  const {
    children,
    groupName,
    error,
    warning,
    info
  } = props;

  const groupLabelId = `${groupName}-label`;

  return (
    <StyledCheckboxGroup
      aria-labelledby={ groupLabelId }
      role='checkbox'
      error={ error }
      warning={ warning }
      info={ info }
      { ...tagComponent('checkboxgroup', props) }
    >
      <FormField { ...props }>
        {React.Children.map(children, child => React.cloneElement(child, {
          inputName: groupName
        }))}
      </FormField>
    </StyledCheckboxGroup>
  );
};

CheckboxGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  groupName: PropTypes.string.isRequired,
  /** Prop to indicate that an error has occurred */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Prop to indicate that a warning has occurred */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Prop to indicate additional information  */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default CheckboxGroup;
