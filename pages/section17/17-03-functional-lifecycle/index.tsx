import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'

export default function FunctionalCounterPage(): JSX.Element {
  const [ count, setCount ] = useState(0);
  const router = useRouter();

  // componentDidMount와 동일
  useEffect(() => {
    console.log("그려지고 나서 실행")
  }, []) // 여기서 []는 의존성 배열이라고 부름(dependency 배열)

  // componentDidMount와 + componentDidUpdate 와 동일
  // 시작하고 나서 한번 실행 + 변경될때 마다 실행
  useEffect(() => {
    console.log("변경되고 나서 실행")
  })
  console.log("누가 먼저 실행될까")
  // count가 변화될 때 마다 실행
  useEffect(() => {
    console.log("변경되고 나서 실행")
  }, [count])

  // componentWillUnmount와 동일
  useEffect(() => {
    return () => {
      console.log("사라지기 전에 실행")
    };
  }, [])

  // 모두 다 결합
  useEffect(() => {
    console.log("그려지고 나서 실행")
    return () => {
      console.log("사라지기 전에 실행")
    }
  })


  
  const onClickCountUp = (): void => {
    setCount(prev => prev + 1);
  };

  const onClickMove = (): void => {
    // 원래라면 router를 사용하는데 이런 use종류는 hook이라고 부르는 것들임, 이것들은 함수형 컴포넌트에서만 사용가능
    void router.push("/")
  }
  
    return (
      <>
        <div>{count}</div>
        <button onClick={onClickCountUp}>카운트 올리기!!</button>
        <button onClick={onClickMove}>나가기</button>
      </>
    )
}
