import './App.css';

import FilterEngine from 'FilterEngine';
import * as React from 'react';

import FilterText from './FilterEngine/Filters/FilterText';

interface IState {
  data: any;
}

class App extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      data: null
    };
  }

  onChange = (data: any) => {
    this.setState({ data });
  }

  public render() {

    return (
      <div className='App'>
        <FilterEngine onChange={this.onChange}>
          <FilterText label='Name' attribute='name' />
          <FilterText label='City' attribute='city' />
          <p>
            <FilterText label='Street' attribute='street' />
          </p>
          <p>
            <FilterText label='Email' attribute='email' />
          </p>
        </FilterEngine>

        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
