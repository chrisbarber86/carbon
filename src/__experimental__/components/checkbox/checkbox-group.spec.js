import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import CheckboxGroup from './checkbox-group.component';
import { Checkbox } from '.';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import HiddenCheckableInputStyle from '../checkable-input/hidden-checkable-input.style';
import StyledCheckableInputSvgWrapper from '../checkable-input/checkable-input-svg-wrapper.style';
import baseTheme from '../../../style/themes/base';
import Icon from '../../../components/icon';
import Label from '../label';

const checkboxValues = ['required', 'optional'];
const groupName = 'my-checkbox-group';

function render(props, childProps, renderer = mount) {
  const children = checkboxValues.map(value => (
    <Checkbox
      id={ `cId-${value}` }
      key={ `cKey-${value}` }
      name={ `check-${value}` }
      onChange={ jest.fn() }
      value={ value }
      { ...childProps }
    />
  ));

  return renderer(
    <CheckboxGroup
      name='group-radio-buttons'
      groupName={ groupName }
      label='Test CheckboxGroup Label'
      { ...props }
    >
      {children}
    </CheckboxGroup>
  );
}

describe('CheckboxGroup', () => {
  it('renders as expected', () => {
    expect(render({}, {}, TestRenderer.create)).toMatchSnapshot();
  });

  describe('group label', () => {
    it('should have the correct text', () => {
      const labelText = 'My Label';
      const wrapper = render({ label: labelText });
      const label = wrapper.find(Label).first();

      expect(label.text()).toEqual(labelText);
    });
  });

  describe('group icon messsage', () => {
    it('should have the correct text', () => {
      const wrapper = render();
      const text = 'Choose an option';

      wrapper.setProps({
        labelHelp: text
      });

      const icon = wrapper.find(Icon);

      expect(icon.prop('tooltipMessage')).toEqual(text);
    });
  });

  describe('onChange', () => {
    it('should be called', () => {
      const fakeFunction = jest.fn();
      const wrapper = render({}, {
        onChange: fakeFunction
      });
      const checkbox = wrapper.find(Checkbox).first();

      checkbox.prop('onChange')();

      expect(fakeFunction).toBeCalledTimes(1);
    });
  });

  describe('styles', () => {
    describe('checkbox group', () => {
      const validationTypes = {
        error: { color: baseTheme.colors.error },
        warning: { color: baseTheme.colors.warning },
        info: { color: baseTheme.colors.info }
      };
      const validationTypesArr = Object.keys(validationTypes);

      describe.each(validationTypesArr)('group[%s]', (type) => {
        const wrapper = render({});

        beforeEach(() => {
          const props = {
            error: false,
            warning: false,
            info: false
          };
          props[type] = true;

          wrapper.setProps(props);
        });

        it('has correct color', () => {
          assertStyleMatch({
            borderColor: `${validationTypes[type].color}`
          }, wrapper, { modifier: `${HiddenCheckableInputStyle} + ${StyledCheckableInputSvgWrapper} svg` });
        });
      });

      describe('pass validation props', () => {
        const wrapper = render({}, { checked: true });

        it('checked === false', () => {
          wrapper.setProps({
            error: true
          });

          const checkboxWrapper = wrapper.find(Checkbox).first();

          expect(checkboxWrapper.prop('checked')).toBe(true);
          expect(checkboxWrapper.prop('error')).toBeUndefined();
        });
      });
    });
  });
});
