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

    const onClickBasket = (basket: IBoard) => () => {
        const baskets: IBoard[] = JSON.parse(localStorage.getItem('baskets') ?? '[]');
        
        const temp = baskets.filter((el) => el._id === basket._id)
        if (temp.length >= 1) {
            alert('이미 담으신 물품입니다.');
            return;
        } else {
            alert('장바구니에 담겼습니다.')
        }

        // 쓸데없는거 (_typename등)담기지 않기 위한 방법 - 안쓰느 키들
        // 1. 잘못된 방법
        // delete basket.__typename  원본을 건드리기 때문

        // 2. 옳은 방법
        const { __typename, ...newbasket } = basket; // 안전한 사례
        baskets.push(newbasket);

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