import find from 'lodash/find';

export default function Paragraph({ text, markDefs }) {
  const renderChildren = (child, mark, i) => {
    if (child.marks) {
      // If has inline URL link
      if (mark.length) {
        const currentMark = find(mark, { _key: child.marks[0] });

        if (currentMark && currentMark.url) {
          return (
            <a
              key={i}
              rel="noopener noreferrer"
              target="_blank"
              href={currentMark.url}
              className="di  underline  rendah-red-dark"
            >
              {child.text}
            </a>
          );
        }
      }

      if (child.marks.includes('stong') && child.marks.includes('em')) {
        return (
          <strong key={i} className="di">
            <em>{child.text}</em>
          </strong>
        );
      }
      if (child.marks.includes('strong')) {
        return (
          <strong key={i} className="di">
            {child.text}
          </strong>
        );
      }
      if (child.marks.includes('em')) {
        return (
          <em key={i} className="di">
            {child.text}
          </em>
        );
      }
    }

    return child.text;
  };

  if (text[0]?.text?.trim()) {
    return (
      <>
        <p className="db  t-body  lh-copy  f6  dark-grey  taj  pv3">
          {text.map((child, i) => renderChildren(child, markDefs, i))}
        </p>
      </>
    );
  }
  return false;
}
