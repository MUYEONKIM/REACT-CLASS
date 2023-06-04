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

    return(
        <div>
            {data?.fetchBoards.map((el: any) => (
                <div>
                    <span>
                    <input type='checkbox' />
                    </span>
                    <span style = {mystyle}>{el.number}</span> 
                    <span style = {mystyle}>{el.writer}</span> 
                    <span style = {{margin: "10px"}}>{el.title}</span> 
                    <span style = {{margin: "10px"}}>{el.contents}</span>
                </div>))}

        </div>
    )
}