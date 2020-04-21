/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';
import { css } from 'styled-components';
import { act } from 'react-dom/test-utils';
import {
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerIcon,
  PopoverContainerOpenIcon
} from './popover-container.style';
import StyledIcon from '../icon/icon.style';
import PopoverContainer from './popover-container.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import { baseTheme } from '../../style/themes';
import Icon from '../icon';

const render = (props, renderMethod = mount) => {
  return (renderMethod(<PopoverContainer title='PopoverContainerSettings' { ...props } />));
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

  it('should let opening button to be focusable if popover is closed', () => {
    wrapper = render({ open: false });

    expect(wrapper.find('button').props().tabIndex).toBe(0);
  });

  describe('if is controlled', () => {
    describe('and is opened', () => {
      describe('and `onClose` prop do not exists', () => {
        it('should not fire `onClose` callback if open button is clicked', () => {
          wrapper = render({
            open: true
          });

          wrapper.find(PopoverContainerOpenIcon).props().onAction();
          expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(true);
        });
      });

      describe('and `onClose` prop is provided', () => {
        it('should fire `onClose` callback if open button is clicked', () => {
          const onCloseFn = jest.fn();
          wrapper = render({
            open: true,
            onClose: onCloseFn
          });

          wrapper.find(PopoverContainerOpenIcon).props().onAction();
          expect(onCloseFn).toHaveBeenCalled();
        });

        it('should fire `onClose` callback if close button is clicked', () => {
          const onCloseFn = jest.fn();
          wrapper = render({
            open: true,
            onClose: onCloseFn
          });

          wrapper.find(PopoverContainerCloseIcon).props().onAction();
          expect(onCloseFn).toHaveBeenCalled();
        });
      });
    });

    describe('and is closed', () => {
      describe('and `onOpen` prop is provided', () => {
        it('should fire `onOpen` callback if open button is clicked', () => {
          const onOpenFn = jest.fn();
          wrapper = render({
            open: false,
            onOpen: onOpenFn
          });

          wrapper.find(PopoverContainerOpenIcon).props().onAction();
          expect(onOpenFn).toHaveBeenCalled();
        });
      });

      describe('and `onOpen` prop is not provided', () => {
        it('should not fire `onOpen` callback if open button is clicked', () => {
          wrapper = render({
            open: false
          });

          wrapper.find(PopoverContainerOpenIcon).props().onAction();
          expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(false);
        });
      });
    });
  });

  describe('if is not controlled', () => {
    it('should render default open button', () => {
      wrapper = render();

      expect(wrapper.find(PopoverContainerOpenIcon).exists()).toBe(true);
    });

    it('should render default close button', () => {
      wrapper = render();

      act(() => {
        wrapper.find(PopoverContainerOpenIcon).props().onAction();
      });

      wrapper.update();
      expect(wrapper.find(PopoverContainerCloseIcon).exists()).toBe(true);
    });

    it('should open popover if open button is clicked', () => {
      wrapper = render();

      act(() => {
        wrapper.find(PopoverContainerOpenIcon).props().onAction();
      });

      wrapper.update();
      expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(true);
    });

    describe('and custom component is provided as opening button', () => {
      it('should render correct props', () => {
        wrapper = render({
          title: 'render props',
          renderOpenComponent: ({
            tabIndex, dataElement, ariaLabel
          }) => (
            <button
              type='button'
              tabIndex={ tabIndex }
              data-element={ dataElement }
              aria-label={ ariaLabel }
            />
          )
        });

        expect(wrapper.find('button').props().tabIndex).toBe(0);
        expect(wrapper.find('button').prop('data-element')).toBe('popover-container-open-component');
        expect(wrapper.find('button').prop('aria-label')).toBe('render props');
      });
    });

    describe('and custom component is provided as closing button', () => {
      it('should render correct props', () => {
        wrapper = render({
          open: true,
          renderCloseComponent: ({
            tabIndex, dataElement, ariaLabel
          }) => (
            <button
              type='button'
              id='closeButton'
              tabIndex={ tabIndex }
              data-element={ dataElement }
              aria-label={ ariaLabel }
            />
          )
        });

        expect(wrapper.find('#closeButton').props().tabIndex).toBe(0);
        expect(wrapper.find('#closeButton').prop('data-element')).toBe('popover-container-close-component');
        expect(wrapper.find('#closeButton').prop('aria-label')).toBe('close');
      });
    });
  });

  describe('if close button is clicked ', () => {
    describe('and `ref` of opening button exists', () => {
      it('should set focus to the opening button', () => {
        wrapper = render();

        act(() => {
          wrapper.find(PopoverContainerOpenIcon).props().onAction();
        });

        wrapper.update();

        act(() => {
          wrapper.find(PopoverContainerCloseIcon).props().onAction();
        });

        wrapper.update();

        expect(wrapper.find(PopoverContainerOpenIcon)).toBeFocused();
      });
    });

    describe('and `ref` of opening button does not exist', () => {
      it('should not set focus to the opening button', () => {
        wrapper = render({
          renderOpenComponent: ({ onClick }) => (
            <button
              type='button'
              id='openButton'
              onClick={ onClick }
            >open
            </button>
          )
        });

        act(() => {
          wrapper.find('#openButton').props().onClick();
        });

        wrapper.update();

        act(() => {
          wrapper.find(PopoverContainerCloseIcon).props().onAction();
        });

        wrapper.update();

        expect(wrapper.find('#openButton')).not.toBeFocused();
      });
    });
  });
});

describe('PopoverContainerIcon', () => {
  it('should render correct style', () => {
    const wrapper = mount(
      <PopoverContainerIcon onAction={ () => { } } theme={ baseTheme }>
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

  it('should render correct style if `shouldCoverButton` prop is provided', () => {
    const wrapper = mount(<PopoverContainerContentStyle shouldCoverButton />);

    assertStyleMatch({
      top: '0'
    }, wrapper);
  });

  describe('should render correct style of animation', () => {
    it('if the animation has state `entered`', () => {
      const wrapper = mount(<PopoverContainerContentStyle animationState='entered' />);

      assertStyleMatch({
        opacity: '1',
        transform: 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.25,0.25,0,1.5)'
      }, wrapper);
    });

    it('if the animation has state `exiting`', () => {
      const wrapper = mount(<PopoverContainerContentStyle animationState='exiting' />);

      assertStyleMatch({
        opacity: '0',
        transform: 'translateY(-8px)',
        transition: 'all 0.3s cubic-bezier(0.25,0.25,0,1.5)'
      }, wrapper);
    });
  });
});
