import styled, { css } from 'styled-components';

const StyledDrawerChildren = styled.div`
  flex: 1;
  margin-left: 1px;
`;

const StyledDrawerSidebar = styled.div`
  margin-top: 60px;
  display: none;
  opacity: 0;
`;

const StyledDrawerContent = styled.div`
  min-width: 40px;
  width: 40px;
  min-height: 40px;
  height: auto;
  position: relative;
  overflow: hidden;
  border-right: 1px solid #d9e0e4;

  @keyframes sidebar-visible {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes sidebar-hidden {
    0% {
      opacity: 1;
    }
    100% {
      display: none;
      opacity: 0;
    }
  }

  &.open {
    @keyframes drawer-open {
      0% {
        width: 40px;
      }
      100% {
        width: ${({ expandedWidth }) => expandedWidth};
      }
    }

    width: ${({ expandedWidth }) => expandedWidth};
    animation: drawer-open ${({ animationDuration }) => animationDuration} ease-in-out;

    ${StyledDrawerSidebar} {
      display: block;
      opacity: 1;
      animation: sidebar-visible ${({ animationDuration }) => animationDuration} ease-in-out;
    }
  }

  &.closed {
    @keyframes drawer-close {
      0% {
        width: ${({ expandedWidth }) => expandedWidth};
      }
      100% {
        width: 40px;
      }
    }
    animation: drawer-close ${({ animationDuration }) => animationDuration} ease-in-out;

    ${StyledDrawerSidebar} {
      display: block;
      opacity: 0;
      animation: sidebar-hidden ${({ animationDuration }) => animationDuration} ease-in-out;
    }
  }
`;

const StyledButton = styled.button`
  float: right;
  padding: 0;
  width: 24px;
  height: 24px;
  margin: 7px 8px auto 8px;
  transition: margin-right ${({ animationDuration }) => animationDuration} ease-in-out;
  background-color: transparent;
  border: none;

  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
  }

  @keyframes button-open {
    0% {
      float: left;
    }
    20% {
      float: right;
    }
    100% {
      float: right;
    }
  }

  @keyframes button-closed {
    0% {
      float: right;
    }
    80% {
      float: right;
    }
    100% {
      float: left;
    }
  }

  animation: button-closed ${({ animationDuration }) => animationDuration} ease-in-out;

  ${({ isExpanded }) => isExpanded && css`
    float: right;
    transform: scaleX(-1);
    margin-right: 20px;
    animation: button-open ${({ animationDuration }) => animationDuration} ease-in-out;
  `}
`;

const StyledDrawerWrapper = styled.div`
  display: flex;
  height: 100%;
`;

export {
  StyledDrawerWrapper,
  StyledDrawerContent,
  StyledDrawerChildren,
  StyledDrawerSidebar,
  StyledButton
};
