import { useQuery, gql, useMutation } from '@apollo/client'
import { Fragment } from 'react'

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

const DELETE_BOARD = gql`
    mutation deleteBoard($number: Int){
        deleteBoard(number: $number){
            message
        }
    }
`

export default function StaticRoutingMovedPage() {

    const { data } = useQuery(FETCH_BOARDS) // 요청이 여기서 바로 날라가버림

    const [deleteBoard] = useMutation(DELETE_BOARD)

    const mystyle = {
        margin: "10px",
        pading: "0px"
    }

    const onClickDelete = (event) => {
        deleteBoard({
            variables:{
                number: Number(event.target.id)
            },
            refetchQueries: [{query: FETCH_BOARDS}]
        })
        alert(event.target.id + "번 게시물이 삭제되었습니다.")
    }

    

    return(
        <div>
            {/* 특별한 이유가 없으면 Fragment로 감싸자, <div>는 한 개 더 그려야되서 조금 느려짐 
            Fragment는 key를 못줌 따라서 Fragmetn에 key를 주고 싶을 땐 <Fragment key={el.number}> 이런식으로 하기*/}

            {data?.fetchBoards.map((el , index)=> (
                // key를 설정해주면 각각의 맵마다 고유의 키가 생겨서 완전히 분리가 됨, 따라서 맵을 작성할때는 반드시 key도 작성부탁 둘이 세트임
                <div key={el.number}> {/*index는 게시글을 삭제할 때, 다음 게시글이 올라오면서 기존 인덱스와 동일한 값을 갖게됨, 즉 유일하지 않음 */}
                    <span>
                        <input type='checkbox' />
                    </span>
                    <span style = {mystyle}>{el.number}</span> 
                    <span style = {mystyle}>{el.writer}</span> 
                    <span style = {{margin: "10px"}}>{el.title}</span> 
                    <span style = {{margin: "10px"}}>{el.contents}</span>
                    <span>
                        <button id={el.number} onClick={onClickDelete}>삭제</button>
                    </span>
                </div>
            ))}
        </div>
    )
}