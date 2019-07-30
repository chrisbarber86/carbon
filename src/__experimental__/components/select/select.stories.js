import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Store, State } from '@sambego/storybook-state';
import { Select, Option } from '.';
import infoValidations from './documentation';
import OptionsHelper from '../../../utils/helpers/options-helper';

const singleSelectStore = new Store({
  value: undefined
});

const multiSelectStore = new Store({
  value: []
});

const commonKnobs = (store) => {
  const filterable = boolean('filterable', Select.defaultProps.filterable);
  const typeAhead = filterable && boolean('typeAhead', Select.defaultProps.typeAhead);
  const label = text('label', '');

  const knobs = {
    disabled: boolean('disabled', false),
    onChange: (ev) => {
      store.set({ value: ev.target.value });
      action('change')(ev);
    },
    placeholder: text('placeholder', ''),
    readOnly: boolean('readOnly', false),
    size: select('size', OptionsHelper.sizesRestricted, OptionsHelper.sizesRestricted[1]),
    filterable,
    typeAhead,
    label
  };

  if (label.length) {
    knobs.labelAlign = select('labelAlign', OptionsHelper.alignBinary, OptionsHelper.alignBinary[0]);
    knobs.labelInline = boolean('labelInline', false);
  }

  return knobs;
};

const selectOptionsLabels = [
  'Amber', 'Black', 'Blue', 'Brown', 'Green', 'Orange', 'Pink', 'Purple', 'Red', 'White', 'Yellow'
];

const selectOptions = selectOptionsLabels.map((label, index) => (
  <Option
    key={ label }
    text={ label }
    value={ String(index + 1) }
  />
));

function validator(value, errorValue, errorMessage) {
  return new Promise((resolve, reject) => {
    if (value === errorValue) {
      reject(new Error(errorMessage));
    } else {
      resolve();
    }
  });
}

const selectValidation = value => validator(value, '2', '"Black" cannot be selected!');
const selectWarning = value => validator(value, '3', 'Selecting "Blue" is not recommended');
const selectInfo = value => validator(value, '4', 'You have selected "Brown"');

storiesOf('Experimental/Select', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    },
    knobs: { escapeHTML: false }
  })
  .add('default', () => {
    return (
      <State store={ singleSelectStore }>
        <Select ariaLabel='singleSelect' { ...commonKnobs(singleSelectStore) }>
          { selectOptions }
        </Select>
      </State>
    );
  })

  .add('multiple', () => {
    return (
      <State store={ multiSelectStore }>
        <Select ariaLabel='multiSelect' { ...commonKnobs(multiSelectStore) }>
          { selectOptions }
        </Select>
      </State>
    );
  })

  .add('validations', () => {
    return (
      <State store={ singleSelectStore }>
        <Select
          ariaLabel='singleSelect'
          { ...commonKnobs(singleSelectStore) }
          validations={ [selectValidation] }
          warnings={ [selectWarning] }
          info={ [selectInfo] }
        >
          { selectOptions }
        </Select>
      </State>
    );
  }, {
    info: {
      text: infoValidations,
      source: false,
      propTablesExclude: [Select, Option]
    }
  });
