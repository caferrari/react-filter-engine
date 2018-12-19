import { Subscription } from 'indefinite-observable';
import * as React from 'react';

import { FilterContext, IAttributeData } from './FilterContext';

export const filterContexts: {
  [key: string]: FilterContext,
} = {};

let ids = 0;

interface IState {
  id: number;
}

interface IProps {
  onChange?: (data: IAttributeData) => void;
}

export default class FilterEngine extends React.Component<IProps, IState> {

  private subscription: Subscription;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {

    const id = ++ids;
    filterContexts[id] = new FilterContext;

    this.setState({ id });

    this.subscription = filterContexts[id]
      .getSubject()
      .subscribe(value => {
        this.props.onChange && this.props.onChange(value);
      });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  public render(): React.ReactNode {

    if (!this.state || !this.state.id) {
      return null;
    }

    return (
      <div data-id={this.state.id} className='filter-engine-container'>
        {this.props.children}
      </div>
    );
  }
}