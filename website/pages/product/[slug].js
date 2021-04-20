import Router, { useRouter } from 'next/router';

import {
  Tabs,
  Heading,
  Copy,
  Label,
  Image,
  Button,
  Icon,
} from 'next-pattern-library';
import BlockContent from '@sanity/block-content-to-react';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import {
  getSiteConfig,
  getProduct,
  getAllProductsTotal,
  imageBuilder,
} from '~/lib/sanity/requests';

export default function Product({ siteConfig, product }) {
  const router = useRouter();
  const isSoldOut = product?.tag === 'Sold-out';

  if (!router.isFallback && !product?.slug) {
    Router.push('/404');
  }

  if (!router.isFallback && product?.slug) {
    const buttonIconCart = <Icon icon={['fas', 'shopping-cart']} />;
    const buttonIconPlus = <Icon icon={['fas', 'plus']} />;

    const descriptionTab = (
      <div className="rich-text  db  pb3">
        <BlockContent blocks={product?.description} />
      </div>
    );

    const deliveryTab = (
      <div className="rich-text">
        <p>
          All physical products are shipped within 2 working days and are
          available globally.
        </p>
      </div>
    );

    const dominionTab = (
      <>
        <div className="rich-text">
          <p>
            For the same price, join the Dominion and recieve this item plus
            additional monthly features.{' '}
            <strong>We offer the following to you:</strong>
          </p>

          <ul>
            <li>A Welcome package (+ membership card & stickers).</li>
            <li>A quarter-yearly printed issue of Rendah Mag.</li>
            <li>
              Frequent exclusive music, samples, tutorials, and more from
              featured artists & collectives.
            </li>
            <li>Your own Dominion Profile login.</li>
            <li>Discounts from all coming Rendah Mag products.</li>
          </ul>

          <a href="/dominion">Find out more</a>
        </div>
      </>
    );
    return (
      <div className="bg-almost-white">
        <Layout
          navOffset="top"
          navOnWhite
          hasNav
          hasFooter
          meta={{
            siteConfig,
            title: product?.title,
            description: null,
            image: product?.image1,
          }}
          preview={null}
        >
          <div className="pt4  pt0-md">
            <Container>
              <div className="flex  flex-wrap  pb5">
                <div className="col-24  col-12-md  ph2  pb3">
                  <Image
                    /* Options */
                    src={imageBuilder
                      .image(product?.image1)
                      .height(1000)
                      .width(1000)
                      .auto('format')
                      .fit('clip')
                      .url()}
                    placeholder={imageBuilder
                      .image(product?.image1)
                      .height(25)
                      .width(25)
                      .auto('format')
                      .fit('clip')
                      .blur('20')
                      .url()}
                    alt={product?.title}
                    figcaption={null}
                    height={500}
                    width={null}
                    customClass="shadow2"
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>
                <div className="col-24  col-12-md  pl4-md">
                  <div className="db  ph2  pt2">
                    <Heading
                      /* Options */
                      htmlEntity="h1"
                      text={product?.title}
                      color="black"
                      size="large"
                      truncate={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                  <div className="flex  flex-wrap  ph2  pb3">
                    <div className="dib  pr2">
                      <Label
                        /* Options */
                        customClass="ph2"
                        text={`£${product?.price}`}
                        color="white"
                        backgroundColor="black"
                        onClick={null}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>

                    {product?.tag && product?.tag !== 'None' && (
                      <div className="dib  pr2">
                        <Label
                          /* Options */
                          customClass="ph2"
                          text={product?.tag}
                          color="black"
                          backgroundColor="white"
                          onClick={null}
                          /* Children */
                          withLinkProps={null}
                        />
                      </div>
                    )}
                  </div>

                  <div className="product__tabs  bb  bc-black  pb3  mb4">
                    <Tabs
                      /* Options */
                      content={[
                        {
                          id: '1',
                          tabTitle: 'Description',
                          tabContent: descriptionTab,
                        },
                        {
                          id: '2',
                          tabTitle: 'Shipping & Returns',
                          tabContent: deliveryTab,
                        },
                        product.category === 'Printed Issues'
                          ? {
                              id: '3',
                              tabTitle: 'DOMINION',
                              tabContent: dominionTab,
                            }
                          : null,
                      ]}
                      defaultSelected="1"
                    />
                  </div>

                  <div className="flex  flex-wrap  align-center">
                    {!isSoldOut && (
                      <div className="dib  ph2  pb3">
                        <div
                          className="snipcart-add-item"
                          data-item-id={product?.slug}
                          data-item-price={product?.price}
                          data-item-url={`/product/${product?.slug}`}
                          data-item-description=""
                          data-item-image={product?.image1}
                          data-item-name={product?.title}
                          data-item-weight={product?.weight}
                        >
                          <Button
                            /* Options */
                            type="primary"
                            size="medium"
                            text="Add to cart"
                            color="black"
                            fluid={false}
                            icon={buttonIconPlus}
                            iconFloat="left"
                            inverted={false}
                            loading={false}
                            disabled={false}
                            skeleton={false}
                            onClick={null}
                            /* Children */
                            withLinkProps={null}
                          />
                        </div>
                      </div>
                    )}

                    <div className="dib  ph2  pb3">
                      <div className="snipcart-checkout">
                        <Button
                          /* Options */
                          type="primary"
                          size="medium"
                          text="View Basket"
                          color="black"
                          fluid={false}
                          icon={buttonIconCart}
                          iconFloat={null}
                          inverted="transparent"
                          loading={false}
                          disabled={false}
                          skeleton={false}
                          onClick={null}
                          /* Children */
                          withLinkProps={null}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </Layout>
      </div>
    );
  }

  return false;
}

export async function getStaticProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const product = await getProduct(params.slug);
  return {
    props: {
      siteConfig,
      product,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const data = await getAllProductsTotal();

  return {
    paths:
      data.map((product) => ({
        params: {
          slug: product.slug,
        },
      })) || [],
    fallback: true,
  };
}
