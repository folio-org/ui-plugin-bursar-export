import LengthControl from '../../types/LengthControl';
import { DateFormatType } from '../../types/TokenTypes';

export function formatDate(format: DateFormatType, date: Date): number {
  switch (format) {
    case DateFormatType.WEEK_YEAR_ISO:
    case DateFormatType.YEAR_LONG:
      return date.getFullYear();

    case DateFormatType.YEAR_SHORT:
      return date.getFullYear() % 100;

    case DateFormatType.MONTH:
      return date.getMonth() + 1;

    case DateFormatType.DATE:
      return date.getDate();

    case DateFormatType.HOUR:
      return date.getHours();

    case DateFormatType.MINUTE:
      return date.getMinutes();

    case DateFormatType.SECOND:
      return date.getSeconds();

    case DateFormatType.QUARTER:
      return Math.floor(date.getMonth() / 3 + 1);

    case DateFormatType.WEEK_OF_YEAR_ISO:
    // garbage in = garbage out, so we don't care what the output is in default
    default:
      const janFirst = new Date(date.getFullYear(), 0, 1);
      const dayOfYear = (date.getTime() - janFirst.getTime()) / 86400000 + 1;
      return Math.ceil(dayOfYear / 7);
  }
}

export function applyLengthControl(
  value: string,
  lengthControl?: LengthControl
): string {
  if (lengthControl === undefined || lengthControl.character?.length !== 1) {
    return value;
  }

  const desiredLength = parseInt(lengthControl.length, 10);
  if (isNaN(desiredLength)) {
    return value;
  }

  if (value.length < desiredLength) {
    if (lengthControl.direction === 'FRONT') {
      return (
        lengthControl.character.repeat(desiredLength - value.length) + value
      );
    } else {
      return (
        value + lengthControl.character.repeat(desiredLength - value.length)
      );
    }
  } else if (lengthControl.truncate) {
    if (lengthControl.direction === 'FRONT') {
      return value.substring(value.length - desiredLength);
    } else {
      return value.substring(0, desiredLength);
    }
  } else {
    return value;
  }
}

export function applyDecimalFormat(value: number, decimal: boolean): string {
  if (!decimal) {
    return (value * 100).toFixed(0);
  } else {
    return value.toFixed(2);
  }
}
