import classNames from 'classnames';
import React, { memo } from 'react';
import nav from './style.module.scss';
import { Filter } from '../../types';

type ComponentProps = {
  onReverseClick: () => void;
  onFilterChange: (newFilter: Filter) => void;
  filter: Filter;
  isReversed: boolean;
};

const Nav = memo(
  ({ onReverseClick, onFilterChange, filter, isReversed }: ComponentProps) => (
    <div className={nav.element}>
      <div className={nav.container}>
        <button
        type='button'
          className={classNames(nav.button, {
            [nav.selected]: filter === 'all',
          })}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button
        type='button'
          className={classNames(nav.button, {
            [nav.selected]: filter === 'active',
          })}
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>
        <button
        type='button'
          className={classNames(nav.button, {
            [nav.selected]: filter === 'done',
          })}
          onClick={() => onFilterChange('done')}
        >
          Done
        </button>
      </div>
      <button
        type='button'
        className={classNames(nav.button, nav.reverse, {
          [nav.selected]: isReversed,
        })}
        onClick={onReverseClick}
      />
    </div>
  )
);

export default Nav;
