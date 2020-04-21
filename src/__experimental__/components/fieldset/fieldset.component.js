import React from 'react';
import PropTypes from 'prop-types';
import { validProps } from '../../../utils/ether';
import tagComponent from '../../../utils/helpers/tags';
import { FieldsetStyle, LegendContainerStyle, FieldsetContentStyle } from './fieldset.style';
import ValidationIcon from '../../../components/validations/validation-icon.component';

const shouldDisplayValidationIcon = ({ error, warning, info }) => {
  const validation = error || warning || info;
  return typeof validation === 'string';
};

const Fieldset = (props) => {
  const validationIcon = () => {
    if (shouldDisplayValidationIcon(props)) {
      return (
        <ValidationIcon
          error={ props.error }
          warning={ props.warning }
          info={ props.info }
          tabIndex={ 0 }
        />
      );
    }

    return null;
  };

  const legend = () => {
    if (!props.legend) return null;

    return (
      <LegendContainerStyle
        inline={ props.inline }
        data-component='legend-style'
        styleOverride={ props.styleOverride.legend }
      >
        <legend data-element='legend'>
          { props.legend }
        </legend>
        { validationIcon() }
      </LegendContainerStyle>
    );
  };

  const { ...safeProps } = validProps({
    propTypes: Fieldset.propTypes,
    props
  });

  return (
    <FieldsetStyle
      { ...tagComponent('fieldset', props) }
      { ...safeProps }
      styleOverride={ props.styleOverride.root }
    >
      <FieldsetContentStyle
        data-component='fieldset-style'
        inline={ props.inline }
      >
        { legend() }
        { props.children }
      </FieldsetContentStyle>
    </FieldsetStyle>
  );
};

Fieldset.propTypes = {
  /** Child elements */
  children: PropTypes.node,
  /** The text for the fieldsets legend element. */
  legend: PropTypes.string,
  /** Prop to indicate that an error has occurred */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Prop to indicate that a warning has occurred */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Prop to indicate additional information  */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** When true, legend is placed in line with the children */
  inline: PropTypes.bool,
  /** Allows to override existing component styles */
  styleOverride: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    legend: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  })
};

Fieldset.defaultProps = {
  inline: false,
  styleOverride: {}
};

export default Fieldset;
