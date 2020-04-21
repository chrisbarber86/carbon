import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { notes, info } from './documentation';
import { dlsThemeSelector, classicThemeSelector } from '../../../../.storybook/theme-selectors';
import DateRange from './date-range.component';

import getDocGenInfo from '../../../utils/helpers/docgen-info';

DateRange.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /date-range\.component(?!spec)/
);

const store = new Store({
  value: ['2016-10-01', '2016-10-30']
});
const handleChange = (evt) => {
  const newValue = [evt.target.value[0].rawValue, evt.target.value[1].rawValue];
  store.set({ value: newValue });
  action('changed')(evt.target.value);
};

function makeStory(name, themeSelector) {
  const component = () => {
    const startLabel = text('startLabel', '');
    const endLabel = text('endLabel', '');
    const labelsInline = (startLabel || endLabel) ? boolean('labelsInline', false) : undefined;

    return (
      <State store={ store }>
        <DateRange
          onChange={ handleChange }
          endLabel={ endLabel }
          value={ store.get('value') }
          startLabel={ startLabel }
          labelsInline={ labelsInline }
          onBlur={ ev => action('blur')(ev) }
        />
      </State>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    info: {
      text: info,
      propTablesExclude: [State]
    }
  };

  return [name, component, metadata];
}

function makeValidationStory(name, themeSelector) {
  const component = () => {
    const startLabel = text('startLabel', '');
    const endLabel = text('endLabel', '');
    const labelsInline = (startLabel || endLabel) ? boolean('labelsInline', false) : undefined;

    return (
      <>
        <h4>Validation as string</h4>
        {[{ error: 'Error' }, { warning: 'Warning' }, { info: 'Info' }].map(validation => (
          <State store={ store }>
            <DateRange
              onChange={ handleChange }
              endLabel={ endLabel }
              value={ store.get('value') }
              startLabel={ startLabel }
              labelsInline={ labelsInline }
              onBlur={ ev => action('blur')(ev) }
              { ...validation }
            />
          </State>
        ))}
        <h4>Validation as boolean</h4>
        {[{ error: true }, { warning: true }, { info: true }].map(validation => (
          <State store={ store }>
            <DateRange
              onChange={ handleChange }
              endLabel={ endLabel }
              value={ store.get('value') }
              startLabel={ startLabel }
              labelsInline={ labelsInline }
              onBlur={ ev => action('blur')(ev) }
              { ...validation }
            />
          </State>
        ))}
      </>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    info: {
      text: info,
      propTablesExclude: [State]
    }
  };

  return [name, component, metadata];
}

storiesOf('Experimental/Date Range', module)
  .add(...makeStory('default', dlsThemeSelector))
  .add(...makeValidationStory('validations', dlsThemeSelector))
  .add(...makeStory('classic', classicThemeSelector));
