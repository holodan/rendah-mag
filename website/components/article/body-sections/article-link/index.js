import Button from '~/components/elements/button';

export default function ArticleLink({ text, url }) {
  return (
    <div className="flex  justify-center  pv3  tac">
      <Button
        /* Options */
        type="primary"
        size="small"
        text={text}
        color="black"
        fluid={false}
        icon={null}
        iconFloat={null}
        inverted={false}
        loading={false}
        disabled={false}
        skeleton={false}
        onClick={null}
        /* Children */
        withLinkProps={{
          type: 'external',
          href: url,
          target: '_blank',
          routerLink: null,
          routerLinkProps: null
        }}
      />
    </div>
  );
}
