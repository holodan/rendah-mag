import sanityImage from '@sanity/image-url';

import client, { previewClient } from './config';
import dateTodayISO from '~/functions/dateTodayISO';
import dateTodayYyyyMmDd from '~/functions/dateTodayYyyyMmDd';

const postFields = `
  name,
  title,
  publishedAt,
  body,
  introduction,
  socialHandles,
  socialTagline,
  'categories': categories[]->title,
  'tag': tag->{...},
  'slug': slug.current,
  'coverImage': image.asset->url,
  'coverImageCaption': image.caption,
  'coverImageFullImage': image.fullImage,
  'authors': authors[] {
    'author': *[_id == ^._ref] [0] {
      ...,
    },
  },
`;

const postFieldsCard = `
  _id,
  hasPostedDiscord,
  name,
  title,
  publishedAt,
  'slug': slug.current,
  'coverImage': image.asset->url,
  'authors': authors[] {
    'author': *[_id == ^._ref] [0] {
      ...,
    },
  },
`;

const creationsFields = `
  name,
  title,
  publishedAt,
  description,
  socialHandles,
  excerpt,
  publicBody,
  body,
  socialTagline,
  'slug': slug.current,
  'coverImage': image.asset->url,
  categories,
  'authors': authors[] {
    'author': *[_id == ^._ref] [0] {
      ...,
    },
  },
`;

const creationsFieldsCard = `
  name,
  title,
  excerpt,
  publishedAt,
  'slug': slug.current,
  categories,
  'coverImage': image.asset->url,
`;

const productFields = `
  ...,
  'category': category->title,
  'collection': collection->title,
  'slug': slug.current,
  'image1': image1.asset->url,
  'image2': image2.asset->url,
  creditsItems,
`;

const teamFields = `
  image,
  name,
  alias,
  description,
  coreTeam,
  role,
  'slug': slug.current,
`;

const tagFields = `
  ...,
  'slug': slug.current,
`;

const getClient = (preview) => (preview ? previewClient : client);

export const imageBuilder = sanityImage(client);

export async function getSiteConfig() {
  const data = await client.fetch('*[_type == "siteSettings"] [0] { ..., }');
  return data;
}

// Posts
export async function getPreviewPostBySlug(slug) {
  const today = dateTodayISO();

  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug && publishedAt < $today]{
      ${postFields}
      content
    }`,
    { slug, today }
  );
  return data[0];
}

export async function getPostWithSearch(slug) {
  const today = dateTodayISO();

  // Fetch posts matching title
  const titleMatches = await client.fetch(
    `*[_type == "post" && title match $slug && publishedAt < $today] | order(publishedAt desc) {
      ${postFieldsCard}
    }`,
    { slug, today }
  );

  // Fetch posts matching all other fields
  const otherMatches = await client.fetch(
    `*[_type == "post" && 
      (excerpt match $slug || 
      introduction[].children[].text match $slug || 
      body[].children[].text match $slug) && 
      publishedAt < $today] | order(publishedAt desc) {
      ${postFieldsCard}
    }`,
    { slug, today }
  );

  // Merge and remove duplicates
  const mergedData = [...titleMatches, ...otherMatches];
  const uniqueData = Array.from(new Set(mergedData.map((a) => a._id))).map(
    (_id) => mergedData.find((a) => a._id === _id)
  );

  return uniqueData;
}

export async function getFeaturedPosts(preview) {
  const today = dateTodayISO();

  const results = await getClient(preview).fetch(
    `*[_type == "post"] | order(publishedAt desc) [0..5] {
      ${postFieldsCard}
    }`,
    { today }
  );
  return results;
}

export async function getAllPosts(preview) {
  const today = dateTodayISO();

  const results = await getClient(preview).fetch(
    `*[_type == "post" && publishedAt < $today] | order(publishedAt desc) [0..31] {
      ${postFieldsCard}
    }`,
    { today }
  );
  return results;
}

export async function getAllPostsTotal(preview) {
  const today = dateTodayISO();

  const results = await getClient(preview).fetch(
    `*[_type == "post" && publishedAt < $today] | order(publishedAt desc) {
      ${postFieldsCard}
    }`,
    { today }
  );

  return results;
}

export async function getAllCreationsTotal(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "creations"] | order(publishedAt desc) {
      ${creationsFieldsCard}
    }`);
  return results;
}

export async function getLatestDominionCreations(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "creations"] | order(publishedAt desc) [0..23] {
      ${creationsFieldsCard}
    }`
  );

  return results;
}

export async function getCreation(slug, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "creations" && slug.current == $slug] | order(publishedAt desc) [0] {
      ${creationsFields}
    }`,
    { slug }
  );

  return results;
}

