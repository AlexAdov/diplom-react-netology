import React from 'react';
import { PropTypes } from 'prop-types';

export function Categories(props) {
  const {
    handleSelect,
    categories,
    selected
  } = props;
  const onSelect = (event, id) => {
    event.preventDefault();
    handleSelect(id);
  };

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <a
          onClick={(event) => onSelect(event, 0)}
          className={(selected === 0) ? 'nav-link active' : 'nav-link'}
          href="#"
        >
          Все
        </a>
      </li>
      {categories.map((o) => <li key={o.id} className="nav-item">
        <a
          onClick={(event) => onSelect(event, o.id)}
          className={(selected === o.id) ? 'nav-link active' : 'nav-link'}
          href="#"
        >
          {o.title}
        </a>
      </li>)}
    </ul>
  );
}

Categories.propTypes = {
  handleSelect: PropTypes.func,
  categories: PropTypes.array,
  selected: PropTypes.number
};
