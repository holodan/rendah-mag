/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property,
  react/forbid-prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';

import Heading from './heading';
import Paragraph from './paragraph';
import ListItem from './list-item';
import Quote from './quote';
// import NumberedList from './NumberedList';
import Image from './image';
// import Question from './Question';
// import Answer from './Answer';
import Soundcloud from './soundcloud';
import Spotify from './spotify';
import Youtube from './youtube';
import FacebookVideo from './facebook-video';
import ArticleLink from './link';

export class Seo extends PureComponent {
  renderSections = (section, i) => {
    // para
    if (section._type === 'block' && !section.listItem) {
      return (
        <div key={i}>
          <Paragraph text={section.children} markDefs={section.markDefs} />
        </div>
      );
    }

    // bullet list
    if (section._type === 'block' && section.listItem === 'bullet') {
      return (
        <ul key={i} className="pb3">
          <ListItem text={section.children} />
        </ul>
      );
    }

    // number list
    if (section._type === 'block' && section.listItem === 'number') {
      return (
        <ul key={i} className="pb3">
          <ListItem text={section.children} />
        </ul>
      );
    }

    // image
    if (
      section._type === 'image' &&
      (includes(section.asset._ref, '-jpg') ||
        includes(section.asset._ref, '-png'))
    ) {
      return (
        <div key={i} className="pv4">
          <Image section={section} />
        </div>
      );
    }

    // soundcloud embed
    if (section._type === 'soundCloudEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <Soundcloud url={section.soundCloudEmbed} />
        </div>
      );
    }

    // soundcloud embed
    if (section._type === 'spotifyEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <Spotify uri={section.spotifyEmbed} />
        </div>
      );
    }

    // soundcloud embed
    if (section._type === 'youTubeEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <Youtube videoId={section.youTubeEmbed} />
        </div>
      );
    }

    // facebook video embed
    if (section._type === 'facebookVideoEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <FacebookVideo url={section.facebookVideoEmbed} />
        </div>
      );
    }

    // subtitleBlock
    if (section._type === 'subtitleBlock') {
      return (
        <div key={i} className="pv2  mb2">
          <Heading text={section.subtitle} />
        </div>
      );
    }

    // quoteBlock
    if (section._type === 'quoteBlock') {
      return (
        <div key={i} className="pv2  mb2">
          <Quote quote={section.quote} source={section.source} />
        </div>
      );
    }

    // linkBlock
    if (section._type === 'linkBlock') {
      return (
        <div key={i} className="pv2  mb2">
          <ArticleLink text={section.text} url={section.url} />
        </div>
      );
    }

    return false;
  };

  render() {
    const { body } = this.props;

    return (
      <React.Fragment>
        {body.map((section, i) => this.renderSections(section, i))}
      </React.Fragment>
    );
  }
}

Seo.propTypes = {
  body: PropTypes.array,
};

Seo.defaultProps = {
  body: [],
};

export default Seo;
