import { useQuery, gql } from '@apollo/client'

const FETCH_BOARD = gql`
    query {
        fetchBoard(number: 3318) {
          number
          writer
          title
          contents
        }
  }
`

export default function StaticRoutingMovedPage() {

    const { data } = useQuery(FETCH_BOARD) // 요청이 여기서 바로 날라가버림

    console.log(data)

    return(
        <div>
            <div>2번 페이지 이동이 완료되었습니다.</div>
            <div>작성자 : {data && data.fetchBoard.writer}</div>
            <div>제목 : {data?.fetchBoard.title}</div>
            <div>내용 : {data ? data.fetchBoard.contents : "로딩중입니다!!!"}</div>
        </div>
    )
}