import Head from 'next/head';
import { withRouter } from 'next/router';

import { useApp, useDispatchApp } from '~/context-provider/app';
import { imageBuilder } from '~/lib/sanity/requests';

const Meta = props => {
  const app = useApp();
  const dispatch = useDispatchApp();
  const { router, siteConfig, title, description, image } = props;

  // siteConfig
  const siteTitle = siteConfig.title || null;
  const siteDesc = siteConfig.description || null;
  const siteImage =
    imageBuilder
      .image(siteConfig.logo)
      .height(1000)
      .width(1000)
      .auto('format')
      .url() || '';

  // Page
  const titleVal = title || null;
  const descVal = description || null;
  const imageVal = image || null;

  const makeSchemaSocials = () => {
    const arr = [];

    Object.keys(siteConfig.socialHandles).forEach(key => {
      arr.push(siteConfig.socialHandles[key]);
    });

    return arr;
  };

  const makeSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${process.env.SITE_URL}/#organization`,
          name: siteTitle,
          url: process.env.SITE_URL,
          sameAs: makeSchemaSocials(),
          logo: {
            '@type': 'ImageObject',
            '@id': `${process.env.SITE_URL}/#logo`,
            inLanguage: 'en-US',
            url: siteImage,
            width: 1500,
            height: 1500,
            caption: siteTitle
          }
        },
        {
          '@type': 'WebSite',
          '@id': `${process.env.SITE_URL}/#website`,
          url: process.env.SITE_URL,
          name: siteTitle,
          description: siteDesc,
          publisher: { '@id': `${process.env.SITE_URL}/#organization ` },
          potentialAction: [
            {
              '@type': 'SearchAction',
              target: `${process.env.SITE_URL}/search/{search_term_string}`,
              'query-input': 'required name=search_term_string'
            }
          ],
          inLanguage: 'en-US'
        },
        {
          '@type': 'CollectionPage',
          '@id': `${process.env.SITE_URL}/#webpage`,
          url: process.env.SITE_URL,
          name: siteTitle,
          isPartOf: { '@id': `${process.env.SITE_URL}#website ` },
          about: { '@id': `${process.env.SITE_URL}/#organization ` },
          description: siteDesc,
          inLanguage: 'en-US'
        }
      ]
    };
  };

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.SITE_URL}${router.asPath}`}
        />

        <title>
          {process.env.NODE_ENV === 'development' ? '(Local) ' : ''}
          {titleVal} | {siteTitle}
        </title>

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />

        <meta name="description" content={descVal || siteDesc} />

        <meta property="fb:pages" content="302421033575970" />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:image" content={imageVal || siteImage} />
        <meta property="og:title" content={`${titleVal} | ${siteTitle}`} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.SITE_URL}${router.asPath}`}
        />
        <meta property="og:description" content={descVal || siteDesc} />
        <meta property="og:image" content={imageVal || siteImage} />

        <meta property="fb:app_id" content="154881868603516" />

        <meta name="twitter:card" content="Summary" />
        <meta name="twitter:title" content={`${titleVal} | ${siteTitle}`} />
        <meta name="twitter:description" content={descVal || siteDesc} />
        <meta name="twitter:image" content={imageVal || siteImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(makeSchema()) }}
        />
      </Head>
    </>
  );
};

export default withRouter(Meta);
