import { DataToken, DataTokenType, ItemAttribute, UserAttribute } from '../../types/TokenTypes';
import { guardNumberPositive } from '../../utils/guardNumber';
import { applyDecimalFormat, applyLengthControl, formatDate } from './utils';

async function lazyLoadFaker() {
  const module = await import('@ngneat/falso');
  return module;
}

export async function formatFeeFineToken(attribute: 'FEE_FINE_TYPE_ID' | 'FEE_FINE_TYPE_NAME'): Promise<string> {
  const faker = await lazyLoadFaker();
  if (attribute === 'FEE_FINE_TYPE_ID') {
    return faker.randUuid();
  } else {
    return `${faker.randWord()} ${faker.randWord()}`;
  }
}

export async function formatItemToken(attribute: ItemAttribute) {
  const faker = await lazyLoadFaker();
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

export async function formatUserToken(attribute: UserAttribute) {
  const faker = await lazyLoadFaker();
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

export async function tokenToString(dataToken: DataToken, amount: number, count: number): Promise<string> {
  const faker = await lazyLoadFaker();
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
      return applyLengthControl(formatDate(dataToken.format, new Date()).toString(), dataToken.lengthControl);

    case DataTokenType.AGGREGATE_TOTAL:
    case DataTokenType.ACCOUNT_AMOUNT:
      return applyLengthControl(applyDecimalFormat(amount, dataToken.decimal), dataToken.lengthControl);

    case DataTokenType.ACCOUNT_DATE:
      return applyLengthControl(formatDate(dataToken.format, faker.randPastDate()).toString(), dataToken.lengthControl);

    case DataTokenType.FEE_FINE_TYPE:
      return applyLengthControl(await formatFeeFineToken(dataToken.feeFineAttribute), dataToken.lengthControl);

    case DataTokenType.ITEM_INFO:
      return applyLengthControl(await formatItemToken(dataToken.itemAttribute), dataToken.lengthControl);

    case DataTokenType.USER_DATA:
      return applyLengthControl(await formatUserToken(dataToken.userAttribute), dataToken.lengthControl);

    case DataTokenType.CONSTANT_CONDITIONAL:
      return faker.rand([...(dataToken.conditions ?? []).map((cond) => cond.value).filter((v) => v), dataToken.else]);

    case DataTokenType.AGGREGATE_COUNT:
      return applyLengthControl(count.toString(), dataToken.lengthControl);

    default:
      return '';
  }
}

export async function generateEntry(
  tokens: DataToken[],
  isAggregate: boolean,
): Promise<{ elements: string[]; amount: number; count: number }> {
  const faker = await lazyLoadFaker();
  const amount = faker.randFloat({ min: 5, max: 100, precision: 0.01 });
  const count = isAggregate ? faker.randNumber({ min: 1, max: 10 }) : 1;

  const elements = await Promise.all(tokens.map((token) => tokenToString(token, amount, count)));

  return Promise.resolve({
    elements,
    amount,
    count,
  });
}

export default async function createPreviewData(
  tokens: DataToken[],
  isAggregate: boolean,
): Promise<{ dataPreview: string; totalAmount: number; totalCount: number }> {
  const faker = await lazyLoadFaker();
  const numEntries = faker.randNumber({ min: 3, max: 12 });

  const results: string[] = [];
  let totalAmount = 0;
  let totalCount = 0;
  for (let i = 0; i < numEntries; i++) {
    const { elements, amount, count } = await generateEntry(tokens, isAggregate);
    results.push(...elements);
    totalAmount += amount;
    totalCount += count;
  }

  return Promise.resolve({
    dataPreview: results.join(''),
    totalAmount,
    totalCount,
  });
}
