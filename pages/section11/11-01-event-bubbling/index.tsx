import { useQuery, gql } from '@apollo/client'

const FETCH_BOARDS = gql`
    query {
        fetchBoards{
          number
          writer
          title
          contents
        }
  }
`

export default function StaticRoutingMovedPage() {

    const { data } = useQuery(FETCH_BOARDS) // 요청이 여기서 바로 날라가버림

    console.log(data?.fetchBoards)

    const mystyle = {
        margin: "10px",
        pading: "0px"
    }

    const onClickSpan = (event: React.MouseEvent<HTMLSpanElement>) => {
        alert(event.currentTarget.id + "번 게시물입니다.")
        console.log(event.currentTarget.id)
    }

    const onClickDiv = (event: React.MouseEvent<HTMLDivElement>) => {
        const clickId = event.currentTarget.id;
        alert(clickId + "번 게시물입니다.")
        console.log(clickId)
    }

    const qqq = (event: React.MouseEvent<HTMLSpanElement>) => {
        alert("클릭 타이틀")
    }

// map의 특이점 또는 callback함수의 특이점 : 중괄호{} 로 쓰면return 생략 불가능 , () 로 쓰면 return 생략 가능
    return(
        <>
        <div>
            {data?.fetchBoards.map((el: any) => ( // 함수타입은 인자 받는 곳에서 타입을 선언해주면됨
                <div>
                    <span>
                      <input type='checkbox' />
                    </span>
                    <span onClick = {() => ( // 안에서 바로 지정해버리는 법
                        alert(el.number + "번 게시물입니다. 안에서 지정 법")
                    )} style = {mystyle}>{el.number}</span> 
                    <span id = {el.number} onClick = {onClickSpan} style = {mystyle}>{el.writer}</span> 
                    <span id = {el.number} onClick = {onClickSpan} style = {{margin: "10px"}}>{el.title}</span> 
                    <span id = {el.number} onClick = {onClickSpan} style = {{margin: "10px"}}>{el.contents}</span>
                </div>))}
        </div>
        <div>
            {data?.fetchBoards.map((el: any) => ( // 위에서 처럼 하나하나 지정 말고 한번에 지정하는 법 (이벤트 버블링으로 클릭 이벤트 전파)
                <div id={el.number} onClick={onClickDiv}>
                    <span>
                      <input type='checkbox' />
                    </span>
                    <span onClick = {qqq} style = {mystyle}>{el.number}</span> 
                    <span style = {mystyle}>{el.writer}</span> 
                    <span style = {{margin: "10px"}}>{el.title}</span> 
                    <span style = {{margin: "10px"}}>{el.contents}</span>
                </div>))}
        </div>
        </>
    )
}