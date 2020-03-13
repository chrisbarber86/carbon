import React, { useState, useRef } from 'react';
import { select, text, boolean } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper/options-helper';
import PopoverContainer from './popover-container.component';
import Button from '../button';
import IconButton from '../icon-button';
import Icon from '../icon';
import Pill from '../pill';
import { DraggableContainer, DraggableItem } from '../draggable';
import { Checkbox } from '../../__experimental__/components/checkbox';
import Link from '../link';
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

export const Basic = () => {
  const title = text('title', 'Popover Title');
  const position = select('position', [...OptionsHelper.alignBinary], 'right');
  const shouldCoverButton = boolean('shouldcoverButton', true);

  return (
    <div style={ storyStyle(undefined, position) }>
      <PopoverContainer
        position={ position }
        title={ title }
        shouldCoverButton={ shouldCoverButton }
      />
    </div>
  );
};

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

  const [isOpen, setOpen] = useState(false);
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

  const handleClick = () => {
    setOpen(!isOpen);
  };

  const handleBadgeClose = () => {
    clearAllOptions();
    clearFilters();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const applyFilters = () => {
    updateFilters();
    handleClose();
  };

  const renderCheckboxes = () => {
    const checkboxStyle = {
      marginBottom: '10px'
    };

    return options.map((option, index) => {
      return (
        <Checkbox
          onChange={ updateCheckValue }
          style={ checkboxStyle }
          label={ option.value }
          name={ option.value }
          value={ option.value }
          checked={ option.checked }
          key={ index }
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
        isOpen={ isOpen }
        renderOpenComponent={ ({ dataElement }) => (
          <Badge counter={ filters.length } onClick={ handleBadgeClose }>
            <Button
              data-element={ dataElement }
              style={ { marginRight: 0 } }
              buttonType={ isOpen ? 'primary' : 'darkBackground' }
              iconPosition='after'
              iconType={ !isOpen ? 'filter_new' : 'close' }
              onClick={ handleClick }
              size='small'
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

export const ControlledPopoverContainer = () => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={ storyStyle('100px') }>
      <PopoverContainer
        title='How to make popover-container controlled'
        isOpen={ isOpen }
        renderOpenComponent={ () => (
          <Button onClick={ handleOpen }>Open</Button>
        ) }
        renderCloseComponent={ () => (
          <Button onClick={ handleClose }>Close</Button>
        ) }
      />
    </div>
  );
};

export const RenderProps = () => {
  return (
    <div style={ storyStyle('120px') }>
      <PopoverContainer
        title='How to use render props'
        renderOpenComponent={ ({ onClick }) => (
          <Button
            type='button'
            onClick={ onClick }
          >
            Open here
          </Button>
        ) }
        renderCloseComponent={ ({ onClick }) => (
          <Button
            type='button'
            onClick={ onClick }
          >
            Close
          </Button>
        ) }
      />
    </div>
  );
};

export const WithComplexContent = () => {
  const [isOpen, setOpen] = useState(false);
  const iconRef = useRef();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    iconRef.current.focus();
  };

  return (
    <div style={ storyStyle('330px') }>
      <PopoverContainer
        title='Popover Container Title'
        isOpen={ isOpen }
        onClose={ handleClose }
        shouldcoverButton
        renderOpenComponent={ () => (
          <IconButton
            ref={ iconRef }
            data-element='popover-container-icon'
            onAction={ handleClick }
          >
            <Icon type='settings' />
          </IconButton>
        ) }
      >
        <Link>This is example link text</Link>
        <div style={ { padding: '25px 0 15px 0' } }>
          <Button>
            Small
          </Button>
          <Button>
            Compact
          </Button>
        </div>
        <DraggableContainer>
          <DraggableItem key='1' id={ 1 }>
            <Checkbox name='one' label='Draggable Label One' />
          </DraggableItem>
          <DraggableItem key='2' id={ 2 }>
            <Checkbox name='two' label='Draggable Label Two' />
          </DraggableItem>
          <DraggableItem key='3' id={ 3 }>
            <Checkbox name='three' label='Draggable Label Three' />
          </DraggableItem>
          <DraggableItem key='4' id={ 4 }>
            <Checkbox name='four' label='Draggable Label Four' />
          </DraggableItem>
        </DraggableContainer>
      </PopoverContainer>
    </div>
  );
};