export async function getAllGalleryTotal(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "gallery"] | order(publishedAt desc) {
      ${postFieldsCard}
      galleryImages
    }`);
  return results;
}

export async function getGallery(slug, preview) {
  const [gallery, morePosts] = await Promise.all([
    getClient(preview)
      .fetch(
        `*[_type == "gallery" && slug.current == $slug] | order(publishedAt desc)[0] {
          ${postFields}
          galleryImages[]{
            "fileName": asset->originalFilename,
            ...,
          }
        }
        `,
        { slug }
      )
      .then((res) => res),
    getClient(preview).fetch(
      `*[_type == "post" && tag._ref in *[_type == "gallery" && slug.current == $slug]._id] {
          ${postFields}
        }`,
      { slug }
    ),
  ]);

  return { gallery, morePosts };
}

export async function getCategory(category, range, division = null) {
  const today = dateTodayISO();
  const rangeFrom = range[0] - 1;
  const rangeTo = range[1] - 1;

  let divisionFilter = '';
  if (division) {
    divisionFilter = `&& count(divisions[_ref in *[_type == "division" && slug.current == $division]._id]) > 0`;
  }

  const results = await getClient(null).fetch(
    `*[_type == "category" && slug.current == $category] [0] {
      ...,
      "posts": *[_type == "post" && references(^._id) ${divisionFilter} && publishedAt < $today] | order(publishedAt desc) [$rangeFrom..$rangeTo] {
        ${postFieldsCard}
      }
    }`,
    { category, rangeFrom, rangeTo, today, division }
  );

  return results;
}

export async function getDivision(division, range, exclude = null) {
  const today = dateTodayISO();

  const rangeFrom = range[0] - 1;
  const rangeTo = range[1] - 1;

  const exclusionQuery = exclude
    ? `&& count((categories[]->slug.current)[@ in $exclude]) == 0`
    : '';

  const results = await getClient(null).fetch(
    `*[_type == "division" && slug.current == $division][0] {
      ...,
      "posts": *[_type == "post" && references(^._id) ${exclusionQuery} && publishedAt < $today] | order(publishedAt desc) [$rangeFrom..$rangeTo] {
        ${postFieldsCard}
      }
    }`,
    { division, rangeFrom, rangeTo, today, exclude }
  );

  return results;
}

export async function getAllCategoriesTotal(preview) {
  const results = await getClient(preview).fetch(`*[_type == "category"] {
      ...,
    }`);

  return results;
}

export async function getCurrentAndPreviousCyphers(preview) {
  const curClient = getClient(preview);

  const [current, previous] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "cypher" && announcementFields.announcedAt != null] | order(announcementFields.announcedAt desc) [0] {
              ...,
            } `
      )
      .then((res) => res),
    curClient.fetch(
      `*[_type == "cypher" && publishedFields.publishedAt != null] {
            ...,
            }  | order(publishedFields.publishedAt desc)`
    ),
  ]);

  return { current: current || null, previous };
}

export async function getLatestAnouncedCypher(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "cypher" && announcementFields.announcedAt != null] | order(announcementFields.announcedAt desc) [0] {
      ...,
    }`);

  return results;
}

export async function getLatestPublishedCypher(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "cypher" && publishedFields.publishedAt != null] | order(publishedFields.publishedAt desc) [0] {
      ...,
    }`);

  return results;
}

export async function getTeamMembers(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "author"] | order(order asc){
      ${teamFields}
    }`);
  return results;
}

// export async function getCredits(preview) {
//   const results = await getClient(preview)
//     .fetch(`*[_type == "credits"] | order(order asc){
//       ...
//     }`);
//   return results;
// }

// export async function getCreditsItem(slug, preview) {
//   const results = await getClient(preview).fetch(
//     `*[_type == "credits" && slug.current == $slug] [0] {
//      ...,
//     }`,
//     { slug }
//   );
//   return results;
// }

export async function getTeamMemberAndPosts(slug, preview) {
  const today = dateTodayISO();

  const results = await getClient(preview).fetch(
    `*[_type == "author" && slug.current == $slug] [0] {
      ${teamFields}
      "posts": *[_type == "post" && references(^._id) && publishedAt < $today] | order(publishedAt desc) [0..23] {
        ${postFieldsCard}
      }
    }`,
    { slug, today }
  );
  return results;
}

export async function getTags(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "refTag"] | order(order asc){
      ${tagFields}
    }`);
  return results;
}

export async function getTagAndPosts(slug, preview) {
  const today = dateTodayISO();

  const results = await getClient(preview).fetch(
    `*[_type == "refTag" && slug.current == $slug] [0] {
      ${tagFields}
      "posts": *[references(^._id) && publishedAt < $today] | order(publishedAt desc) [0..23] {
        ${postFieldsCard}
      }
    }`,
    { slug, today }
  );
  return results;
}

export async function getAllProducts(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "storeItem"] | order(publishedAt desc) {
      ${productFields}
    }`);
  return results;
}

export async function getAllProductsTotal(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "storeItem"] | order(publishedAt desc) {
      ${productFields}
    }`);
  return results;
}

export async function getProduct(slug, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "storeItem" && slug.current == $slug] | order(publishedAt desc) [0] {
      ${productFields}
    }`,
    { slug }
  );
  return results;
}

