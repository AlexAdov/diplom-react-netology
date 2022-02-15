import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchField, startSearch } from '../actions/actionCreators';

export function Search() {
  const { search } = useSelector((state) => state.Search);
  const dispatch = useDispatch();

  const onChange = (event) => {
    dispatch(changeSearchField(event.target.value));
  };
  const onSearch = (event) => {
    event.preventDefault();
    dispatch(startSearch(search));
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={(event) => onSearch(event)}>
      <input
        className="form-control"
        onChange={onChange}
        placeholder="Поиск"
        value={search}
      />
    </form>
  );
}
