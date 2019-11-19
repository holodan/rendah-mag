/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Heading, Copy } from 'rendah-pattern-library';

import SearchArticles from '../../../containers/Fragments/Blog/SearchArticles';
import CategoryGrid from '../../../components/CategoryGrid';

export class Search extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = 'Search';
    const searchQuery = this.props.match.params.query;
    const canonical = `https://www.rendahmag.com/${searchQuery}`;

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={`Searching articles for ${searchQuery}`} />
          <link rel="canonical" href={canonical} />
        </Helmet>

        <div className="container-medium  mla  mra  pt4  mv3">
          <div className="flex  pb2  ph3">
            <Heading
              /* Options */
              htmlEntity={'h1'}
              text={'Search'}
              color={'black'}
              size={'x-large'}
              truncate={null}
              reveal
            />
          </div>
          <div className="flex  pb2  ph3">
            <Copy
              /* Options */
              text={`Latest results for: ${searchQuery}`}
              color={'black'}
              size={'medium'}
              truncate={null}
            />
          </div>
        </div>

        <SearchArticles match={this.props.match} padding="pb5" />
        <CategoryGrid />
      </main>
    );
  }
}

Search.propTypes = {
  match: PropTypes.shape(),
};

Search.defaultProps = {
  match: [],
};

export default Search;
