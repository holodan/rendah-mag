/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import Iframe from 'react-iframe';
import { Heading, Copy } from 'rendah-pattern-library';

import ExtraArticles from '../../../containers/Fragments/Blog/ExtraArticles';

export class WatchTower extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  playlistEmbeds = () => (
    <div className="col-24">
      <Iframe
        url="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/543806010&color=%23ff817b&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false"
        width="100%"
        height="500"
        display="initial"
        position="relative"
      />
    </div>
  );

  render() {
    const title = 'Watch Tower';
    const description = `The Rendah Team is invested in keeping you up-to-date
    with the latest Halftime Beats. We've compiled our favourite Tracks &
    Mixes into 2 Watch Tower playlists which will be updated regularly.`;
    const canonical = 'https://www.rendahmag.com/watch-tower';

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonical} />
        </Helmet>

        <div className="container-medium  mla  mra  pt4  mv3">
          <div className="flex  pb2  ph3">
            <Heading
              /* Options */
              htmlEntity={'h1'}
              text={title}
              color={'black'}
              size={'x-large'}
              truncate={null}
              reveal
            />
          </div>
          <div className="flex  pb2  ph3">
            <Copy
              /* Options */
              text={description}
              color={'black'}
              size={'medium'}
              truncate={3}
            />
          </div>
          <div className="flex  pv3  ph3">
            {this.playlistEmbeds()}
          </div>
        </div>

        <div className="bg-dark-grey  mv4  mv5-md  pv4  pv5-md">
          <div className="container-medium  mla  mra  mv3">
            <div className="flex  pb2  ph3">
              <Heading
                /* Options */
                htmlEntity={'h3'}
                text={'More Articles'}
                color={'white'}
                size={'x-large'}
                truncate={null}
                reveal
              />
            </div>
          </div>

          <div className="container-medium  center  pv2">
            <div className="flex  flex-wrap">
              <ExtraArticles
                type="grid"
                padding="ph3  pb2"
                range={[1, 4]}
                column="col-24"
                invert
              />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default WatchTower;
