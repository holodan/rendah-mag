import Router, { useRouter } from 'next/router';
import toMarkdown from '@sanity/block-content-to-markdown';

import Layout from '~/components/layout';
import Container from '~/components/layout/container';
import SocialLinks from '~/components/article/social-links';
import Author from '~/components/article/author';

import GalleryInfo from '~/components/gallery/info';
import GalleryBanner from '~/components/gallery/banner';
import GalleryImageText from '~/components/gallery/image-text';

import useWindowDimensions from '~/functions/useWindowDimensions';
import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

import {
  getSiteConfig,
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
      return <GalleryBanner post={post} component={component} />;
    }

    if (component._type === 'galleryTextImage') {
      return <GalleryImageText post={post} component={component} />;
    }

    return false;
  };

  if (!router.isFallback && !post?.slug) {
    Router.push('/404');
  }

  if (!router.isFallback && post?.slug) {
    return (
      <Layout
        navOffset={null}
        navOnWhite={false}
        hasNav
        hasFooter
        darkMode
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

          <Container>
            <div className="measure-wide  mla  mra  pb2  pb3-md  mb2">
              <SocialLinks article={post} />
            </div>

            <section className="flex  flex-wrap  justify-center  align-center  pb3  pb4-md">
              {post.authors.map((i) => (
                <div className="col-24  col-12-md  pb4  pb3-md  ph3">
                  <Author author={i.author} />
                </div>
              ))}
            </section>
          </Container>
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
  //     revalidate: 10,
  //   };
  // }

  return {
    props: {
      siteConfig,
      preview,
      post: data || null,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const data = await getAllGalleryTotal();

  return {
    paths:
      data.map((gallery) => ({
        params: {
          slug: gallery.slug,
        },
      })) || [],
    fallback: 'blocking',
  };
}
