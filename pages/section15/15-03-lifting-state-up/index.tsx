import { useState } from 'react';
import Child1 from '../../../src/components/units/15-lifting-state-up/Child1';
import Child2 from '../../../src/components/units/15-lifting-state-up/Child2';

export default function CounterLetDocumentPage(): JSX.Element {
  // 방법1 : 함수 전체를 가져오는게 아니라 setCount만 내려줌
    const [count, setCount] = useState(0)

  // 방법2 : 함수를 여기서 만들어서 내려줌
    const onClickCount = (): void => {
      setCount((prev) => prev + 1)
    }
    return (
        <>
          <Child1 count={count} setCount={setCount}/>
          <div>==================</div>
          <Child2 count={count} onClickCount={onClickCount}/>
          <div>==================</div>
          <button onClick={() => {setCount(0)}}>카운트 초기화</button>
        </>
    )
}