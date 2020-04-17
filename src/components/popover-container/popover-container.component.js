import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import {
  PopoverContainerWrapperStyle,
  PopoverContainerHeaderStyle,
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon,
  PopoverContainerTitle,
  PopoverContainerOpenIcon
} from './popover-container.style';
import Icon from '../icon';
import createGuid from '../../utils/helpers/guid';

const PopoverContainer = ({
  children,
  title,
  position,
  isOpen,
  onClose,
  renderOpenComponent,
  renderCloseComponent,
  shouldCoverButton,
  ariaDescribedBy
}) => {
  const [open, setOpen] = useState(false);

  const closeButtonRef = useRef();
  const openButtonRef = useRef();
  const guid = useRef(createGuid());
  const popoverContainerId = `PopoverContainer_${guid.current}`;

  useEffect(() => {
    if ((open || isOpen) && closeButtonRef.current) closeButtonRef.current.focus();
  }, [isOpen, open]);

  const handleOpenButtonClick = () => {
    setOpen(!open);
  };

  const renderOpenComponentProps = {
    tabIndex: (open || isOpen) ? -1 : 0,
    isOpen: open || isOpen,
    dataElement: 'popover-container-open-component',
    onClick: handleOpenButtonClick,
    ref: openButtonRef,
    ariaLabel: title
  };

  const handleCloseButtonClick = () => {
    if (onClose) onClose();
    setOpen(false);
    if ((open || isOpen) && openButtonRef.current) openButtonRef.current.focus();
  };

  const renderCloseComponentProps = {
    dataElement: 'popover-container-close-icon',
    tabIndex: '0',
    onClick: handleCloseButtonClick,
    ref: closeButtonRef,
    ariaLabel: 'close'
  };

  return (
    <PopoverContainerWrapperStyle
      data-component='popover-container'
      aria-labelledby={ popoverContainerId }
    >
      {renderOpenComponent(renderOpenComponentProps)}
      <Transition
        in={ isOpen || open }
        timeout={ { exit: 300 } }
        appear
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <PopoverContainerContentStyle
            data-element='popover-container-content'
            role='dialog'
            animationState={ state }
            position={ position }
            shouldCoverButton={ shouldCoverButton }
            aria-labelledby={ popoverContainerId }
            aria-describedby={ ariaDescribedBy }
          >
            <PopoverContainerHeaderStyle>
              <PopoverContainerTitle
                id={ popoverContainerId }
                data-element='popover-container-title'
              >
                {title}
              </PopoverContainerTitle>
              {renderCloseComponent(renderCloseComponentProps)}
            </PopoverContainerHeaderStyle>
            {children}
          </PopoverContainerContentStyle>
        )}
      </Transition>
    </PopoverContainerWrapperStyle>
  );
};

PopoverContainer.propTypes = {
  /** A function that will render the open component
   *
   * `({dataElement, tabIndex, onClick, ref, ariaLabel, isOpen}) => ()`
   *
  */
  renderOpenComponent: PropTypes.func,
  /** A function that will render the close component
   *
   * `({dataElement, tabIndex, onClick, ref, ariaLabel, isOpen}) => ()`
   *
  */
  renderCloseComponent: PropTypes.func,
  /** if `true` the popover-container is open */
  isOpen: PropTypes.bool,
  /** Sets the popover-container dialog header name */
  title: PropTypes.string,
  /** if `true` the popover-container will cover open button */
  shouldCoverButton: PropTypes.bool,
  /** Callback fires when close icon clicked */
  onClose: PropTypes.func,
  /** Sets rendering position of the popover-container */
  position: PropTypes.oneOf(['left', 'right']),
  /** The content of the popover-container */
  children: PropTypes.node,
  /** The id of the element that describes the dialog. */
  ariaDescribedBy: PropTypes.string
};

PopoverContainer.defaultProps = {
  position: 'right',
  shouldCoverButton: false,
  renderOpenComponent: ({
    // eslint-disable-next-line react/prop-types
    tabIndex, onClick, dataElement, ref, ariaLabel
  }) => (
    <PopoverContainerOpenIcon
      tabIndex={ tabIndex }
      onAction={ onClick }
      data-element={ dataElement }
      ref={ ref }
      aria-label={ ariaLabel }
      aria-haspopup
    >
      <Icon
        data-element='popover-container-open-component'
        type='settings'
      />
    </PopoverContainerOpenIcon>
  ),
  renderCloseComponent: ({
    // eslint-disable-next-line react/prop-types
    dataElement, tabIndex, onClick, ref, ariaLabel
  }) => (
    <PopoverContainerCloseIcon
      data-element={ dataElement }
      type='close'
      tabIndex={ tabIndex }
      onAction={ onClick }
      ref={ ref }
      aria-label={ ariaLabel }
    >
      <Icon type='close' />
    </PopoverContainerCloseIcon>
  )
};

export default PopoverContainer;
