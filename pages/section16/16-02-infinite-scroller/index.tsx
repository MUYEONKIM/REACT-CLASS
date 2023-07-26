import { useQuery, gql } from '@apollo/client'
import type 
{ IQuery, IQueryFetchBoardsArgs } from '../../../src/commons/types/generated/typed'
import InfiniteScroll from 'react-infinite-scroller';

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

  const { data, fetchMore } = useQuery<
    Pick<IQuery, "fetchBoards">, 
    IQueryFetchBoardsArgs>
    (FETCH_BOARDS); 
  
  const onloadMore = (): void => {
    if(data === undefined) return;
    void fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoards.length ?? 10) / 10) + 1
      }, updateQuery: (prev, {fetchMoreResult}) => {
        if (fetchMoreResult.fetchBoards === undefined){
          return {
            fetchBoards: [...prev.fetchBoards],
          }
        }
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards]
        };
      },
    });
  };

  return(
      <div style={{height: '500px', overflow:'auto'}}>
        <InfiniteScroll
          pageStart={0}
          loadMore={onloadMore}
          hasMore={true}
          useWindow={false}
          loader={<div className='loader' key={0}>Loading...</div>}>
          {data?.fetchBoards.map((el) => (
              <div key={el._id}>
                  <span>
                  <input type='checkbox' />
                  </span>
                  <span style = {{margin: "10px"}}>{el.writer}</span>
                  <span style = {{margin: "10px"}}>{el.title}</span>
                  <span style = {{margin: "10px"}}>{el.contents}</span>
              </div>))}
        </InfiniteScroll>
      </div>
  )
}