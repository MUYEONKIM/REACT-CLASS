import { useQuery, gql } from '@apollo/client'
import type { 
    IQuery,
    IQueryFetchBoardsArgs
} from '../../../src/commons/types/generated/typed'
import type { MouseEvent } from 'react'
import { useState } from 'react'


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
    const [ startPage, setStartPage] = useState(1)

    const { data, refetch } = useQuery<
        Pick<IQuery, "fetchBoards">, 
        IQueryFetchBoardsArgs>
        (FETCH_BOARDS); 
    // <a,b>로 타입을 지정해줄 때 a는 결과타입, b는 variable 인자 타입, Pick으로 원하는 타입만 가져옴
    // 여기서 받아오는 refetch함수는 refetch query와는 달리 내가 원할때 언제든지 refetch할 수 있게 가져와 쓰는 것
    console.log(data?.fetchBoards)
    // 이미 받았던 것을 다시 받아오기 == refetch
    // 복습 mutation하고 렌더링을 다시하는게 아니라 바로 반영할때 refetch 쿼리 사용 즉onClick할때 삭제하고 바로 query만 다시 refetch해서 보여주는 것
    
    const onClickpage = (event : MouseEvent<HTMLSpanElement>): void => {
        void refetch({page: Number(event.currentTarget.id) })
    };

    const onClickPrevPage = (): void => {
        if(startPage >= 10){
            setStartPage(startPage - 10)
            void refetch({page: startPage-10})
        } 
    }

    const onClickNextPage = (): void => {
        setStartPage(startPage + 10)
        void refetch({ page: startPage + 10})
    }
    return(
        <div>
            <p>원래는 아래의 el의 타입을 el: 로 지정해주어야 하지만 앞의 fetchboards의 타입을 지정해주면 그 결과가 map으로 뿌려지는 거라서 el의 타입이 지정 됨,fetchboards의 개별 타입이 el이 되는 거임</p>
            {data?.fetchBoards.map((el, index) => (
                <div key={el._id}>
                    <span>
                    <input type='checkbox' />
                    </span>
                    <span style = {{margin: "10px"}}>{index}</span>
                    <span style = {{margin: "10px"}}>{el.writer}</span>
                    <span style = {{margin: "10px"}}>{el.title}</span>
                    <span style = {{margin: "10px"}}>{el.contents}</span>
                </div>))}
                <span onClick={onClickPrevPage}>이전 페이지</span>
                {   
                    new Array(10).fill(1).map((_, index) => ( // 배열만들기 (fill로 값 채워줌)
                    <span key={index+startPage} id={String(index+startPage)} onClick={onClickpage}>
                        {index+startPage}<span> </span>
                    </span> 
                    ))
                }
                <span onClick={onClickNextPage}>다음 페이지</span>

        </div>
    )
}