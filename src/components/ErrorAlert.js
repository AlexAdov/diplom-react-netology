import React from 'react';
import { PropTypes } from 'prop-types';

export function ErrorAlert(props) {
  const { onRetry } = props;
  return (
    <div className="alert alert-danger">
      <p>Произошла ошибка!</p>
      <button className="btn btn-outline-primary" onClick={onRetry}>
        Попробовать снова
      </button>
    </div>
  );
}

ErrorAlert.propTypes = {
  onRetry: PropTypes.func
};