export async function getPost(slug, preview) {
  const curClient = getClient(preview);
  const today = dateTodayISO();
  let post;

  if (preview) {
    post = await getClient(preview).fetch(
      `*[_type == "post" && slug.current == $slug] | order(publishedAt desc) [0] {
     ${postFields}
     content,
   }`,
      { slug }
    );
  } else {
    post = await getClient(preview).fetch(
      `*[_type == "post" && slug.current == $slug && publishedAt < $today] | order(publishedAt desc) [0] {
     ${postFields}
     content,
   }`,
      { slug, today }
    );
  }

  return post;
}

export async function getMorePosts(slug, preview) {
  const curClient = getClient(preview);
  const today = dateTodayISO();

  const morePosts = await getClient(preview).fetch(
    `*[_type == "post" && slug.current != $slug] | order(publishedAt desc){
      ${postFieldsCard}
      content,
    }[0...4]`,
    { slug }
  );

  return morePosts;
}

export async function getPreviewProductBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "product" && slug.current == $slug] {
      ${productFields}
      content,
    }`,
    { slug }
  );
  return data[0];
}

export async function getProductAndMore(slug, preview) {
  const curClient = getClient(preview);
  const [product, moreProducts] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "product" && slug.current == $slug] | order(publishedAt desc) {
        ${productFields}
        content,
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "product" && slug.current != $slug] | order(publishedAt desc){
        ${productFields}
        content,
      }[0...4]`,
      { slug }
    ),
  ]);

  return { product, moreProducts };
}

export async function getLatestMix(preview) {
  const results = await getClient(preview).fetch(`*[_type == "mix"] [0] {
      ...,
    }`);

  return results;
}

export async function getMixes(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "mix"] | order(publishedAt desc) [0..15] {
      ...,
    }`);
  return results;
}

export async function getLatestDominionItem(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "dominionItem"] | order(activeFrom desc) [0] {
      ...,
    }`
  );

  return results;
}

export async function getLatestNewsletterGeneral(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "newsletterGeneral"] | order(activeFrom desc) [0] {
      ...,
    }`
  );

  return results;
}

export async function getDominionItemsSinceDate(sinceStartOfMonth, preview) {
  const curClient = getClient(preview);
  const today = dateTodayYyyyMmDd();

  const [results, welcome] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "dominionItem" && slug.current != "welcome-to-the-dominion" && activeFrom >= $sinceStartOfMonth && activeFrom <= $today && showInProfile] | order(activeFrom asc) {
        ...,
        "slug": slug.current,
      }`,
        { sinceStartOfMonth, today }
      )
      .then((res) => res),
    curClient.fetch(
      `*[_type == "dominionItem" && slug.current == "welcome-to-the-dominion" && showInProfile] [0] {
        ...,
        "slug": slug.current,
      }`
    ),
  ]);

  results.unshift(welcome);
  return results;
}

export async function getSmartLink(slug, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "smartLink" && slug.current == $slug] | order(activeFrom desc) [0] {
      title,
      slug,
      'items': items[] {
        ...,
        'documentInternal': documentInternal {
          'document': *[_id == ^._ref] [0] {
            ...,
          },
        },
      },
    }`,
    { slug }
  );
  return results;
}

export async function getSmartLinksTotal(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "smartLink" && slug.current] | order(activeFrom desc) {
      ...,
    }`
  );
  return results;
}

export async function getDominionPipeline(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "dominionPipeline"] [0] {
      ...,
    }`
  );
  return results;
}

export async function getDominionUsers(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "user" && publicProfile && isDominion] {
      name,
      handle,
      'avatar': avatar.asset->url,
    }`
  );
  return results;
}

export async function getAllOfferings(sinceStartOfMonth, showAll, preview) {
  const today = dateTodayYyyyMmDd();
  const show = showAll ? 250 : 8;

  const results = await getClient(preview).fetch(
    `*[_type == "offering" && publishedAt >= $sinceStartOfMonth && publishedAt <= $today] | order(publishedAt desc) [0..$show] {
      ...,
      'tracks': tracks[] {
        'track': *[_id == ^._ref] [0] {
          ...,
          'image': image.asset->url,
          'file': file.asset->url,
        },
      }
    }`,
    { sinceStartOfMonth, today, show }
  );
  return results;
}

export async function getAllPacks(showAll, preview) {
  const show = showAll ? 250 : 8;

  const results = await getClient(preview).fetch(
    `*[_type == "pack"] | order(publishedAt desc) [0..$show] {
      ...,
      'folder': folder.asset->url,
    }`,
    { show }
  );
  return results;
}

export async function getAllPrints(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "print"] | order(publishedAt desc) [0..99] {
      ...,
      'file': file.asset->url,
    }`
  );
  return results;
}

export async function getHomePage() {
  const data = await client.fetch(`*[_type == "homePage"] [0] {
    ...,
    'heroImage': heroImage.asset->url,
   }`);
  return data;
}
