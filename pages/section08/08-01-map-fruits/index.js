// 컴포넌트 위에 만든 이유: 컴포넌트는 실행이 되면 계속 리렌더링이 되는데 이를 막기위해 한번만 선언하기 위해서
const FRUITS = [
        {number: 1, title: "레드향"},
        {number: 2, title: "샤인머스켓"},
        {number: 3, title: "산청딸기"},
        {number: 4, title: "한라봉"},
        {number: 5, title: "사과"},
        {number: 6, title: "애플망고"},
        {number: 7, title: "딸기"},
        {number: 8, title: "천혜향"},
        {number: 9, title: "과일선물세트"},
        {number: 10, title: "끝"},
];

// map으로 리턴할 때 
// 중괄호로 쓰면 return을 생략할 수 없고,
// 소괄호로 쓰면 return 생략이 가능

export default function mapFruitsPage() {
    // 1.가장 기본 예제
    const aaa = [<div>1 레드향</div>, <div>2 샤인머스켓</div>, <div>3 산청딸기</div>]
    // 2.실무 백엔드 데이터 예제
    const bbb = FRUITS.map(el => <div>{el.number} {el.title}</div>)
    return(
        <div>
            <div>{aaa}</div>
            =========================
            <div>{bbb}</div>
            =========================
            {/* 3. 유지보수를위해 이렇게 더 많이씀*/}
            <div>{FRUITS.map(el => <div>{el.number} {el.title}</div>)}</div> 
        </div>
    )
}