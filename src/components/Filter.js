import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../redux/filterSlice';

const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      <p>Find contacts by name</p>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default Filter;
