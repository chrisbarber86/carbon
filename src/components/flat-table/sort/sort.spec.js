import React from 'react';
import { mount } from 'enzyme';
import Sort from './sort.component';
import Icon from '../../icon';

describe('FlatTableSortHeader', () => {
  let wrapper, onClickFn, onKeyDownFn;

  const ENTER_KEY = { keyCode: 13, which: 13 };
  const SPACE_KEY = { keyCode: 32, which: 32 };
  const RANDOM_KEY = { keyCode: 82, which: 82 };

  beforeEach(() => {
    onClickFn = jest.fn();
    onKeyDownFn = jest.fn();
    wrapper = renderSort({ onClick: onClickFn, onKeyDown: onKeyDownFn });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should not render Icon if sortType does not exist', () => {
    wrapper = renderSort();

    expect(wrapper.find(Icon).exists()).toBe(false);
  });

  it('should render Icon `sort_up` sortType="asc"', () => {
    wrapper = renderSort({ sortType: 'asc' });

    expect(wrapper.find(Icon).props().type).toBe('sort_up');
  });

  it('should render Icon `sort_down` sortType="desc"', () => {
    wrapper = renderSort({ sortType: 'desc' });

    expect(wrapper.find(Icon).props().type).toBe('sort_down');
  });

  it('should run callback if clicked', () => {
    wrapper.props().onClick();

    expect(onClickFn).toHaveBeenCalled();
  });

  it('shouold fired callback if enter key is pressed', () => {
    wrapper.simulate('keyDown', ENTER_KEY);

    expect(onClickFn).toHaveBeenCalled();
  });

  it('should fired callback if space key is pressed', () => {
    wrapper.simulate('keyDown', SPACE_KEY);

    expect(onClickFn).toHaveBeenCalled();
  });

  it('should not fired callback if either enter key or space key is pressed', () => {
    wrapper.simulate('keyDown', RANDOM_KEY);

    expect(onKeyDownFn).not.toHaveBeenCalled();
  });
});

function renderSort(props, renderer = mount) {
  return renderer(<Sort { ...props }>Name</Sort>);
}
