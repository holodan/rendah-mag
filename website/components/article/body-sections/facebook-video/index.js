import { FacebookProvider, EmbeddedVideo } from 'react-facebook';
import LazyLoad from 'react-lazyload';

import { useApp } from '~/context-provider/app';

export default function FacebookVideo({ url }) {
  const app = useApp();
  console.log('url', url);
  return (
    <div className="tac  db  w-90  mla  mra">
      {
        <LazyLoad
          once
          offset={150}
          height={app.deviceType === 'mobile' ? 266 : 490}
        >
          <FacebookProvider appId="154881868603516">
            <EmbeddedVideo href={url} />
          </FacebookProvider>
        </LazyLoad>
      }
    </div>
  );
}
