export default function BulletList({ text }) {
  renderChildren = (child, i) => {
    if (child.marks) {
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

  if (text[0].text) {
    return (
      <>
        <li className="db  t-body  lh-copy  f6  black">
          {text.map((child, i) => this.renderChildren(child, i))}
        </li>
      </>
    );
  }
  return false;
}
