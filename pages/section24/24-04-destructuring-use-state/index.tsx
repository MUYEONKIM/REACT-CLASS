import { MyButton } from '../../../styles/02-01';
import { useState } from 'react';

export default function CounterLetDocumentPage(): JSX.Element {
    // let count = 0  let은 리액트 전용 html에서 변경을 감지하지 못함(따라서 state 필수)
    const result = useState(0)

    function onClickCountUp(): void {
        // 원래
        // setCount(count-1)
        // 구조분해 할당 안할 시
        result[1](result[0] + 1)

    };

    function onClickCountDown (): void {
        // 원래
        // setCount(count-1)

        // 구조분해 할당을 안 할시
        result[1](result[0] - 1)
    };
    return (
        <div>
            <div>{result[0]}</div>
            <MyButton onClick={onClickCountUp}>카운트 올리기</MyButton>
            <MyButton onClick={onClickCountDown}>카운트 내리기</MyButton>
        </div>
    )
}