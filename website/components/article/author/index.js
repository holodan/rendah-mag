import { Heading, Copy, Label, Image } from 'next-pattern-library';

import { imageBuilder } from '../../../lib/sanity/requests';

export default function Author({ siteConfig, author }) {
  const { posts } = author;

  console.log('author', author);
  return (
    <div className="flex  flex-wrap  pb5">
      <div className="col-24  col-8-md  ph2  pb3">
        <div className="shadow2">
          <Image
            /* Options */
            src={imageBuilder.image(author.image).height(500).width(500).url()}
            placeholder={imageBuilder
              .image(author.image)
              .height(25)
              .width(25)
              .url()}
            alt={author.title}
            figcaption={null}
            height={150}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
      </div>
      <div className="col-12  ph3-md">
        <div className="db  ph2  pb2">
          <Heading
            /* Options */
            htmlEntity="h1"
            text={author.name}
            color="black"
            size="small"
            truncate={null}
            reveal={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="db  ph2  pb3">
          <Label
            /* Options */
            customClass="ph2"
            text={author.alias}
            color="white"
            backgroundColor="black"
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="db  ph2  pb3">
          <Copy
            /* Options */
            text={author.description}
            color="black"
            size="medium"
            truncate={null}
          />
        </div>
      </div>
    </div>
  );
}
