import { useQuery, gql } from '@apollo/client'
import type 
{ IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/typed'
import { useState } from 'react';
import FetchPolicyExample from '../../../src/components/units/22-fetch-policy';
import { useRouter } from 'next/router';


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

export default function StaticRoutingMovedPage(): JSX.Element {
    const [isopen, setIsopen] = useState(false)
    const router = useRouter()
    const { data } = useQuery<
        Pick<IQuery, "fetchBoards">, 
        IQueryFetchBoardsArgs>
        (FETCH_BOARDS); 

    // 1. 새로운 컴포넌트 등장시에도 글로벌 스테이트 값이 유지되는지?
    const onClickOpen = ():void => {
      setIsopen(prev => !prev)
    }

    const onClickMove = ():void => {
      router.push()
    }
    return(
        <div>
          <button onClick={onClickOpen}>
            버튼을 클릭하면 새로운 컴포넌트가 나타납니다!!
          </button>
          {isopen && <FetchPolicyExample/>}
          2.
          <button onClick={onClickMove}>
            버튼을 클릭하면 새로운 페이지로 이동합니다
          </button>
        </div>
    )
}