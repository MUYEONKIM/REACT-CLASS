import { MyButton } from '../../../styles/02-01';
import { useState } from 'react';

export default function CounterLetDocumentPage(): JSX.Element {
    // let count = 0  let은 리액트 전용 html에서 변경을 감지하지 못함(따라서 state 필수)
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)


    function onClickCountUp(): void {
        setCount(count+1);
        setCount(count+1);
        setCount(count+1);
        setCount(count+1);
        setCount(count+1);
    }
    // prev대신 마음대로 지정해줘도 됨 event가 e로 지정하는것 처럼
    function onClickCountUp2(): void {
        setCount2((prev) => prev + 1);
        setCount2((prev) => prev + 1);
        setCount2((prev) => prev + 1);
        setCount2((prev) => prev + 1);
        setCount2((prev) => prev + 1);
    }

    // function onClickCountDown () {
    //     setCount(count-1)
    // };

    return (
        <div>
            <div>{count}</div>
            <MyButton onClick={onClickCountUp}>카운트 올리기</MyButton>
            {/* <MyButton onClick={onClickCountDown}>카운트 내리기</MyButton> */}
            <div>{count2}</div>
            <MyButton onClick={onClickCountUp2}>prev인자 이용해서 카운트 올리기</MyButton>
        </div>
    )
}