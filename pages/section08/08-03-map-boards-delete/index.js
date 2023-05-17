import { useQuery, gql, useMutation } from '@apollo/client'

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
            {data?.fetchBoards.map(el => (
                <div>
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
                </div>))}

        </div>
    )
}