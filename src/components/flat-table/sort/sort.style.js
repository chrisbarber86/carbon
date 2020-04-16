import styled from 'styled-components';
import StyledIcon from '../../icon/icon.style';
import { baseTheme } from '../../../style/themes';

const StyledSort = styled.div`
  display: inline-flex;
  align-items: center;
  padding-left: 2px;
  border-bottom: 1px solid transparent;

  ${StyledIcon}{
    width: 16px;
    height: 16px;
    padding-left: 8px;
    color: ${({ theme }) => theme.flatTable.default.headerIconColor};
  };

  :hover{
    border-bottom: 1px solid;
    cursor: pointer;
  };

  :focus{
    outline: 1px solid ${({ theme }) => theme.colors.focus};
  };
`;

StyledSort.defaultProps = {
  theme: baseTheme
};

export default StyledSort;
