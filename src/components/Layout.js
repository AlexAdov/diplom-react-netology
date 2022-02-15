import React from 'react';
import { PropTypes } from 'prop-types';
import { Banner } from './Banner';

export function Layout(props) {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          {props.children}
        </div>
      </div>
    </main>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};
