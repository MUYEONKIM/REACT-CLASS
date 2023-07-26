import { useQuery, gql } from '@apollo/client'
import type 
{ IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/typed'
import { useState } from 'react';

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
    const [ myindex, setMyindex ] = useState([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ])

    const { data } = useQuery<
        Pick<IQuery, "fetchBoards">, 
        IQueryFetchBoardsArgs>
        (FETCH_BOARDS); 

    const onClickEdit = (e: React.MouseEvent<HTMLButtonElement>): void => {
      const qqq = [...myindex];
      qqq[Number(e.currentTarget.id)] = true;
      setMyindex(qqq);
      console.log(qqq)
    }
    return(
        <div>
            {data?.fetchBoards.map((el, index) => 
                !myindex[index] ? (
                <div key={el._id}>
                    <span>{index}</span>
                    <span style = {{margin: "10px"}}>{el.writer}</span>
                    <span style = {{margin: "10px"}}>{el.title}</span> 
                    <span style = {{margin: "10px"}}>{el.contents}</span>
                    <button id={String(index)} onClick={onClickEdit}>수정하기</button>
                </div>
                ) : (
                    <input type="text" key={el._id}></input>
                )
            )}
        </div>
    )
}