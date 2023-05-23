import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
const FETCH_BOARD = gql`
    query fetchBoard($number: Int){
        fetchBoard(number: $number) {
          number
          writer
          title
          contents
        }
  }
`

export default function StaticRoutingMovedPage() {

    const router = useRouter()
    console.log(Number(router.query.number))

    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            number: Number(router.query.number)
        }
    })

    const onClickMove = () => {
        router.push(`/section09/09-03-boards/${router.query.number}/edit`)
    }
    console.log(data)

    return(
        <div>
            <div>{router.query.number}번 페이지 이동이 완료되었습니다.</div>
            <div>작성자 : {data?.fetchBoard?.writer}</div>
            <div>제목 : {data?.fetchBoard?.title}</div>
            <div>내용 : {data?.fetchBoard?.contents}</div>
            <button onClick={onClickMove}>수정하러 가자~</button>
        </div>
    )
}