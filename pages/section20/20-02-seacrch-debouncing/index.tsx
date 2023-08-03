import { useQuery, gql } from '@apollo/client'
import type 
{ IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/typed'
import type { MouseEvent } from 'react'
import {useState} from 'react'
import _ from 'lodash'

const FETCH_BOARDS = gql`
    query fetchBoards($page: Int, $search: String) {
        fetchBoards(page: $page, search: $search) {
          _id
          writer
          title
          contents
        }
  }
`

export default function StaticRoutingMovedPage(): JSX.Element {
    const { data, refetch } = useQuery<
      Pick<IQuery, "fetchBoards">, 
      IQueryFetchBoardsArgs>
      (FETCH_BOARDS); 

    const onClickpage = (event : MouseEvent<HTMLSpanElement>): void => {
      // 검색에서 refetch할 때, search 검색어가 refetch에 이미 저장되어 있는 상태이므로 추가로 search 포함하지 않아도 됨
      void refetch({page: Number(event.currentTarget.id) })
    };

    const getDebounce = _.debounce((value) => {
      void refetch({search: value, page:1})
    }, 500) // 0.5초 안에 추가입력이 있으면 무시한다는 뜻

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
      getDebounce(e.currentTarget.value) // onchange가 일어날때 마다 getdebounce
    }

    return(
        <div>
            검색어입력 : <input type="text" onChange={onChangeSearch}/>
            {/* <button onClick={onClickSearch}>검색하기</button> */}
            {data?.fetchBoards.map((el) => (
                <div key={el._id}>
                    <span>
                    <input type='checkbox' />
                    </span>
                    <span style = {{margin: "10px"}}>{el.writer}</span>
                    <span style = {{margin: "10px"}}>{el.title}</span>
                </div>))}
                {   
                    new Array(10).fill(1).map((_, index) => ( // 배열만들기 (fill로 값 채워줌)
                    <span key={index+1} id={String(index+1)} onClick={onClickpage}>
                        {index+1}<span> </span>
                    </span> 
                    ))
                }
        </div>
    )
}