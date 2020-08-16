export default function SocialLinks() {
  const { article } = this.props;

  if (article.socialHandles) {
    let soundcloud = null;
    let facebook = null;
    let twitter = null;
    let instagram = null;

    if (article.socialHandles.soundcloud) {
      soundcloud = [];
      article.socialHandles.soundcloud.split(/\s*,\s*/).forEach((e) => {
        soundcloud.push(
          <a
            className="db  pv2  link  f6  black  t-body"
            title="soundcloud"
            href={`https://soundcloud.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            - soundcloud/{e}
          </a>
        );
      });
    }
    if (article.socialHandles.facebook) {
      facebook = [];
      article.socialHandles.facebook.split(/\s*,\s*/).forEach((e) => {
        facebook.push(
          <a
            className="db  pv2  link  f6  black  t-body"
            title="facebook"
            href={`https://facebook.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            - facebook/{e}
          </a>
        );
      });
    }
    if (article.socialHandles.twitter) {
      twitter = [];
      article.socialHandles.twitter.split(/\s*,\s*/).forEach((e) => {
        twitter.push(
          <a
            className="db  pv2  link  f6  black  t-body"
            title="twitter"
            href={`https://twitter.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            - twitter/{e}
          </a>
        );
      });
    }
    if (article.socialHandles.instagram) {
      instagram = [];
      article.socialHandles.instagram.split(/\s*,\s*/).forEach((e) => {
        instagram.push(
          <a
            className="db  pv2  link  f6  black  t-body"
            title="instagram"
            href={`https://instagram.com/${e}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            - instagram/{e}
          </a>
        );
      });
    }

    return (
      <div className="pt3  ph3  bt  bc-grey  mt3">
        {soundcloud}
        {facebook}
        {twitter}
        {instagram}
      </div>
    );
  }

  return false;
}
