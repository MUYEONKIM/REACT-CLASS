import { useQuery, gql } from '@apollo/client'
import type 
{ IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/typed'


const FETCH_BOARDS = gql`
    query fetchBoards($page: Int) {
        fetchBoards(page: $page) {
          _id
          writer
          title
          contents
        }
  }
`

export default function StaticRoutingMovedPage(): JSX.Element {

    const { data } = useQuery<
        Pick<IQuery, "fetchBoards">, 
        IQueryFetchBoardsArgs>
        (FETCH_BOARDS); 

    return(
        <div>
            {/* {data?.fetchBoards.map((el) => (
                <div key={el._id}>
                    <span>
                    <input type='checkbox' />
                    </span>
                    <span style = {{margin: "10px"}}>{el.writer}</span>
                    <span style = {{margin: "10px"}}>{el.title}</span>
                </div>))} */}
        </div>
    )
}