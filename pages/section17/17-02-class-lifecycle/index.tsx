import { Component } from 'react'
import Router from 'next/router';
export default class ClassCounterPage extends Component  {
  state = {
    count : 0,
  };
  
  componentDidMount(): void {
    console.log("그려지고 나서 실행!!")
  }

  componentDidUpdate(): void {
    console.log("변경되고 나서 실행!!") // 이게 무슨뜻이냐면 이걸 따로 호출하지 않아도 무언가가 변경되면 자동으로 실행되는 함수라는 뜻
  }

  componentWillUnmount(): void {
    console.log("사라지기 전에 실행!!")
    // 예시 ) 채팅방 나가기 api, 채팅방 나가기를 모든곳에 하나하나 적용하면 불필요하니깐 채팅방 내에 willamount를 넣어서 유저정보 사라지기 전에 실행으로
  }
  

  onClickCountUp = (): void => {
    this.setState({
      count: 1,
    });
  };

  onClickMove = (): void => {
    // 원래라면 router를 사용하는데 이런 use종류는 hook이라고 부르는 것들임, 이것들은 함수형 컴포넌트에서만 사용가능
    void Router.push("/")
  }
  
  render(): JSX.Element {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp}>카운트 올리기!!</button>
        <button onClick={this.onClickMove}>나가기</button>
      </>
    )
  }
}