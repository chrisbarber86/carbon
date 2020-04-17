import styled, { css } from 'styled-components';
import StyledInput from '../../__experimental__/components/input/input.style';
import StyledInputPresentation from '../../__experimental__/components/input/input-presentation.style';
import baseTheme from '../../style/themes/base';

const StyledPagerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9px 24px;
  align-items: center;
  border-top-width: 0;
  font-size: 13px;
  ${({ theme }) => {
    return theme.table && theme.colors && css`

      border-width: 1px 1px 1px 1px;
      border-style: none solid solid solid;
      border-color: ${theme.table.secondary};
      background-color: ${theme.table.zebra};

      .carbon-input-icon {
        border: none;
        background: none;

        &:hover {
          background: none;
          color: ${theme.colors.black};
        }
      }

      .common-input__field:focus-within {
        outline: 3px solid ${theme.colors.focus};
      }

      .common-input__input {
        border: 1px solid ${theme.colors.border};

        &:active, &:hover, &:focus {
          border: 1px solid ${theme.colors.border};
        }

        &:focus {
          border: 1px solid ${theme.colors.border};
          color: ${theme.colors.black};
        }

        &:focus ~ label .carbon-input-icon, &:focus ~ label .carbon-input-icon:hover {
          border: none;
          background: none;
          color: ${theme.colors.black};
        }

        &:hover ~ label .carbon-input-icon {
          border: none;
          background: none;
          color: ${theme.colors.black};
        }

        &:hover ~ label .carbon-input-icon:hover {
          border: none;
          background: none;
        }
      }
    `;
  }}
  border-top: none;
`;

const StyledPagerSizeOptions = styled.div`
  display: flex;
  flex: 1 1 30%;
  justify-content: flex-start;

  .carbon-dropdown {
    width: 55px;
    margin: 0 4px;
  }
`;

const StyledPagerSizeOptionsInner = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPagerNavigation = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;


  && ${StyledInputPresentation} {
    padding: 0;
    margin: 0 4px;
    line-height: 24px;
    min-height: 24px;

    ${StyledInput} {
      text-align: center;
      height: 24px;

    }
  }
`;

const StyledPagerNavInner = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
`;

const StyledPagerLinkStyles = styled.button`
  padding: 0 10px;
  font-size: 13px;
  border-width: 0;
  background-color: transparent;
  cursor: pointer;
  margin-left: 7px;
  margin-right: 7px;

  ${({ theme }) => theme.pager && css`
    color: ${theme.pager.active};

    ${({ disabled }) => !disabled && css`
      &:hover {
        text-decoration: underline;
        padding: 5px 10px;
      }

      &:focus {
        outline: solid 3px ${theme.colors.focus};
        padding: 5px 10px;
      }
    `}
  `}

  ${({ disabled, theme }) => disabled && theme && css`
    color: ${theme.menu.itemColorDisabled};
    cursor: not-allowed;
  `}
`;

const StyledPagerNoSelect = styled.span`
  user-select: none;
  white-space: nowrap;
`;

const StyledPagerSummary = styled.div`
  display: flex;
  flex: 1 1 30%;
  justify-content: flex-end;
`;

StyledPagerContainer.defaultProps = {
  theme: baseTheme
};

StyledPagerSizeOptions.defaultProps = {
  theme: baseTheme
};

StyledPagerSizeOptionsInner.defaultProps = {
  theme: baseTheme
};

StyledPagerNavigation.defaultProps = {
  theme: baseTheme
};

StyledPagerNavInner.defaultProps = {
  theme: baseTheme
};

StyledPagerLinkStyles.defaultProps = {
  theme: baseTheme
};

StyledPagerSummary.defaultProps = {
  theme: baseTheme
};

export {
  StyledPagerContainer,
  StyledPagerSizeOptions,
  StyledPagerSizeOptionsInner,
  StyledPagerNavigation,
  StyledPagerNavInner,
  StyledPagerLinkStyles,
  StyledPagerNoSelect,
  StyledPagerSummary
};
