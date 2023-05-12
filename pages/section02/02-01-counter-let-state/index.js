import { MyButton } from '../../../styles/02-01';
import { useState } from 'react';

export default function CounterLetDocumentPage() {
    // let count = 0  let은 리액트 전용 html에서 변경을 감지하지 못함(따라서 state 필수)
    const [count, setCount] = useState(0)

    function onClickCountUp() {
        setCount(count+1)
    };

    function onClickCountDown () {
        setCount(count-1)
    };
    return (
        <div>
            <div>{count}</div>
            <MyButton onClick={onClickCountUp}>카운트 올리기</MyButton>
            <MyButton onClick={onClickCountDown}>카운트 내리기</MyButton>
        </div>
    )
}