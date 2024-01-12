import React, { ReactNode } from 'react';

export function splitAndInsert(
  haystack: string | ReactNode,
  needle: string,
  replacement: ReactNode
): ReactNode[] {
  if (typeof haystack !== 'string') {
    return [haystack];
  }

  return haystack
    .split(needle)
    .flatMap((piece, index, array) => {
      if (index === array.length - 1) {
        return [piece];
      }

      return [piece, replacement];
    })
    .filter((piece) => piece !== '');
}

function Invisible({ children }: { children: ReactNode }) {
  return <span style={{ color: 'gray' }}>{children}</span>;
}

export default function HandleInvisible({
  text,
  showInvisible,
}: {
  text: string;
  showInvisible: boolean;
}) {
  let pieces: ReactNode[] = [text];

  // denote appropriately
  if (showInvisible) {
    pieces = pieces
      .flatMap((piece) =>
        splitAndInsert(piece, '\r', <Invisible>\r</Invisible>)
      )
      .flatMap((piece) =>
        splitAndInsert(
          piece,
          '\n',
          <>
            <Invisible>\n</Invisible>
            <br />
          </>
        )
      )
      .flatMap((piece) =>
        splitAndInsert(piece, '\t', <Invisible>\t</Invisible>)
      )
      .flatMap((piece) => splitAndInsert(piece, ' ', <Invisible>•</Invisible>));
  } else {
    pieces = pieces.flatMap((piece) => splitAndInsert(piece, '\n', <br />));
  }

  pieces = pieces.map((piece) => {
    if (typeof piece === 'string') {
      return piece.replaceAll('\n', '').replaceAll('\r', '');
    }
    return piece;
  });

  return (
    <>
      {pieces.map((piece, i) => (
        <span key={i}>{piece}</span>
      ))}
    </>
  );
}
