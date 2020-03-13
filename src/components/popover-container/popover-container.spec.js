/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import { css } from 'styled-components';
import { act } from 'react-dom/test-utils';
import {
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerIcon
} from './popover-container.style';
import StyledIcon from '../icon/icon.style';
import PopoverContainer from './popover-container.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import { baseTheme } from '../../style/themes';
import Icon from '../icon';
import IconButton from '../icon-button';

const render = (props, renderMethod = mount) => {
  const initialProps = {
    title: 'Popover Container Settings',
    iconType: 'settings',
    renderOpenComponent: ({ tabIndex }) => (
      <button
        tabIndex={ tabIndex }
        type='button'
      >button
      </button>
    ),
    isOpen: true
  };

  return (renderMethod(<PopoverContainer { ...initialProps } { ...props } />));
};

describe('PopoverContainer', () => {
  jest.useFakeTimers();
  let wrapper;

  beforeEach(() => {
    wrapper = render();
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  it('should render correct', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('open button should be focusable if popover-container is closed', () => {
    wrapper = render({ isOpen: false });

    expect(wrapper.find('button').props().tabIndex).toBe(0);
  });

  it('should close the popover container if close Icon clicked', () => {
    const closeFn = jest.fn();

    wrapper = render({ onClose: closeFn });

    act(() => {
      wrapper.find(PopoverContainerCloseIcon).props().onAction();
    });

    expect(closeFn).toHaveBeenCalled();
    jest.clearAllTimers();
  });

  it('support uncontrolled state', () => {
    wrapper = render({
      isOpen: undefined,
      renderOpenComponent: ({ tabIndex, onClick }) => (
        <button
          onClick={ onClick } tabIndex={ tabIndex }
          type='button'
        >button
        </button>
      )
    });

    act(() => {
      wrapper.find('button').props().onClick();
      wrapper.update();
    });

    expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(false);
  });

  it('should set focus to opening component if close button is clicked', () => {
    wrapper = render({
      renderOpenComponent: ({ tabIndex, ref }) => (
        <button
          ref={ ref }
          type='button'
          tabIndex={ tabIndex }
          id='my-button'
        >
          open
        </button>
      )
    });
    act(() => {
      wrapper.find(PopoverContainerCloseIcon).props().onAction();
      wrapper.update();
    });

    expect(wrapper.find('button#my-button')).toBeFocused();
  });

  it('render default component if `renderOpenComponent` is not provided', () => {
    wrapper = render({
      renderOpenComponent: undefined
    });

    expect(wrapper.find(IconButton).exists()).toBe(true);
  });
});

describe('PopoverContainerIcon', () => {
  it('should render correct style', () => {
    const wrapper = mount(
      <PopoverContainerIcon onAction={ () => {} } theme={ baseTheme }>
        <Icon type='settings' />
      </PopoverContainerIcon>
    );

    assertStyleMatch({
      color: baseTheme.popoverContainer.iconColor
    }, wrapper, { modifier: css`${StyledIcon}` });
  });
});

describe('PopoverContainerContentStyle', () => {
  it('should render to the left if position is set to `left`', () => {
    const wrapper = mount(<PopoverContainerContentStyle position='left' />);

    assertStyleMatch({
      right: '0'
    }, wrapper);
  });

  it('should render to the right by default', () => {
    const wrapper = mount(<PopoverContainerContentStyle />);
    assertStyleMatch({
      left: '0'
    }, wrapper);
  });

  it('should render correct style if `shouldCoverButton`', () => {
    const wrapper = mount(<PopoverContainerContentStyle shouldCoverButton />);

    assertStyleMatch({
      top: '0'
    }, wrapper);
  });

  it('should render correct style of animation state', () => {
    const wrapper = mount(<PopoverContainerContentStyle animationState='entered' />);

    assertStyleMatch({
      opacity: '1',
      transform: 'translateY(0)',
      transition: 'all 0.3s cubic-bezier(0.25,0.25,0,1.5)'
    }, wrapper);
  });

  it('should render correct style of animation state', () => {
    const wrapper = mount(<PopoverContainerContentStyle animationState='exiting' />);

    assertStyleMatch({
      opacity: '0',
      transform: 'translateY(-8px)',
      transition: 'all 0.3s cubic-bezier(0.25,0.25,0,1.5)'
    }, wrapper);
  });
});
