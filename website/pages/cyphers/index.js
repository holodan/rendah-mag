import {
  Heading,
  Image,
  Button,
  Copy,
  Icon,
  Input,
} from 'next-pattern-library';
import BlockContent from '@sanity/block-content-to-react';
import { Parallax } from 'react-scroll-parallax';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import HeroCypher from '~/components/hero/cypher';
import CardCypher from '~/components/card/cypher';
import SubscribeForm from '~/components/subscribe-form';

import {
  getSiteConfig,
  imageBuilder,
  getCurrentAndPreviousCyphers,
} from '~/lib/sanity/requests';

export default function Cyphers({ siteConfig, cyphers }) {
  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite={false}
        meta={{
          siteConfig,
          title: 'Cyphers',
          description: 'This is the Cyphers page.',
          image: null,
        }}
        preview={null}
      >
        <>
          <HeroCypher cypher={cyphers?.current} />

          <div className="pt5  mt4  ph3  ph4-md">
            <Container>
              <div className="bg-black  shadow2  br3  pa4  pa5-md  mb5">
                <div className="pb3">
                  <Heading
                    /* Options */
                    htmlEntity="h1"
                    text="What is a Rendah Mag Cypher?"
                    color="white"
                    size="large"
                    truncate={null}
                    reveal={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <div className="measure-wide">
                  <Copy
                    /* Options */
                    text={`
                    Each month, Rendah Mag works with a selected artist to
                    curate a sample pack, consisting of a variety of
                    instruments, loops, basses, and basically anything that
                    could be used to make a track. We release this pack to the
                    public to make a track of their own using the samples and
                    against a set of rules. The artists then submit their
                    tracks to us, and we pick our favourites to go into a
                    curated mix.
                    `}
                    color="white"
                    size="medium"
                    truncate={null}
                  />
                </div>
              </div>

              {cyphers?.current && (
                <div className="flex  flex-wrap  bg-almost-white  shadow2  br3  pa4  pa5-md  mb5">
                  <div className="col-24  col-12-md  pr5-md  pb5  pb0-md">
                    <div className="pb3">
                      <Heading
                        /* Options */
                        htmlEntity="h1"
                        text="This month's Cypher."
                        color="black"
                        size="large"
                        truncate={null}
                        reveal={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>

                    <div className="post__body  measure-wide">
                      <BlockContent
                        blocks={
                          cyphers.current.announcementFields
                            .announcementDescription
                        }
                      />
                    </div>
                  </div>

                  <div className="col-24  col-12-md">
                    <Parallax
                      className="z1  nt4"
                      y={['30px', '-15px']}
                      tagOuter="figure"
                    >
                      <div className="shadow2">
                        <Image
                          /* Options */
                          src={imageBuilder
                            .image(cyphers.current.imageLandscape)
                            .height(300)
                            .width(300)
                            .url()}
                          placeholder={imageBuilder
                            .image(cyphers.current.imageLandscape)
                            .height(25)
                            .width(25)
                            .url()}
                          alt="This is the alt text."
                          figcaption={null}
                          height={300}
                          onClick={null}
                          /* Children */
                          withLinkProps={null}
                        />
                      </div>
                    </Parallax>
                  </div>
                </div>
              )}

              {cyphers.previous.length > 0 && (
                <section className="pb5">
                  <div className="pb4">
                    <Heading
                      /* Options */
                      htmlEntity="h1"
                      text="Previous Cyphers."
                      color="black"
                      size="medium"
                      truncate={null}
                      reveal={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>

                  <div className="flex  flex-wrap">
                    {cyphers.previous.map((cypher, i) => (
                      <div key={cypher.slug} className="col-24  col-8-md">
                        <div className="ph3  pv2">
                          <CardCypher i={i} post={cypher} columnCount={4} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </Container>
          </div>

          <section className="pb3">
            <SubscribeForm />
          </section>
        </>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const siteConfig = await getSiteConfig();
  const cyphers = await getCurrentAndPreviousCyphers();

  return {
    props: { siteConfig, cyphers },
  };
}
