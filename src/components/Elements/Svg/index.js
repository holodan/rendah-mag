/* @flow */

import React from 'react';
import type { Element } from 'react';

type Props = { text: String };

export const Fb = (): Element<'div'> => (
  <div data-svg="fb">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 10h-2v2h2v6h3v-6h1.82l.18-2h-2v-.833c0-.478.096-.667.558-.667h1.442v-2.5h-2.404c-1.798 0-2.596.792-2.596 2.308v1.692z"
      />
    </svg>
  </div>
);

export const Tw = (): Element<'div'> => (
  <div data-svg="tw">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.5 8.778c-.441.196-.916.328-1.414.388.509-.305.898-.787 1.083-1.362-.476.282-1.003.487-1.564.597-.448-.479-1.089-.778-1.796-.778-1.59 0-2.758 1.483-2.399 3.023-2.045-.103-3.86-1.083-5.074-2.572-.645 1.106-.334 2.554.762 3.287-.403-.013-.782-.124-1.114-.308-.027 1.14.791 2.207 1.975 2.445-.346.094-.726.116-1.112.042.313.978 1.224 1.689 2.3 1.709-1.037.812-2.34 1.175-3.647 1.021 1.09.699 2.383 1.106 3.773 1.106 4.572
        0 7.154-3.861 6.998-7.324.482-.346.899-.78 1.229-1.274z"
      />
    </svg>
  </div>
);

export const Insta = (): Element<'div'> => (
  <div data-svg="insta">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.008 14.408c1.299 0 2.354-1.056 2.354-2.354 0-.704-.312-1.337-.803-1.769-.174-.151-.368-.278-.58-.374-.297-.135-.625-.21-.971-.21-.347 0-.675.075-.971.21-.211.096-.406.223-.578.374-.492.432-.805 1.064-.805 1.769.001 1.298 1.057 2.354 2.354 2.354zm.008-4.093c.961 0 1.738.778 1.738 1.739 0 .961-.777 1.74-1.738 1.74s-1.738-.779-1.738-1.74c0-.96.777-1.739 1.738-1.739zm2.611.185h3.389v5.139c0 1.304-1.058 2.361-2.361 2.361h-7.246c-1.305 0-2.393-1.057-2.393-2.361v-5.139h3.373c-.271.457-.436.985-.436 1.554 0 1.688 1.367 3.055 3.055 3.055 1.687 0 3.055-1.368 3.055-3.055 0-.569-.164-1.097-.436-1.554zm1.028-4.5h-6.139v2.5h-.5v-2.5h-.5v2.5h-.5v-2.461c-.174.028-.341.071-.5.134v2.327h-.5v-2.051c-.602.428-1 1.123-1
        1.912v1.639h3.736c.584-.642 1.399-1 2.256-1 .86 0 1.675.362 2.255 1h3.753v-1.64c0-1.303-1.058-2.36-2.361-2.36zm1.361 2.632c0 .203-.166.368-.373.368h-1.255c-.205 0-.372-.165-.372-.368v-1.265c0-.202.167-.367.372-.367h1.255c.207 0 .373.165.373.367v1.265z"
      />
    </svg>
  </div>
);

export const Sc = (): Element<'div'> => (
  <div data-svg="sc">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.5 8.778c-.441.196-.916.328-1.414.388.509-.305.898-.787 1.083-1.362-.476.282-1.003.487-1.564.597-.448-.479-1.089-.778-1.796-.778-1.59 0-2.758 1.483-2.399 3.023-2.045-.103-3.86-1.083-5.074-2.572-.645 1.106-.334 2.554.762 3.287-.403-.013-.782-.124-1.114-.308-.027 1.14.791 2.207 1.975 2.445-.346.094-.726.116-1.112.042.313.978
        1.224 1.689 2.3 1.709-1.037.812-2.34 1.175-3.647 1.021 1.09.699 2.383 1.106 3.773 1.106 4.572 0 7.154-3.861 6.998-7.324.482-.346.899-.78 1.229-1.274z"
      />
    </svg>
  </div>
);

