import React, { useState } from 'react';
import {
  array,
  withKnobs,
  text
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import NumeralDate from '.';

export default {
  title: 'Test/Numeral Date',
  component: NumeralDate,
  decorators: [withKnobs],
  parameters: {
    info: {
      disable: true
    },
    knobs: { escapeHTML: false }
  }
};

export const Basic = () => {
  const [dateValue, setDateValue] = useState({});
  const dateFormat = array('dateFormat', NumeralDate.defaultProps.dateFormat);

  const handleChange = (ev, itemId) => {
    setDateValue({ ...dateValue, [itemId]: ev.target.value });
    action('change')(ev);
  };

  const handleBlur = (ev) => {
    action('blur')(ev);
  };

  return (
    <NumeralDate
      onChange={ handleChange }
      label='Numeral date'
      onBlur={ handleBlur }
      dateFormat={ dateFormat }
      value={ dateValue }
      name='numeralDate_name'
      id='numeralDate_id'
    />
  );
};

export const Validations = () => {
  const [dateValue, setDateValue] = useState({});
  const dateFormat = array('dateFormat', NumeralDate.defaultProps.dateFormat);

  const handleChange = (ev, itemId) => {
    setDateValue({ ...dateValue, [itemId]: ev.target.value });
    action('change')(ev);
  };

  const handleBlur = (ev) => {
    action('blur')(ev);
  };

  return (
    <>
      <h4>Validations as string</h4>
      {[{ error: 'Error' }, { warning: 'Warning' }, { info: 'Info' }].map(validation => (
        <NumeralDate
          onChange={ handleChange }
          label='Numeral date'
          warning={ text('warning') }
          { ...validation }
          onBlur={ handleBlur }
          dateFormat={ dateFormat }
          value={ dateValue }
          name='numeralDate_name'
          id='numeralDate_id'
        />
      ))}

      <h4>Validations as boolean</h4>
      {[{ error: true }, { warning: true }, { info: true }].map(validation => (
        <NumeralDate
          onChange={ handleChange }
          label='Numeral date'
          warning={ text('warning') }
          { ...validation }
          onBlur={ handleBlur }
          dateFormat={ dateFormat }
          value={ dateValue }
          name='numeralDate_name'
          id='numeralDate_id'
        />
      ))}

    </>
  );
};
