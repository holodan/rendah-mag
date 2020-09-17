import Link from 'next/link';
import { Parallax } from 'react-scroll-parallax';

import { Heading, Button } from 'next-pattern-library';

import Container from '../container';
import SubscribeForm from '~/components/subscribe-form';

export default function Footer() {
  return (
    <>
      {
        // <SubscribeForm />
      }
      <footer className="footer  pv5">
        <Parallax className="z1" y={['40px', '-40px']} tagOuter="figure">
          <Container>
            <div className="flex  flex-wrap">
              <div className="col-24  col-12-md">
                <div className="pb3">
                  <Heading
                    /* Options */
                    htmlEntity="h3"
                    text={`Rendah Mag ${new Date().getFullYear()}`}
                    color="white"
                    size="large"
                    truncate={null}
                    reveal={null}
                    /* Children */
                    withLinkProps={null}
                  />
                </div>

                <ul className="pb3">
                  <li className="db  pb3">
                    <Button
                      /* Options */
                      type="secondary"
                      size="small"
                      text="Privacy Policy"
                      color="white"
                      fluid={false}
                      icon={null}
                      iconFloat={null}
                      inverted
                      loading={false}
                      disabled={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={{
                        type: 'next',
                        href: '/privacy-policy',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: null,
                      }}
                    />
                  </li>
                  <li className="db  pb3">
                    <Button
                      /* Options */
                      type="secondary"
                      size="small"
                      text="Return Policy"
                      color="white"
                      fluid={false}
                      icon={null}
                      iconFloat={null}
                      inverted
                      loading={false}
                      disabled={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={{
                        type: 'next',
                        href: '/return-policy',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: null,
                      }}
                    />
                  </li>
                  <li className="db  pb3">
                    <Button
                      /* Options */
                      type="secondary"
                      size="small"
                      text="Terms & Conditions"
                      color="white"
                      fluid={false}
                      icon={null}
                      iconFloat={null}
                      inverted
                      loading={false}
                      disabled={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={{
                        type: 'next',
                        href: '/terms-conditions',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: null,
                      }}
                    />
                  </li>
                  <li className="db  pb3">
                    <Button
                      /* Options */
                      type="secondary"
                      size="small"
                      text="info@rendahmag.com"
                      color="white"
                      fluid={false}
                      icon={null}
                      iconFloat={null}
                      inverted
                      loading={false}
                      disabled={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={{
                        type: 'external',
                        href: 'mailto:info@rendahmag.com',
                        target: '_blank',
                        routerLink: null,
                        routerLinkProps: null,
                      }}
                    />
                  </li>
                </ul>
              </div>
              <div className="col-24  col-12-md"></div>
            </div>
          </Container>
        </Parallax>
      </footer>
    </>
  );
}
