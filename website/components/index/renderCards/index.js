import { Parallax } from 'react-scroll-parallax';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Heading from '~/components/elements/heading';

import Button from '~/components/elements/button';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import { getCategory } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function Home({ siteConfig }) {
  const app = useApp();

  const [interviews, setInterviews] = useState(null);
  const [news, setNews] = useState(null);
  const [insights, setInsights] = useState(null);
  const [premieres, setPremieres] = useState(null);
  const [guestMixes, setGuestMixes] = useState(null);

  const [interviewsLength, setInterviewsLength] = useState(4);
  const [newsLength, setNewsLength] = useState(6);
  const [insightsLength, setInsightsLength] = useState(6);
  const [premieresLength, setPremieresLength] = useState(4);
  const [guestMixesLength, setGuestMixesLength] = useState(4);

  useEffect(() => {
    const action = async () => {
      const interviewsRes = await getCategory('interviews', [1, 4]);
      const newsRes = await getCategory('news', [1, 6]);
      const insightsRes = await getCategory('insights', [1, 6]);
      const premieresRes = await getCategory('premieres', [1, 4]);
      const guestMixesRes = await getCategory('guest-mix', [1, 4]);

      setInterviews(interviewsRes);
      setNews(newsRes);
      setInsights(insightsRes);
      setPremieres(premieresRes);
      setGuestMixes(guestMixesRes);
    };

    action();
  }, []);

  const buttonIcon = <IconArrowRight color="black" size={20} />;

  const ParallaxDiv = app.deviceSize === 'md' ? 'div' : Parallax;

  return (
    <>
      <Container>
        <div className="bg-black  pa2  ml3  dib  mb4">
          <Heading
            /* Options */
            htmlEntity="h2"
            text="Interviews"
            color="white"
            size="small"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div className="flex  flex-wrap">
          <div className="col-24">
            <section className="pb5">
              <div className="flex  flex-wrap">
                {[...Array(interviewsLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-6-md">
                    <div className="ph3  pv2">
                      <CardBlog
                        i={i}
                        post={interviews?.articles && interviews?.articles[i]}
                        columnCount={4}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex  justify-end  pr2">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text="All Interviews"
                  color="black"
                  fluid={false}
                  icon={buttonIcon}
                  iconFloat={null}
                  inverted={false}
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'next',
                    href: '/category/[slug]',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: {
                      as: `/category/interviews`,
                      scroll: false,
                    },
                  }}
                />
              </div>
            </section>
          </div>
        </div>
      </Container>

      <Container>
        <div className="bg-black  pa2  ml3  dib  mb4">
          <Heading
            /* Options */
            htmlEntity="h2"
            text="Premieres"
            color="white"
            size="small"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div className="flex  flex-wrap">
          <div className="col-24">
            <section className="pb5">
              <div className="flex  flex-wrap">
                {[...Array(premieresLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-6-md">
                    <div className="ph3  pv2">
                      <CardBlog
                        i={i}
                        post={premieres?.articles && premieres?.articles[i]}
                        columnCount={4}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex  justify-end  pr2">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text="All Premieres"
                  color="black"
                  fluid={false}
                  icon={buttonIcon}
                  iconFloat={null}
                  inverted={false}
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'next',
                    href: '/category/[slug]',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: {
                      as: `/category/premieres`,
                      scroll: false,
                    },
                  }}
                />
              </div>
            </section>
          </div>
        </div>
      </Container>

      <div className="bg-light-grey  pv5  mv4">
        <Container>
          <div className="bg-black  pa2  ml3  dib  mb4">
            <Heading
              /* Options */
              htmlEntity="h2"
              text="News & Insights"
              color="white"
              size="small"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="flex  flex-wrap">
            <div className="col-24  col-12-md">
              <section className="pb5">
                <div className="flex  flex-wrap">
                  {[...Array(newsLength)].map((iteration, i) => (
                    <div key={iteration} className="col-24  col-12-md">
                      <div className="ph3  pv2">
                        <CardBlog
                          i={i}
                          post={news?.articles && news?.articles[i]}
                          columnCount={4}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex  justify-end  pr2">
                  <Button
                    /* Options */
                    type="secondary"
                    size="medium"
                    text="All News"
                    color="black"
                    fluid={false}
                    icon={buttonIcon}
                    iconFloat={null}
                    inverted={false}
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/category/[slug]',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: {
                        as: `/category/news`,
                        scroll: false,
                      },
                    }}
                  />
                </div>
              </section>
            </div>

            <div className="col-24  col-12-md">
              <section className="pb5">
                <div className="flex  flex-wrap">
                  {[...Array(insightsLength)].map((iteration, i) => (
                    <div key={iteration} className="col-24  col-12-md">
                      <div className="ph3  pv2">
                        <CardBlog
                          i={i}
                          post={insights?.articles && insights?.articles[i]}
                          columnCount={4}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex  justify-end  pr2">
                  <Button
                    /* Options */
                    type="secondary"
                    size="medium"
                    text="All Insights"
                    color="black"
                    fluid={false}
                    icon={buttonIcon}
                    iconFloat={null}
                    inverted={false}
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/category/[slug]',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: {
                        as: `/category/insights`,
                        scroll: false,
                      },
                    }}
                  />
                </div>
              </section>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="bg-black  pa2  ml3  dib  mb4  mt4">
          <Heading
            /* Options */
            htmlEntity="h2"
            text="Guest Mixes"
            color="white"
            size="small"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div className="flex  flex-wrap">
          <div className="col-24">
            <section className="pb5">
              <div className="flex  flex-wrap">
                {[...Array(guestMixesLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-6-md">
                    <div className="ph3  pv2">
                      <CardBlog
                        i={i}
                        post={guestMixes?.articles && guestMixes?.articles[i]}
                        columnCount={4}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex  justify-end  pr2">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text="All Guest Mixes"
                  color="black"
                  fluid={false}
                  icon={buttonIcon}
                  iconFloat={null}
                  inverted={false}
                  loading={false}
                  disabled={false}
                  skeleton={false}
                  onClick={null}
                  /* Children */
                  withLinkProps={{
                    type: 'next',
                    href: '/category/[slug]',
                    target: null,
                    routerLink: Link,
                    routerLinkProps: {
                      as: `/category/guest-mix`,
                      scroll: false,
                    },
                  }}
                />
              </div>
            </section>
          </div>
        </div>
      </Container>
    </>
  );
}
