import React from 'react';
import { Titled } from 'react-titled';

interface TitleManagerProps {
  children: React.ReactNode;
  prefix?: string;
  page?: string;
  record?: string;
}

class TitleManager extends React.Component<TitleManagerProps> {
  static defaultProps: Partial<TitleManagerProps> = { prefix: '' };

  renderTitle = (currentTitle: string | undefined) => {
    const { prefix = '', page, record } = this.props;

    if (typeof currentTitle !== 'string') return '';

    const tokens = currentTitle.split(' - ');

    if (tokens.length === 2) {
      tokens[1] = '';
    }

    if (page) tokens[0] = page;
    if (record) tokens[1] = record;

    return prefix + tokens.filter(t => t).join(' - ');
  };

  render() {
    return (
      <Titled title={this.renderTitle}>
        {this.props.children}
      </Titled>
    );
  }
}

export default TitleManager;
