import { MyButton } from '../../../styles/02-01';
import { useState } from 'react';

export default function CounterLetDocumentPage(): JSX.Element {
    const [count, setCount] = useState(0)

    function onClickCountUp(): void {
      // 1. 화살표함수
      setCount((prev) => prev + 1)

      // 2. 함수선언식
      setCount(function (prev) {
        return prev + 1
      })

      // 3. 매개변수 바꾸기
      setCount((aaaa) => aaaa + 1)
    };

    return (
        <div>
            <div>{count}</div>
            <MyButton onClick={onClickCountUp}>카운트 올리기</MyButton>
        </div>
    )
}