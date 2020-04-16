import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import baseTheme from '../../style/themes/base';

const StyledOption = styled.li`
  cursor: pointer;
  box-sizing: content-box;
  padding: 5px 6px;
  width: 100%;
  user-select: none;

  :hover, :focus {
    ${({ theme }) => css`background-color: ${theme.select.selected};`}
  }
`;

StyledOption.propTypes = {
  id: propTypes.any,
  isSelected: propTypes.bool,
  theme: propTypes.object
};

StyledOption.defaultProps = {
  isSelectable: true, // defaulted to true so it integrates with ScrollableList by default,
  theme: baseTheme
};

export default StyledOption;
