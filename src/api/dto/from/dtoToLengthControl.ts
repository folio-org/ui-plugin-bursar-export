import { LengthControl } from '../../../types';
import { BursarExportTokenLengthControl } from '../dto-types';

// inverse of ../to/lengthControlToDto
export default function dtoToLengthControl(
  lengthControl: BursarExportTokenLengthControl | undefined,
): LengthControl | undefined {
  if (lengthControl === undefined) {
    return undefined;
  }

  return {
    character: lengthControl.character,
    length: lengthControl.length.toString(),
    direction: lengthControl.direction,
    truncate: lengthControl.truncate,
  };
}
