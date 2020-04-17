import React, { useState } from 'react';
import PopoverContainer from './popover-container.component';
import Button from '../button';
import Pill from '../pill';
import { Checkbox } from '../../__experimental__/components/checkbox';
import Badge from '../badge';

export default {
  component: PopoverContainer,
  title: 'Test/Popover Container',
  parameters: {
    info: { disable: true },
    knobs: { escapeHTML: false }
  }
};

const storyStyle = (height = '80px', position = 'right') => ({
  minHeight: height,
  marginLeft: position === 'left' ? '400px' : null
});

export const Filter = () => {
  const initValues = [
    {
      value: 'Option 1',
      checked: false
    },
    {
      value: 'Option 2',
      checked: false
    },
    {
      value: 'Option 3',
      checked: false
    }
  ];

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(initValues);
  const [filters, setFilters] = useState([]);

  const clearAllOptions = () => {
    const temps = options;

    for (let i = 0; i < temps.length; i++) {
      temps[i].checked = false;
    }

    setOptions([...temps]);
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const updateCheckValue = (e) => {
    const temps = options;
    const findCorrectIndex = temps.findIndex(item => item.value === e.target.value);

    if (findCorrectIndex !== -1) {
      temps[findCorrectIndex].checked = !temps[findCorrectIndex].checked;

      setOptions([...temps]);
    }
  };

  const updateFilters = () => setFilters(options.filter(filter => filter.checked === true));


  const handleBadgeClose = () => {
    clearAllOptions();
    clearFilters();
  };

  const applyFilters = () => {
    updateFilters();
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const renderCheckboxes = () => {
    const checkboxStyle = {
      marginBottom: '10px'
    };

    return options.map((option) => {
      return (
        <Checkbox
          onChange={ updateCheckValue }
          style={ checkboxStyle }
          label={ option.value }
          name={ option.value }
          value={ option.value }
          checked={ option.checked }
          key={ option.value }
        />
      );
    });
  };

  const renderPills = () => {
    const pillStyle = {
      margin: '0 8px'
    };

    return filters.map((filter, index) => {
      return filter.checked ? <Pill key={ index } style={ pillStyle }>{filter.value}</Pill> : null;
    });
  };

  return (
    <div style={ storyStyle('250px') }>
      <PopoverContainer
        title='How to create Filter component'
        open={ open }
        onOpen={ onOpen }
        onClose={ onClose }
        renderOpenComponent={ ({ isOpen, ...rest }) => (
          <Badge counter={ filters.length } onClick={ handleBadgeClose }>
            <Button
              style={ { marginRight: 0 } }
              buttonType={ isOpen ? 'primary' : 'darkBackground' }
              iconPosition='after'
              iconType={ !isOpen ? 'filter_new' : 'close' }
              size='small'
              { ...rest }
            >
              Filter
            </Button>
          </Badge>
        ) }
        renderCloseComponent={ () => {} }
      >
        {renderCheckboxes()}
        <Button onClick={ applyFilters } style={ { margin: '20px 0' } }>Apply</Button>
      </PopoverContainer>
      {renderPills()}
    </div>
  );
};
