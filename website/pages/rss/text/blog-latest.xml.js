import React from 'react';

import { getAllPosts, imageBuilder } from '~/lib/sanity/requests';
import { SITE_URL } from '~/constants';
import escapeXml from '~/functions/escapeXml';
import encodeSpecialChar from '~/functions/encodeSpecialChar';

const sitemapXml = (posts) => {
  let postsXML = '';

  posts.map((post) => {
    const title = post?.title || '' ? `${post.title}` : '';

    const titleBlock = post?.title ? `${title}` : '';

    const url = post?.slug ? `${SITE_URL}/article/${post.slug}` : SITE_URL;

    const image = post?.image
      ? imageBuilder.image(post.image).auto('format').url()
      : '';

    const readMoreLink = `url`;

    postsXML += `
      <item>
        <title>${escapeXml(encodeSpecialChar(title))}</title>
        <link>${escapeXml(encodeSpecialChar(url))}</link>
        <description>
          ${escapeXml(encodeSpecialChar(image))}
          ${escapeXml(encodeSpecialChar(titleBlock))}
          ${escapeXml(encodeSpecialChar(readMoreLink))}
        </description>
      </item>
      `;

    return true;
  });

  return `
    <rss version="2.0">
      <channel>
        <title>RSS Feed</title>
        <link>${SITE_URL}</link>
        <description>This is a RSS feed</description>
        ${postsXML}
      </channel>
    </rss>
    `;
};

export default class BlogLatest extends React.Component {
  static async getInitialProps({ res }) {
    const posts = await getAllPosts();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(posts));
    res.end();
  }
}
