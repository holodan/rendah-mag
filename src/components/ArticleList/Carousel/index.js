/* eslint-disable import/no-named-as-default, no-return-assign */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactSwipe from 'react-swipe';

import { convertDate } from '../../../functions';
import AnimatedImage from '../../Elements/AnimatedImage';

export class ArticleListGrid extends PureComponent {
  date = date => convertDate(date);

  render() {
    const { list, padding } = this.props;
    console.log(list.length);

    return (
      <div className={`w-100  center  ${padding}`}>
        <ReactSwipe
          className="carousel"
          swipeOptions={{
            continuous: true,
            auto: 2200,
            speed: 300,
            swiping: true,
          }}
        >
          {list.map(article => (
            <div key={article.title}>
              <article className="rel">
                <figure>
                  <Link className="db  shadow2" title={article.slug} to={`/article/${article.slug}`}>
                    <AnimatedImage
                      lazy={false}
                      src={article.img}
                      alt={article.title}
                      styles="fade-in-zoom-in  vh-50  mh14  w-100"
                    />
                  </Link>
                </figure>

                <Link className="abs  top  bottom  left  right  tac  center  ma  h2  mw-80" to={`/article/${article.slug}`}>
                  <p className="t-body  dib  link  pa3  bg-black  shadow2">
                    <span className="t-title  white  bold  f4  f3-md  ttu  cp  over-hidden  link">{article.title}</span>
                  </p>
                </Link>
              </article>
            </div>
          ))}
        </ReactSwipe>
      </div>
    );
  }
}

ArticleListGrid.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  padding: PropTypes.string,
};

ArticleListGrid.defaultProps = {
  list: [],
  padding: '',
};

export default ArticleListGrid;
