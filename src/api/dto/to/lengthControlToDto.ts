import { LengthControl } from '../../../types';
import { guardNumberPositive } from '../../../utils/guardNumber';
import { BursarExportTokenLengthControl } from '../dto-types';

export default function lengthControlToDto(
  lengthControl: LengthControl | undefined,
): BursarExportTokenLengthControl | undefined {
  if (lengthControl === undefined) {
    return undefined;
  }

  return {
    character: lengthControl.character?.substring(0, 1) ?? '',
    length: guardNumberPositive(lengthControl.length),
    direction: lengthControl.direction,
    truncate: lengthControl.truncate,
  };
}
