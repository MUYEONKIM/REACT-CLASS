import { useState } from "react";
import MemoizationChild from "./02-child";
import { v4 as uuidv4 } from "uuid";

export default function MemoizationParent(): JSX.Element {
    const [data, setData] = useState("철수는 오늘 점심을 맛있게 먹었습니다.");

    const onClickChange = (): void => {
        setData("영희는 오늘 저녁을 맛없게 먹었습니다.");
    };
    return (
        <>
            {/* {data.split(" ").map((el, index) => (
                <MemoizationChild key={index} el={el} /> // 1. memo시, key또는 el이 변경된 부분만 리렌더링 됨
            ))} */}
            {data.split(" ").map((el, index) => (
                <MemoizationChild key={uuidv4()} el={el} /> // 2. memo를 해도, key자체가 변경되어 props가 넘어가므로, 다 다른것으로 인식해서 리렌더링이 전부 일어남
            ))}
            <button onClick={onClickChange}>체인지</button>
        </>
    );
}
