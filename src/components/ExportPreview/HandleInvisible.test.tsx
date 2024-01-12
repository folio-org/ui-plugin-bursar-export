import React from 'react';
import HandleInvisible, { splitAndInsert } from './HandleInvisible';
import { render } from '@testing-library/react';

const TEST_SEARCH = 'REPLACE_ME';
const TEST_REPLACEMENT = 'REPLACEMENT!';

test.each([
  [<h1 />, [<h1 />]],
  [undefined, [undefined]],
  ['unrelated', ['unrelated']],
  ['REPLACE_ME', ['REPLACEMENT!']],
  ['REPLACE_ME REPLACE_ME', ['REPLACEMENT!', ' ', 'REPLACEMENT!']],
  ['abc REPLACE_ME def', ['abc ', 'REPLACEMENT!', ' def']],
  [
    'abc REPLACE_ME def REPLACE_ME',
    ['abc ', 'REPLACEMENT!', ' def ', 'REPLACEMENT!'],
  ],
])('splitAndInsert(%s) = %s', (haystack, expected) =>
  expect(splitAndInsert(haystack, TEST_SEARCH, TEST_REPLACEMENT)).toEqual(
    expected
  )
);

test.each([
  ['abcdef', 'abcdef'],
  ['abc\ndef', 'abc<br>def'],
  ['abc\r\ndef', 'abc<br>def'],
  ['a b\tc\rd\ne', 'a b\tcd<br>e'],
])(
  'Rendering with text=%s without showInvisible gives inner HTML=%s',
  (text, innerHTML) => {
    const { container } = render(
      <HandleInvisible text={text} showInvisible={false} />
    );
    expect(
      Array.from(container.childNodes)
        .map((el) => (el as HTMLElement).innerHTML)
        .join('')
    ).toEqual(innerHTML);
  }
);

test.each([
  ['abcdef', 'abcdef'],
  ['abc\ndef', 'abc\\ndef'],
  ['abc\r\ndef', 'abc\\r\\ndef'],
  ['a b\tc\rd\ne', 'a•b\\tc\\rd\\ne'],
])(
  'Rendering with text=%s and showInvisible gives inner text=%s',
  (text, textContent) => {
    const { container } = render(<HandleInvisible text={text} showInvisible />);
    expect(container).toHaveTextContent(textContent);
  }
);
