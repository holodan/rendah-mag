import { ToastContainer } from 'react-toastify';
import deviceSize from '~/lib/device-size';
import LazyLoad from 'react-lazyload';

import Alert from './alert';
import Footer from './footer';
import Meta from './meta';
import Header from './header';
import CookieBanner from './cookie-banner';

export default function Layout({
  title,
  navOffset,
  navOnWhite,
  hasNav,
  hasFooter,
  meta,
  preview,
  children,
}) {
  // set device type in context API
  deviceSize();

  let navOffsetType;

  switch (navOffset) {
    case 'top':
      navOffsetType = 'pt5  pt6-md';
      break;
    case 'center':
      navOffsetType = 'flex  align-center';
      break;
    default:
      navOffsetType = '';
      break;
  }

  const hideNav = typeof hasNav !== 'undefined' && !hasNav;
  const hideFooter = typeof hasFooter !== 'undefined' && !hasFooter;

  return (
    <>
      <Meta {...meta} />
      <ToastContainer />
      {preview && <Alert preview={preview} />}
      {!preview && !hideNav && <Header navOnWhite={navOnWhite} meta={meta} />}
      <main className={`page ${navOffsetType}`}>{children}</main>
      {!preview && title === 'login' && <CookieBanner />}
      {!hideFooter && (
        <LazyLoad once offset={100} height={300}>
          <Footer />
        </LazyLoad>
      )}
    </>
  );
}