export const Logo = (): Element<'div'> => (
  <div data-svg="Logo">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 710 710">
      <g>
        <circle cx="355.5" cy="355.5" r="311.5" />
      </g>
      <g>
        <path className="st0" d="M398.4,212.5h-20.8c3.4-0.3,6.9-0.5,10.4-0.5S395,212.2,398.4,212.5z" />
        <path d="M388,212c-3.5,0-7,0.2-10.4,0.5h20.8C395,212.2,391.5,212,388,212L388,212z" />
      </g>
      <g>
        <line className="st1" x1="394" y1="284.5" x2="382" y2="284.5" />
        <line className="st0" x1="394" y1="284.5" x2="382" y2="284.5" />
      </g>
      <g>
        <line className="st1" x1="394" y1="355.5" x2="382" y2="355.5" />
        <line className="st0" x1="394" y1="355.5" x2="382" y2="355.5" />
      </g>
      <path
        className="st2"
        d="M496,320c0,12.4-2.1,24.4-6,35.5c-10.7,30.7-34.8,55.1-65.4,66.1l-66.1-66.1H382c2,0.3,4,0.5,6,0.5
        s4.1-0.2,6-0.5c17-2.9,30-17.7,30-35.5c0-17.8-13-32.6-30-35.5c-2-0.3-4-0.5-6-0.5s-4.1,0.2-6,0.5h-94.5l-72-72h182.9
        c42.7,4.1,78,32.9,91.7,72C493.9,295.6,496,307.6,496,320z"
      />
      <polygon className="st2" points="460.7,499.5 361.1,499.5 217.1,355.5 317.8,355.5 " />
      <rect x="242" y="283.5" width="146" height="12" />
      <rect x="212" y="344.5" width="177" height="12" />
      <polygon points="334,241.7 237.1,241.7 228,231.5 323.9,231.5 " />
      <g>
        <circle cx="355.5" cy="355.5" r="311.5" />
      </g>
      <g>
        <path className="st0" d="M398.4,212.5h-20.8c3.4-0.3,6.9-0.5,10.4-0.5S395,212.2,398.4,212.5z" />
        <path d="M388,212c-3.5,0-7,0.2-10.4,0.5h20.8C395,212.2,391.5,212,388,212L388,212z" />
      </g>
      <g>
        <line className="st1" x1="394" y1="284.5" x2="382" y2="284.5" />
        <line className="st0" x1="394" y1="284.5" x2="382" y2="284.5" />
      </g>
      <g>
        <line className="st1" x1="394" y1="355.5" x2="382" y2="355.5" />
        <line className="st0" x1="394" y1="355.5" x2="382" y2="355.5" />
      </g>
      <path
        className="st2"
        d="M496,320c0,12.4-2.1,24.4-6,35.5c-10.7,30.7-34.8,55.1-65.4,66.1l-66.1-66.1H382c2,0.3,4,0.5,6,0.5
        s4.1-0.2,6-0.5c17-2.9,30-17.7,30-35.5c0-17.8-13-32.6-30-35.5c-2-0.3-4-0.5-6-0.5s-4.1,0.2-6,0.5h-94.5l-72-72h182.9
        c42.7,4.1,78,32.9,91.7,72C493.9,295.6,496,307.6,496,320z"
      />
      <polygon className="st2" points="460.7,499.5 361.1,499.5 217.1,355.5 317.8,355.5 " />
      <rect x="242" y="283.5" width="146" height="12" />
      <rect x="212" y="344.5" width="177" height="12" />
    </svg>
  </div>
);

export const ArrowRight = (): Element<'div'> => (
  <div data-svg="ArrowRight">
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24"><path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" /></svg>
  </div>
);

export const CaretDown = (): Element<'div'> => (
  <div data-svg="CaretDown">
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" /></svg>
  </div>
);

export const NULL = ({ text }: Props): Element<'div'> => (
  <div>{text}</div>
);
