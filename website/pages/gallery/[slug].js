import Link from 'next/link';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import map from 'lodash/map';
import Cookies from 'js-cookie';
import { parseISO, format } from 'date-fns';
import { Heading, Copy, Image, Label } from 'next-pattern-library';
import toMarkdown from '@sanity/block-content-to-markdown';

import Hero from '~/components/hero/creations';
import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import Sections from '~/components/article/body-sections';
import SocialLinks from '~/components/article/social-links';
import Author from '~/components/article/author';
import SubscribeForm from '~/components/subscribe-form';

import GalleryInfo from '~/components/gallery/info';
import GalleryBanner from '~/components/gallery/banner';
import GalleryImageText from '~/components/gallery/image-text';

import Date from '~/components/date';
import CardBlog from '~/components/card/blog';
import useWindowDimensions from '~/functions/useWindowDimensions';
import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import {
  getSiteConfig,
  imageBuilder,
  getAllGalleryTotal,
  getGallery,
} from '~/lib/sanity/requests';

export default function Gallery({ siteConfig, post, preview }) {
  const app = useApp();
  const router = useRouter();
  const [user] = useUser();
  const { height, width } = useWindowDimensions();

  const renderComponent = (component) => {
    if (component._type === 'galleryBanner') {
      return <GalleryBanner component={component} />;
    }

    if (component._type === 'galleryTextImage') {
      return <GalleryImageText component={component} />;
    }

    return false;
  };

  if (!router.isFallback && !post?.slug) {
    Router.push('/404');
  }

  if (!router.isFallback && post?.slug) {
    console.log('post', post);
    return (
      <Layout
        navOffset={null}
        navOnWhite={false}
        hasNav
        hasFooter
        meta={{
          siteConfig,
          title: post.title,
          description: toMarkdown(post.introduction),
          image: post.coverImage,
        }}
        preview={preview}
      >
        <div className="creations">
          <div className="rich-text">
            <GalleryInfo post={post} />

            {post?.components?.length &&
              post.components.map((iteration, i) => renderComponent(iteration))}
          </div>
        </div>
      </Layout>
    );
  }

  return false;
}

export async function getStaticProps({ req, params, preview = false }) {
  const siteConfig = await getSiteConfig();
  const data = await getGallery(params.slug, preview);

  // if (!data?.slug) {
  //   return {
  //     notFound: true,
  //     revalidate: 1,
  //   };
  // }

  return {
    props: {
      siteConfig,
      preview,
      post: data || null,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const data = await getAllGalleryTotal();

  return {
    paths:
      data.map((creations) => ({
        params: {
          slug: creations.slug,
        },
      })) || [],
    fallback: 'blocking',
  };
}
