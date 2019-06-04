import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';
import StyledInputPresentation from '../../../__experimental__/components/input/input-presentation.style';
import StyledInput from '../../../__experimental__/components/input/input.style';
import tableSizes from '../table-sizes.style.js';
import { isClassic } from '../../../utils/helpers/style-helper';

const StyledTableCell = styled.td`
  ${({
    action, align, theme, size, isTextArea
  }) => {
    const { colors, table } = theme;
    return css`
      background-color: ${table.primary};
      border-width: 0;
      border-bottom: 1px solid ${table.secondary};
      font-size: 13px;
      overflow: visible;
      padding: 8px;
      text-align: ${align};
      vertical-align: middle;
      white-space: nowrap;

      > .common-input {
        margin-bottom: -4px;
        margin-left: -6px;
        margin-right: -6px;
        margin-top: -4px;
      }
      
      ${action && applyActionStyling(colors)}

      ${!isClassic(theme) && size ? applyModernPresentationStyling(size, isTextArea) : ''}
    `;
  }}
`;

function applyActionStyling(colors) {
  return css`
    width: 18px;

    .icon-delete:before {
      cursor: pointer;
      color: ${colors.border};
      font-size: 16px;
      line-height: 15px;
      margin-left: 1px;
    }

    .icon-delete:hover:before {
      color: #C7384F;
    }
  `;
}

function applyModernPresentationStyling(size, isTextArea) {
  const { inputHeight, fontSize, paddingSize } = tableSizes[size];
  return `
    ${StyledInputPresentation} {
      min-height: ${inputHeight}px;
      ${!isTextArea ? `height: ${inputHeight}px;` : ''};
      padding-left: ${paddingSize};
      padding-right: ${paddingSize};
      position: relative;
      ${applyModernInputStyling(isTextArea, inputHeight, fontSize)}
    }
  `;
}

function applyModernInputStyling(isTextArea, inputHeight, fontSize) {
  if (isTextArea) {
    return `
      height: ${inputHeight * 3}px;
      margin-top: 4px;
      margin-bottom: 4px; 

      textarea {
        font-size: ${fontSize};
        overflow: auto;
        resize: none;
        flex-grow: 1;
        height: auto !important;
        min-height: ${inputHeight * 3}px;
        padding-top: 5px;
        padding-bottom: 5px;
      }
    `;
  }
  return `
    height: ${inputHeight}px;
    ${StyledInput} {
      font-size: ${fontSize};
      height: ${inputHeight}px;
      padding-top: 0px;
      padding-bottom: 0px;
    }
  `;
}

StyledTableCell.propTypes = {
  /** Defines the cell type to be an action - used for the delete cell. */
  action: PropTypes.bool,

  /** Defines the alignment of the cell (eg "left", "center" or "right"). */
  align: PropTypes.oneOf(OptionsHelper.alignFull),

  /** Defines the height of a cell used to size an input for example */
  size: PropTypes.oneOf(OptionsHelper.tableSizes),

  /** Used to toggle the input wrapper height. */
  isTextArea: PropTypes.bool
};

StyledTableCell.defaultProps = {
  theme: baseTheme,
  align: 'left'
};

export default StyledTableCell;
