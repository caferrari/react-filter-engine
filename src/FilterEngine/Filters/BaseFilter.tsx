import * as React from 'react';
import ReactDOM from 'react-dom';

import { filterContexts } from '..';
import { FilterContext } from '../FilterContext';

export interface IFilterState {
  context: FilterContext;
  value: string;
}

export interface IFilterProps {
  attribute: string;
  label: string;
}

export default abstract class BaseFilter<P extends IFilterProps, S extends IFilterState> extends React.Component<P, S> {

  constructor(props: P) {
    super(props);

    (this.state as any) = {
      value: '',
      context: null
    };
  }

  public setValue(value: string) {
    if (value != this.state.value) {
      this.setState({ value });
      this.state.context.setValue(this.props.attribute, value);
    }
  }

  public componentDidMount(): void {

    const id = this.findContextId(ReactDOM.findDOMNode(this).parentElement);

    this.setState({
      context: filterContexts[id]
    });

  }

  public componentWillUnmount() {
    this.setValue(null);
  }

  private findContextId(element: HTMLElement): number {

    if (!element) {
      throw new Error('FilterEngine element not found');
    }

    if (element.className && element.className.includes('filter-engine-container')) {
      return Number(element.dataset.id);
    }

    return this.findContextId(element.parentElement);
  }

}