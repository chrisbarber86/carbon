import styled, { css } from 'styled-components';
import StyledInputPresentation from '../input/input-presentation.style';
import StyledIcon from '../../../components/icon/icon.style';
import StyledButton from '../../../components/button/button.style';
import { baseTheme } from '../../../style/themes';
import StyledFormField from '../form-field/form-field.style';

const StyledSearch = styled.div`
  padding-bottom: 2px;
  background-color: transparent;
  ${({ theme }) => `border-bottom: 2px solid ${theme.search.passive};`}
  display: inline-flex;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 0px;
  :hover {
    ${({ theme }) => css` 
    border-bottom-color: ${theme.search.active};`}
    cursor: pointer;
  }

  ${({ isFocused, searchHasValue }) => css`
    ${!isFocused && !searchHasValue && css`
      ${StyledInputPresentation} {
        border: 1px solid transparent;
        color: rgba(0, 0, 0, 0.65);
      }
    `}
    ${(isFocused || searchHasValue) && css`
      border-bottom: 2px solid transparent;
      /* transition: border 0.2s ease, background 0.2s ease; */
      color: rgba(0, 0, 0, 0.9);
      :hover {
        border-bottom: 2px solid transparent;
        padding-bottom: 2px;
      }
    `}
  `}

  ${({ isFocused, searchIsActive }) => css`
    ${isFocused && !searchIsActive && css`
    border-bottom: 2px solid transparent;
    padding-bottom: 2px;
      color: rgba(0, 0, 0, 0.9);
    `}
  `}

  ${StyledInputPresentation} {
    width: ${
  ({
    hasSearchButton, isFocused, searchIsActive, searchHasValue
  }) => (
    hasSearchButton && (isFocused || searchIsActive || searchHasValue) ? '335px;' : '375px;'
  )};
    background-color: transparent;
    font-size: 14px;
    font-weight: 700;
    padding-bottom: 2px;
    padding-top: 1px; 
    cursor: pointer;
  }

  ${StyledFormField} { 
    z-index: 10;
  }

  ${StyledButton} { 
    background-color: #255BC7;
    cursor: pointer;
    color: white;
  }

  ${StyledIcon} {
    color: #668592;
    width: 20px;
    height: 20px;
    cursor: pointer;
    :hover {
      color: rgba(0, 0, 0, 0.65);
    };
  }
`;

StyledSearch.defaultProps = { theme: baseTheme };
export default StyledSearch;

export const StyledSearchButton = styled.div` 
  display: inline-flex;
  border-bottom: 2px solid transparent;
  &&& ${StyledButton} {
    ${({ theme }) => `
    background-color: ${theme.colors.primary};
    border-color: ${theme.colors.primary};
    :hover {
      background: ${theme.colors.secondary};
      border-color: ${theme.colors.secondary};
    }
    `}
    width: 43px;
    height: 43px;
    margin: 0px 0px;
    padding-bottom: 3px;
    :focus {
     z-index: 10;
    }
  }
`;

export const StyledButtonIcon = styled.div`
   &&& ${StyledIcon} {
     color: white;
     margin-right: 0px;
    }
`;

StyledSearchButton.defaultProps = { theme: baseTheme };
