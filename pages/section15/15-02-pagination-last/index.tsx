import { useQuery, gql } from '@apollo/client'
import type { 
    IQuery,
    IQueryFetchBoardsArgs,
    IQueryFetchBoardsCountArgs
} from '../../../src/commons/types/generated/typed'
import type { MouseEvent } from 'react' // 타입은 앞에 type 붙여주기
import { useState } from 'react'


const FETCH_BOARDS = gql`
    query fetchBoards($page: Int) { # 속성이라서 page를 받음
        fetchBoards(page: $page) {
          _id  #기존의 api할당 number에서 id로 바뀜
          writer
          title
          contents
          
        }
  }
`

const FETHC_BOARDS_COUNT = gql`
    query {
        fetchBoardsCount 
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
    
    // <Pick<IQuery, "fetchBoardsCount">, IQueryFetchBoardsCountArgs>: 이것은 TypeScript의 제너릭 타입입니다. 
    // useQuery 함수에 적절한 타입 정보를 제공하므로서 타입 안정성을 보장합니다. 
    // Pick<IQuery, "fetchBoardsCount">는 IQuery 인터페이스에서 fetchBoardsCount 속성만 선택하고, 
    // IQueryFetchBoardsCountArgs는 이 쿼리를 위한 입력 인수의 인터페이스입니다.
    // 받아오는 것에서 data: data123 하면 data로 받아온것을 data123으로 이름이 변경된다는 뜻
    const { data: dataBoardsCount} = useQuery< 
        Pick<IQuery, "fetchBoardsCount">,
        IQueryFetchBoardsCountArgs
        >(FETHC_BOARDS_COUNT);
    
    const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10); // ??를 붙인 이유는 ??가 없으면 undefned일수도 있기 때문에 undefined이면 10이다라고 지정해준것
    
    console.log(dataBoardsCount, lastPage)
    const onClickpage = (event : MouseEvent<HTMLSpanElement>): void => {
        void refetch({page: Number(event.currentTarget.id) })
    };

    const onClickPrevPage = (): void => {
        if(startPage === 10) return; // return을 걸어서 함수를 종료시키는 법도 있음
        setStartPage(startPage - 10)
        void refetch({page: startPage-10})
        
    }

    const onClickNextPage = (): void => {
        if(startPage + 10 <= lastPage) {
            setStartPage(startPage + 10)
            void refetch({ page: startPage + 10})
        }
    }
    // 마지막 페이지는 전체 게시글 갯수/한 페이지에 보이는 갯수 를 올림한것과 동일, 때문에 백엔드한테 부탁해서 전체페이지 갯수를 알려주는것도 만들어달라 요청
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
                <span onClick={(): void => {
                    setStartPage(1)
                    void refetch({page: 1})
                }}>처음 페이지</span>
                <span onClick={onClickPrevPage}>이전 페이지</span>
                {   
                    new Array(10).fill(1).map((_, index) =>  // 배열만들기 (fill로 값 채워줌)
                    index + startPage <= lastPage && (
                    <span
                      key={index+startPage}
                      id={String(index+startPage)} 
                      onClick={onClickpage}>
                        {index+startPage}<span> </span>
                    </span> 
                    )
                )}
                <span onClick={onClickNextPage}>다음 페이지</span>
                <span onClick={(): void => {
                    setStartPage(lastPage)
                    void refetch({page: lastPage})
                }}>마지막 페이지</span>

        </div>
    )
}