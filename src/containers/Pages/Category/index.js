/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import CategoryArticles from '../../../containers/Fragments/CategoryArticles';

export class Category extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="page-fade-in">
        <Helmet title={this.props.match.params.query} />
        <h1>{this.props.match.params.query}</h1>
        <CategoryArticles match={this.props.match} />
      </main>
    );
  }
}

Category.propTypes = {
  match: PropTypes.shape(),
};

Category.defaultProps = {
  match: [],
};

export default Category;
