import React from 'react';

const renderRobots = () => {
  let sitemapData;

  if (proccess.env.DOMAIN_TYPE === 'production') {
    sitemapData = `
    User-agent: *
    Disallow: /404/
    Disallow: /forgot/
    Disallow: /profile/
    Disallow: /article-preview/
    SITEMAP: http://www.rendahmag.com/feeds/sitemap.xml
    `;
  } else {
    sitemapData = `
    User-agent: *
    Disallow: /
    `;
  }

  return sitemapData;
};

class Robots extends React.Component {
  static async getInitialProps({ res }) {
    res.setHeader('Content-Type', 'text/plain');
    res.write(renderRobots());
    res.end();
  }
}

export default Robots;
