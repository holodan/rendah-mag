/* @flow */
/* eslint-disable import/no-named-as-default, react/prefer-stateless-function */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export class CategoryGrid extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="container-medium  center">
          <div className="flex  flex-wrap">
            <div className="col-24  col-8-lg  ph3">
              <Link className="link" to={'/category/interviews'}>
                <div className="flex  db  h4  flex-column  justify-center  shadow2  CategoryGrid__bg  CategoryGrid__bg--1" style={{ backgroundImage: 'url(https://res.cloudinary.com/dzz8ji5lj/image/upload/v1529440946/brand/Big_Canvas_Textures.png)' }}>
                  <h4 className="t-title  bold  f4  tac  dark-grey">INTERVIEWS</h4>
                </div>
              </Link>
            </div>
            <div className="col-24  col-8-lg  ph3">
              <Link className="link" to={'/category/insights'}>
                <div className="flex  db  h4  flex-column  justify-center  shadow2  CategoryGrid__bg  CategoryGrid__bg--2" style={{ backgroundImage: 'url(https://res.cloudinary.com/dzz8ji5lj/image/upload/v1529440946/brand/Big_Canvas_Textures.png)' }}>
                  <h4 className="t-title  bold  f4  tac  dark-grey">INSIGHTS</h4>
                </div>
              </Link>
            </div>
            <div className="col-24  col-8-lg  ph3">
              <Link className="link" to={'/category/news'}>
                <div className="flex  db  h4  flex-column  justify-center  shadow2  CategoryGrid__bg  CategoryGrid__bg--3" style={{ backgroundImage: 'url(https://res.cloudinary.com/dzz8ji5lj/image/upload/v1529440946/brand/Big_Canvas_Textures.png)' }}>
                  <h4 className="t-title  bold  f4  tac  dark-grey">NEWS</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CategoryGrid;
