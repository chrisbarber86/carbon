import React, { useState, useCallback } from 'react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { dlsThemeSelector } from '../../../.storybook/theme-selectors';
import Drawer from '.';

export default {
  title: 'Test/Drawer',
  component: Drawer,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true
    },
    knobs: { escapeHTML: false }
  }
};

export const basic = () => {
  return (
    <div style={ { height: '200px' } }>
      <Drawer
        expandedWidth={ text('expandedWidth', '40%') }
        animationDuration={ text('animationDuration', '0.5s') }
        onChange={ action('expansionToggled') }
        sidebar={ (
          <ul>
            <li>link a</li>
            <li>link b</li>
            <li>link c</li>
          </ul>
        ) }
      >
        content body content body content body content body content body content body content body
      </Drawer>
    </div>
  );
};

export const Controlled = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const onChangeHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
    action('expansionToggled');
  }, [isExpanded]);

  return (
    <div>
      <p>
        Note: if you experience glitchy animation on `Drawer` component,
        pelase open canvas in new window (2nd icon in top right corner)
      </p>
      <div style={ { height: '200px' } }>
        <Drawer
          expandedWidth={ text('expandedWidth', '40%') }
          animationDuration={ text('animationDuration', '0.5s') }
          expanded={ isExpanded }
          onChange={ onChangeHandler }
          sidebar={ (
            <ul>
              <li>link a</li>
              <li>link b</li>
              <li>link c</li>
            </ul>
          ) }
        >
          content body content body content body content body content body content body content body
        </Drawer>
      </div>
    </div>
  );
};
