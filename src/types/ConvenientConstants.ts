import { DataTokenType, HeaderFooterTokenType } from './TokenTypes';

// there are overlap between the HeaderFooterTokenType and DataTokenType, but we want to
// be explicit that we are considering/including both here.
export default {
  ...{
    [HeaderFooterTokenType.NEWLINE]: '\n',
    [HeaderFooterTokenType.NEWLINE_MICROSOFT]: '\r\n',
    [HeaderFooterTokenType.TAB]: '\t',
    [HeaderFooterTokenType.COMMA]: ',',
    [HeaderFooterTokenType.SPACE]: ' ',
  },
  ...{
    [DataTokenType.NEWLINE]: '\n',
    [DataTokenType.NEWLINE_MICROSOFT]: '\r\n',
    [DataTokenType.TAB]: '\t',
    [DataTokenType.COMMA]: ',',
    [DataTokenType.SPACE]: ' ',
  },
};
