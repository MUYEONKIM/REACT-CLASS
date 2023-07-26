import { useQuery, gql } from '@apollo/client'
import type 
{ IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/typed'
import CommentItem from '../../../src/components/units/16-comment-item';

const FETCH_BOARDS = gql`
    query fetchBoards($page: Int) {
        fetchBoards(page: $page) {
          _id  #기존의 api할당 number에서 id로 바뀜
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
            {data?.fetchBoards.map((el, index) => 
              <CommentItem key={el._id} el={el} index={index}/>
            )}
        </div>
    )
}