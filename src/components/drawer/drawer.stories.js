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
    <Drawer
      expandedWidth={ text('expandedWidth', '40%') }
      animationSpeed={ text('animationSpeed', '0.5s') }
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
  );
};

export const Controlled = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const onChangeHandler = useCallback(() => {
    setIsExpanded(!isExpanded);
    action('expansionToggled');
  }, [isExpanded]);

  return (
    <Drawer
      expandedWidth={ text('expandedWidth', '40%') }
      animationSpeed={ text('animationSpeed', '0.5s') }
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
  );
};
