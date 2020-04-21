import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';
import sizes from '../input/input-sizes.style';

import StyledIcon from '../../../components/icon/icon.style';

const getWidth = (size) => {
  switch (size) {
    case 'small':
      return '32px';
    case 'large':
      return '48px';
    default:
      return '40px';
  }
};

const InputIconToggleStyle = styled.span`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;

  ${({ size }) => css`
    margin-right: -${sizes[size].horizontalPadding};
    width: ${getWidth(size)};
  `}

  ${StyledIcon}:before {
   ${({
    theme, error, warning, info
  }) => css`
        ${info && `color: ${theme.colors.info};`}
        ${warning && `color: ${theme.colors.warning};`}
        ${error && `color: ${theme.colors.error};`}
   `};
  }
`;

InputIconToggleStyle.safeProps = ['size', 'error', 'warning', 'info'];

InputIconToggleStyle.defaultProps = {
  size: 'medium',
  theme: BaseTheme
};

InputIconToggleStyle.propTypes = {
  size: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  warning: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default InputIconToggleStyle;
