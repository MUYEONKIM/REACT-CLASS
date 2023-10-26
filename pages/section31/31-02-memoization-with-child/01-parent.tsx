import { useCallback, useMemo, useState } from "react";
// import ChildPage from "./01-child";

export default function Memoization(): JSX.Element {
    console.log("컴포넌트가 렌더링 되었습니다.");
    let countLet = 0;
    const [countState, setCountState] = useState(0);
    // const [qwer, setQwer] = useState("");

    // 1. useMemo로 변수 기억
    // 이렇게 useMemo를 통해서 하면 새롭게 안 만들고 값이 메모되서 저장이 됨
    // const aaa = useMemo(() => Math.floor(Math.random() * 100), []);
    // console.log(aaa);

    // 이렇게 하면 아래 계산이 오래걸려도 첫 한번만 실행해서 메모가 됨, 새로고침시 초기화, 리렌더가 되어도 초기화가 안됨
    const aaa = useMemo(() => {
        let result = 0;
        for (let i = 0; i < 9000000; i++) {
            result += i;
        }
        return result;
    }, []);
    console.log(aaa);

    // const onClickCountLet = (): void => {
    //     // 리렌더링이 안되서 화면에는 반영이 안됨, 값을 넣으려면 document.getElementbyid등을 이용해서 다시 집어넣어 줘야 함
    //     console.log(countLet + 1);
    //     countLet += 1;
    // };

    // 2. useCallBack으로 함수 기억
    const onClickCountLetCallBack = useCallback((): void => {
        // 이렇게 할 경우 countLet이 memo에 남아있어서 리렌더가 되어도 초기화가 안일어남, countlet값 보전이됨
        console.log(countLet + 1);
        countLet += 1;
    }, []);

    // const onClickCountState = (): void => {
    //   // 리렌더링이 되서 화면에 반영이 되지만, 리렌더링이 일어나서 letCount는 다시 0으로 초기화가 됨, state는 값을 저장, 기억함
    //   console.log(countState + 1);
    //   setCountState(countState + 1);
    // };

    // 3. useCallback 사용시 주의사항 => state 사용시는 주의!, 아래의 경우에서 countState값 까지 기억해서 countState = 0 + 1 이것만 무한 반복함, 그래서prev 로 직접 꺼내서 옴
    const onClickCountStateCallback = useCallback((): void => {
        // console.log(countState);
        setCountState((prev) => prev + 1);
    }, []);

    // 4. 응용 useCallBack을 useMemo에 넣기 useMemo로 나만의 useCallBack 만들어보기
    // const onClickCountStateCallback2 = useMemo(() => {
    //     return (): void => {
    //         setCountState((prev) => prev + 1);
    //     };
    // }, []);

    console.log(countState);
    return (
        <>
            <div>=========================</div>
            <h1>저는 부모 컴포넌트 입니다!!</h1>
            <div>카운트(let) : {countLet}</div>
            <button onClick={onClickCountLetCallBack}>
                카운트(let) + 1 올리기
            </button>
            <div>카운트(state) : {countState}</div>
            <button onClick={onClickCountStateCallback}>
                카운트(let) + 1 올리기
            </button>
            <div>=========================</div>
            {/* <ChildPage qqq={qwer} /> */}
        </>
    );
}
