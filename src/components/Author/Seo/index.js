/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export class Seo extends PureComponent {
  render() {
    const { author } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <title>{author.name}</title>
          <meta name="description" content={author.description} />

          {/* Google+ */}
          <meta itemprop="name" content={author.name} />
          <meta itemprop="description" content={author.description} />
          <meta itemprop="image" content={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${author.img}`} />

          {/* Twitter  */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@RendahMag" />
          <meta name="twitter:title" content={author.name} />
          <meta name="twitter:description" content={author.description} />
          <meta name="twitter:image:src" content={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${author.img}`} />

          {/* Open Graph data */}
          <meta property="og:title" content={author.name} />
          <meta property="og:type" content="author" />
          <meta property="og:url" content="https://www.RendahMag.com/" />
          <meta property="og:image" content={`https://res.cloudinary.com/dzz8ji5lj/image/upload/q_auto:good/${author.img}`} />
          <meta property="og:description" content={author.description} />
          <meta property="og:site_name" content="Rendah" />
          <meta property="author:section" content="author" />
        </Helmet>
      </React.Fragment>
    );
  }
}

Seo.propTypes = {
  author: PropTypes.shape(),
};

Seo.defaultProps = {
  author: {},
};

export default Seo;
