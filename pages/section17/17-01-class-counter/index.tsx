import { Component } from 'react'

interface State {
  count: number;
}
export default class ClassCounterPage extends Component  {
  state = {
    count : 0,
  };
  

  onClickCountUp = (): void => {
    this.setState((prev: State) => ({
      count: prev.count + 1,
    }));
  };
  
  render(): JSX.Element {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp}>카운트 올리기!!</button>
      </>
    )
  }
}