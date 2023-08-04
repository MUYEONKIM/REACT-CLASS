import { useQuery, gql } from '@apollo/client'
import { IQuery, IQueryFetchBoardsArgs } from '../../../commons/types/generated/typed';


const FETCH_BOARDS = gql`
    query fetchBoards {
        fetchBoards {
          _id
          writer
          title
          contents
        }
  }
`

export default function FetchPolicyExample(): JSX.Element {

    const { data } = useQuery<
        Pick<IQuery, "fetchBoards">, 
        IQueryFetchBoardsArgs>
        (FETCH_BOARDS,{
            fetchPolicy: "network-only"
        }); 

    return(
        <div>
            {data?.fetchBoards.map((el) => (
                <div key={el._id}>
                    <span style = {{margin: "10px"}}>{el.writer}</span>
                    <span style = {{margin: "10px"}}>{el.title}</span>
                </div>))}
        </div>
    )
}