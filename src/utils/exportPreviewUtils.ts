import { DateFormatType, LengthControl } from '../types';

export function formatDate(format: DateFormatType, date: Date): string | number {
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

    // garbage in = garbage out, so we don't care what the output is in default
    case DateFormatType.WEEK_OF_YEAR_ISO: {
      const janFirst = new Date(date.getFullYear(), 0, 1);
      const dayOfYear = (date.getTime() - janFirst.getTime()) / 86400000 + 1;
      return Math.ceil(dayOfYear / 7);
    }

    case DateFormatType.DAY_OF_YEAR: {
      const janFirst = new Date(date.getFullYear(), 0, 1);
      return Math.ceil((date.getTime() - janFirst.getTime()) / 86400000);
    }

    case DateFormatType.YYYYMMDD:
      return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

    case DateFormatType.YYYY_MM_DD:
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    case DateFormatType.MMDDYYYY:
      return `${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${date.getFullYear()}`;

    case DateFormatType.DDMMYYYY:
      return `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}${date.getFullYear()}`;

    default:
      return '????';
  }
}

export function applyLengthControl(value: string, lengthControl?: LengthControl): string {
  if (lengthControl === undefined || lengthControl.character?.length !== 1) {
    return value;
  }

  const desiredLength = parseInt(lengthControl.length, 10);
  if (Number.isNaN(desiredLength)) {
    return value;
  }

  if (value.length < desiredLength) {
    if (lengthControl.direction === 'FRONT') {
      return lengthControl.character.repeat(desiredLength - value.length) + value;
    } else {
      return value + lengthControl.character.repeat(desiredLength - value.length);
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
