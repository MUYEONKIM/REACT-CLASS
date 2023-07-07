import { useQuery, gql } from '@apollo/client'
import type 
{ IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/typed'
import { MouseEvent } from 'react'


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

    const { data, refetch } = useQuery<
        Pick<IQuery, "fetchBoards">, 
        IQueryFetchBoardsArgs>
        (FETCH_BOARDS); 
    // <a,b>로 타입을 지정해줄 때 a는 결과타입, b는 variable 인자 타입, Pick으로 원하는 타입만 가져옴
    // 여기서 받아오는 refetch함수는 refetch query와는 달리 내가 원할때 언제든지 refetch할 수 있게 가져와 쓰는 것
    console.log(data?.fetchBoards)
    // 이미 받았던 것을 다시 받아오기 == refetch
    // 복습 mutation하고 렌더링을 다시하는게 아니라 바로 반영할때 refetch 쿼리 사용 즉onClick할때 삭제하고 바로 query만 다시 refetch해서 보여주는 것
    
    // async를 graphql에서 쓰려면 promise로 지정해줘야 됨

    //이렇게 함수 3개를 지정할것을 하나로 만들어줌
    // const onClickpage1 = (event : MouseEvent<HTMLSpanElement>): void => {
    //     void refetch({page:1})
    // };

    // const onClickpage2 = (event : MouseEvent<HTMLSpanElement>) : void => {
    //     void refetch({page:2})
    // }

    // const onClickpage3 = (event : MouseEvent<HTMLSpanElement>) : void => {
    //     void refetch({page:3})
    // }

    const onClickpage = (event : MouseEvent<HTMLSpanElement>): void => {
        void refetch({page: Number(event.currentTarget.id) })
    };
    return(
        <div>
            <p>원래는 아래의 el의 타입을 el: 로 지정해주어야 하지만 앞의 fetchboards의 타입을 지정해주면 그 결과가 map으로 뿌려지는 거라서 el의 타입이 지정 됨,fetchboards의 개별 타입이 el이 되는 거임</p>
            {data?.fetchBoards.map((el) => (
                <div key={el._id}>
                    <span>
                    <input type='checkbox' />
                    </span>
                    <span style = {{margin: "10px"}}>{el.writer}</span>
                    <span style = {{margin: "10px"}}>{el.title}</span>
                    <span style = {{margin: "10px"}}>{el.contents}</span>
                </div>))}
                {/* 방법 1 
                이것도 반복문으로 축약
                <span id="1" onClick={onClickpage}>1</span> 
                <span id="2" onClick={onClickpage}>2</span> 
                <span id="3" onClick={onClickpage}>3</span> */}

                {/* 방법 2 
                {
                    [1,2,3,4,5,6,7,8,9,10].map((el, index) => (
                    <span key={el} id={String(el)} onClick={onClickpage}>
                        {el}<span> </span>{index}<span> </span>
                    </span> 
                    ))
                } */}

                {/* 방법 3 
                {   
                    [1,1,1,1,1,1,1,1,1,1].map((_, index) => ( // 안쓰는 값은 '_' 로 관리하는게 관례
                    <span key={index+1} id={String(index+1)} onClick={onClickpage}>
                        {index+1}<span> </span>
                    </span> 
                    ))
                } */}
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