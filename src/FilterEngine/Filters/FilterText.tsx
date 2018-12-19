import TextField from '@material-ui/core/TextField';
import * as React from 'react';
import { Fragment } from 'react';

import BaseFilter, { IFilterProps, IFilterState } from './BaseFilter';

interface IState extends IFilterState { }

export default class FilterText extends BaseFilter<IFilterProps, IState> {

  constructor(props: IFilterProps) {
    super(props);
  }

  public handleChange = (event: any) => {
    this.setValue(event.target.value);
  }

  public render() {
    return (
      <Fragment>
        <TextField
          id='standard-name'
          label={this.props.label}
          value={this.state.value}
          onChange={this.handleChange}
          margin='normal'
        />
      </Fragment>
    );
  }
}