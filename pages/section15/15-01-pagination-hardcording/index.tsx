import { useQuery, gql } from '@apollo/client'
import type 
{ IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/typed'

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
    const onClickpage1 = async (): Promise<void> => {
        void await refetch({page:1}) // 이렇게 await를 넣는건 보통 기다려서 받아온 뒤 밑에서 무언갈 실행할 때 넣어주는데 지금같은경우는 밑에 실행할것이 없으니 굳이 await를 안넣어주어도 됨
        // refetch({ variables : }) 원래는 이런식으로 variables해서 받아오는데
        console.log('a')
    }

    const onClickpage2 = () : void => {
        void refetch({page:2})
    }

    const onClickpage3 = () : void => {
        void refetch({page:3})
    }
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
                <span onClick={onClickpage1}>1</span> 
                <span onClick={onClickpage2}>2</span> 
                <span onClick={onClickpage3}>3</span>
        </div>
    )
}