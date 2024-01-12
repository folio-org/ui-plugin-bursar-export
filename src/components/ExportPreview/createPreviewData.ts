import * as faker from '@ngneat/falso';
import {
  DataToken,
  DataTokenType,
  ItemAttribute,
  UserAttribute,
} from '../../types/TokenTypes';
import { guardNumberPositive } from '../../utils/guardNumber';
import { applyDecimalFormat, applyLengthControl, formatDate } from './utils';

export function formatFeeFineToken(
  attribute: 'FEE_FINE_TYPE_ID' | 'FEE_FINE_TYPE_NAME'
): string {
  if (attribute === 'FEE_FINE_TYPE_ID') {
    return faker.randUuid();
  } else {
    return `${faker.randWord()} ${faker.randWord()}`;
  }
}

export function formatItemToken(attribute: ItemAttribute) {
  switch (attribute) {
    case 'BARCODE':
      return faker.randPassword({ size: 11 });
    case 'NAME':
      return faker.randTextRange({ min: 10, max: 50 });
    case 'MATERIAL_TYPE':
      return faker.randWord();
    default:
      return faker.randUuid();
  }
}

export function formatUserToken(attribute: UserAttribute) {
  switch (attribute) {
    case 'BARCODE':
    case 'EXTERNAL_SYSTEM_ID':
      return faker.randPassword({ size: 10 });
    case 'USERNAME':
      return faker.randUserName();
    case 'FIRST_NAME':
      return faker.randFirstName();
    case 'MIDDLE_NAME':
      return faker.randLastName();
    case 'LAST_NAME':
      return faker.randLastName();
    default:
      return faker.randUuid();
  }
}

export function tokenToNode(
  dataToken: DataToken,
  amount: number,
  count: number
): string {
  switch (dataToken.type) {
    case DataTokenType.ARBITRARY_TEXT:
      return dataToken.text ?? '';
    case DataTokenType.NEWLINE:
      return '\n';
    case DataTokenType.NEWLINE_MICROSOFT:
      return '\r\n';
    case DataTokenType.TAB:
      return '\t';
    case DataTokenType.COMMA:
      return ',';
    case DataTokenType.SPACE:
      return ' '.repeat(guardNumberPositive(dataToken.repeat));

    case DataTokenType.CURRENT_DATE:
      return applyLengthControl(
        formatDate(dataToken.format, new Date()).toString(),
        dataToken.lengthControl
      );

    case DataTokenType.AGGREGATE_TOTAL:
    case DataTokenType.ACCOUNT_AMOUNT:
      return applyLengthControl(
        applyDecimalFormat(amount, dataToken.decimal),
        dataToken.lengthControl
      );

    case DataTokenType.ACCOUNT_DATE:
      return applyLengthControl(
        formatDate(dataToken.format, faker.randPastDate()).toString(),
        dataToken.lengthControl
      );

    case DataTokenType.FEE_FINE_TYPE:
      return applyLengthControl(
        formatFeeFineToken(dataToken.feeFineAttribute),
        dataToken.lengthControl
      );

    case DataTokenType.ITEM_INFO:
      return applyLengthControl(
        formatItemToken(dataToken.itemAttribute),
        dataToken.lengthControl
      );

    case DataTokenType.USER_DATA:
      return applyLengthControl(
        formatUserToken(dataToken.userAttribute),
        dataToken.lengthControl
      );

    case DataTokenType.CONSTANT_CONDITIONAL:
      return faker.rand([
        ...(dataToken.conditions ?? [])
          .map((cond) => cond.value)
          .filter((v) => v),
        dataToken.else,
      ]);

    case DataTokenType.AGGREGATE_COUNT:
      return applyLengthControl(count.toString(), dataToken.lengthControl);

    default:
      return '';
  }
}

export function generateEntry(
  tokens: DataToken[],
  isAggregate: boolean
): { elements: string[]; amount: number; count: number } {
  const amount = faker.randFloat({ min: 5, max: 100, precision: 0.01 });
  const count = isAggregate ? faker.randNumber({ min: 1, max: 10 }) : 1;

  return {
    elements: tokens.map((token) => tokenToNode(token, amount, count)),
    amount,
    count,
  };
}

export default function createPreviewData(
  tokens: DataToken[],
  isAggregate: boolean
): { dataPreview: string; totalAmount: number; totalCount: number } {
  const numEntries = faker.randNumber({ min: 3, max: 12 });

  const results: string[] = [];
  let totalAmount = 0;
  let totalCount = 0;
  for (let i = 0; i < numEntries; i++) {
    const { elements, amount, count } = generateEntry(tokens, isAggregate);
    results.push(...elements);
    totalAmount += amount;
    totalCount += count;
  }

  return {
    dataPreview: results.join(''),
    totalAmount,
    totalCount,
  };
}
