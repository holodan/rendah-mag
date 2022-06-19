import { useEffect, useState } from 'react';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import dynamic from 'next/dynamic';
import { Heading, Button, Copy, Icon } from 'next-pattern-library';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Hero from '~/components/hero/home';
import CardBlog from '~/components/card/blog';
import CardCreations from '~/components/card/creations';
import Modal from '~/components/modal';
import SubscribeForm from '~/components/subscribe-form';

import {
  getSiteConfig,
  getFeaturedPost,
  getCategory,
  getAllCreationsTotal
} from '~/lib/sanity/requests';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

const RenderCards = dynamic(() => import('~/components/index/renderCards'));

export default function Home({ siteConfig }) {
  const app = useApp();
  const router = useRouter();
  const [user] = useUser();
  const [featuredPost, setFeaturedPost] = useState(null);
  const [interviews, setInterviews] = useState(null);
  const [creations, setCreations] = useState(null);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const [interviewsLength, setInterviewsLength] = useState(4);
  const [creationsLength, setCreationsLength] = useState(4);

  useEffect(() => {
    const action = async () => {
      const featuredPostRes = await getFeaturedPost();
      const interviewsRes = await getCategory('interviews', [1, 4]);
      const creationsRes = await getAllCreationsTotal();

      setFeaturedPost(featuredPostRes);
      setInterviews(interviewsRes);
      setCreations(creationsRes);
    };

    action();
  }, []);

  const handleIntersect = event => {
    if (
      event.isIntersecting &&
      !user &&
      !hasShownModal &&
      !Cookies.get('rndh-newsletter-set')
    ) {
      setHasShownModal(true);
      setModalActive(true);
      Cookies.set('rndh-newsletter-set', true, { expires: 5 });
    }
  };

  const observer = { onChange: handleIntersect, rootMargin: '0% 0% -30% 0%' };

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  return (
    <>
      <Layout
        navOffset={null}
        navOnWhite={false}
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: 'Home',
          description: null,
          image: null
        }}
        preview={null}
      >
        <Modal
          /* Options */
          size="small"
          active={modalActive}
        >
          <div className="pb2  mb2">
            <Heading
              /* Options */
              htmlEntity="h3"
              text="Join our Mailing List?"
              color="black"
              size="medium"
              truncate={0}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="pb2">
            <Copy
              /* Options */
              text="We usually only send a few emails each month, and keep the content relevant as ever."
              color="black"
              size="medium"
              truncate={null}
            />
          </div>
          <div className="pb3  mb2">
            <SubscribeForm onSuccess={() => setModalActive(false)} />
          </div>
          <div className="flex  flex-wrap  pb2">
            <div className="col-24  flex  justify-center  align-center">
              <Button
                /* Options */
                type="secondary"
                size="medium"
                text="No thanks"
                color="black"
                fluid={false}
                icon={null}
                iconFloat={null}
                inverted={false}
                loading={false}
                disabled={false}
                skeleton={false}
                onClick={() => {
                  setModalActive(false);
                }}
                /* Children */
                withLinkProps={null}
              />
            </div>
          </div>
        </Modal>

        <Hero
          image={featuredPost?.coverImage}
          title={featuredPost?.title || 'Loading...'}
          description={null}
          heroButtonText="Read more"
          link={featuredPost?.slug}
          marginTop={0}
          marginBottom={0}
          modifier="home"
          skeleton={!featuredPost}
        />

        <div className="pt5  pt6-md">
          <Container>
            <section className="pb5">
              <div className="pb4  ph3">
                <div className="bg-black  pa2  dib">
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
              </div>

              <div className="flex  flex-wrap">
                {[...Array(interviewsLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-12-md">
                    <div className="ph3  pv2">
                      <CardBlog
                        i={i}
                        post={interviews?.articles && interviews?.articles[i]}
                        columnCount={2}
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
                      scroll: false
                    }
                  }}
                />
              </div>
            </section>
          </Container>

          <div className="creations  bg-black  mb5">
            <Container>
              <section className="pv5  creations  bg-black">
                <div className="flex  flex-wrap  pb4  ph3">
                  <div className="col-24  col-12-md  flex  justify-start">
                    <div className="bg-white  pa2  dib">
                      <Heading
                        /* Options */
                        htmlEntity="h2"
                        text="Creations"
                        color="black"
                        size="small"
                        truncate={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>
                  </div>
                  <div className="col-24  col-12-md  flex  justify-end">
                    <div className="pa2  dib">
                      <Heading
                        /* Options */
                        htmlEntity="h2"
                        text="Exclusive to the Dominion Subscription"
                        color="white"
                        size="small"
                        truncate={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex  flex-wrap">
                  {[...Array(creationsLength)].map((iteration, i) => (
                    <div key={iteration} className="col-24  col-6-md">
                      <div className="ph3  pv2">
                        <CardCreations
                          i={i}
                          post={creations && creations[i]}
                          columnCount={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {user ? (
                  <div className="flex  justify-end  pr2">
                    <Button
                      /* Options */
                      type="secondary"
                      size="medium"
                      text="All Creations"
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
                        href: '/profile?tab=creations',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: null
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex  justify-end  pr2">
                    <div className="underline">
                      <Button
                        /* Options */
                        type="secondary"
                        size="medium"
                        text="Log in"
                        color="black"
                        fluid={false}
                        icon={null}
                        iconFloat={null}
                        inverted={false}
                        loading={false}
                        disabled={false}
                        skeleton={false}
                        onClick={null}
                        /* Children */
                        withLinkProps={{
                          type: 'next',
                          href: '/login',
                          target: null,
                          routerLink: Link,
                          routerLinkProps: null
                        }}
                      />
                    </div>

                    <span className="pl1  pr2  white">or</span>

                    <div className="underline">
                      <Button
                        /* Options */
                        type="secondary"
                        size="medium"
                        text="Sign up"
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
                          href: '/dominion',
                          target: null,
                          routerLink: Link,
                          routerLinkProps: null
                        }}
                      />
                    </div>
                  </div>
                )}
              </section>
            </Container>
          </div>

          <Observer {...observer}>
            <div className="" />
          </Observer>

          <LazyLoad once offset={800} height={800}>
            <RenderCards />
          </LazyLoad>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ req }) {
  const siteConfig = await getSiteConfig();

  return {
    props: {
      siteConfig
    }
  };
}
