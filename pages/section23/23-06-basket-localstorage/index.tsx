import { useQuery, gql } from '@apollo/client'
import type 
{ IBoard,
IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/typed'
import { useEffect } from 'react';

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

    // 1. 담는 방법 (JSON.stringify 를 이용한다)
    // const onClickBasket = (e: any): void => {
    //     console.log(e.currentTarget.id)
    // }

    // 2. HOF를 이용해서 담기
    // const onClickBasket = (el: any) => () => {
    //     console.log(JSON.stringify(el))
    //     const basket = [el]
    //     localStorage.setItem('el', JSON.stringify(basket))
    // }; 

    // 3. 제대로 된 HOF
    const onClickBasket = (basket: IBoard) => () => {
        // 1. 기존 장바구니 가져오고 문자열을 js로 바꿔주기
        const baskets: IBoard[] = JSON.parse(localStorage.getItem('baskets') ?? '[]');
        
        // 2. 담겨있는지 검증
        const temp = baskets.filter((el) => el._id === basket._id)
        if (temp.length >= 1) {
            alert('이미 담으신 물품입니다.');
            return;
        } else {
            alert('장바구니에 담겼습니다.')
        }
        // 3. 내가 클릭한거 담기 (push는 배열에 추가하는 것)
        baskets.push(basket);

        // 4. 추가된 장바구니 저장하기
        localStorage.setItem('baskets', JSON.stringify(basket))
    }; 

    // 만약 장바구니 페이지에서 가져오기를 하려면?
    useEffect(() => {
        localStorage.getItem('baskets')
    })
    return(
        <div>
            {data?.fetchBoards.map((el) => (
                <div key={el._id}>
                    <span style = {{margin: "10px"}}>{el.writer}</span>
                    <span style = {{margin: "10px"}}>{el.title}</span>
                    {/* <button id={JSON.stringify(el)} onClick={onClickBasket}>장바구니 담기</button> */}
                    <button onClick={onClickBasket(el)}>장바구니 담기</button>
                </div>))}
        </div>
    )
}