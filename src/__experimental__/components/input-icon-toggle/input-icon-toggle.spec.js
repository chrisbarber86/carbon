import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import Icon from 'components/icon';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import ValidationIcon from '../../../components/validations/validation-icon.component';
import InputIconToggleStyle from './input-icon-toggle.style';
import BaseTheme from '../../../style/themes/base';
import InputIconToggle from './input-icon-toggle.component';
import StyledIcon from '../../../components/icon/icon.style';


describe('InputIconToggle', () => {
  describe('when initiated with the disabled prop set to true', () => {
    it('does not render anything', () => {
      expect(render({ disabled: true }).isEmptyRender()).toBeTruthy();
    });
  });

  describe('when initiated with the readOnly prop set to true', () => {
    it('does not render anything', () => {
      expect(render({ readOnly: true }).isEmptyRender()).toBeTruthy();
    });
  });

  describe('when initiated without children', () => {
    it('renders an Icon component with an icon type that was specified in the props', () => {
      expect(render({ inputIcon: 'settings' }).contains(<Icon type='settings' />)).toBeTruthy();
    });
  });

  describe('when initiated with children', () => {
    it('renders as expected', () => {
      expect(render({ children: 'mock content' }, TestRenderer.create)).toMatchSnapshot();
    });
  });

  describe.each(['error', 'warning', 'info'])('when %s validation prop is string', (validationProp) => {
    it('renders a validation icon', () => {
      const wrapper = render({ [validationProp]: 'Message' });
      const validationIcon = wrapper.find(ValidationIcon);
      expect(validationIcon.exists()).toBe(true);
    });
  });

  describe.each(['error', 'warning', 'info'])('when %s validation prop is true', (validationProp) => {
    it('renders colored input icon when it is provided', () => {
      const wrapper = render({ inputIcon: 'dropdown', [validationProp]: true }, mount);
      const iconStyle = wrapper.find(InputIconToggleStyle);

      assertStyleMatch({
        color: BaseTheme.colors[validationProp]
      }, iconStyle, { modifier: `${StyledIcon}:before` });
    });
  });

  describe('sizes', () => {
    [['small', '32px'], ['medium', '40px'], ['large', '48px']].forEach((size) => {
      it(`updates the width for ${size[0]}`, () => {
        assertStyleMatch({
          width: size[1]
        }, render({ size: size[0] }, TestRenderer.create).toJSON());
      });
    });
  });
});

function render(props, renderer = shallow) {
  const defaultProps = { inputIcon: 'settings' };

  return renderer(
    <InputIconToggle { ...defaultProps } { ...props } />
  );
}
