import Child from "./02-child";

export default function Parent(): JSX.Element {
    return (
      <>
        <Child count={10} /> 일반 컴포넌트 사용법
        {Child({count : 20})} 일반 함수로 사용하기
      </>
    )
}