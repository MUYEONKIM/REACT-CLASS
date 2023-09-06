import { useQuery, gql, useMutation } from '@apollo/client'
import type { IQuery, IQueryFetchBoardsArgs } from '../../src/commons/types/generated/typed';


const FETCH_BOARDS = gql`
    query fetchBoards($page: Int) {
        fetchBoards(page: $page) {
          _id  #기존의 api할당 number에서 id로 바뀜
          writer
          title
          contents
        }
  }
`;

const DELETE_BOARD = gql`
    mutation deleteBoard($boardId: ID!){
        deleteBoard(boardId: $boardId)
    }
`;

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage(): JSX.Element {
  const { data } = useQuery<
      Pick<IQuery, "fetchBoards">, 
      IQueryFetchBoardsArgs>
      (FETCH_BOARDS);
  
  const [deleteBoard] = useMutation(DELETE_BOARD)
  const [나의함수] = useMutation(나의그래프큐엘셋팅)

  interface IPrev {
    __ref: string
  }

  const onClickDelete = (boardId: string) => (): void => {
    void deleteBoard({
        variables:{ boardId },
        // refetchQueries: [{query: FETCH_BOARDS}] 기존 방법
        update(cache, response) {
          cache.modify({
            fields: {
              fetchBoards: (prev: IPrev[], { readField }) => {
                const deleteId = response.data.deleteBoard // 삭제 완료된 id
                const filteredPrev = prev.filter((el) => readField("_id", el) !== deleteId)
                return [...filteredPrev] // 삭제된id를 제외한 나머지를 리턴
              }
            }
          })
        }
    });
  };

  const onClickSubmit = (): void => {
    void 나의함수({
        variables: {
          createBoardInput: {
            writer : "철수",
            password: "1234",
            title : "제목입니다",
            contents : "내용입니다",
          },
        },
        // refetchQueries: [{ query: FETCH_BOARDS}] 기존방법
        update(cache, { data }){ // 여기서 data는 구조분해 할당으로 받은 것
          cache.modify({
            fields: {
              fetchBoards: (prev) => { // 이러면 fetchBoards가 바뀌면 fetchBoards를 쓰는 곳이 전부다 rerendering이 일어남 
                return [data.createBoard, ...prev] // 최신껄 먼저, 그 뒤에 기존꺼 복사한 값
              },
            },
          });
        },
    });
  };

  return(
      <div>
          {data?.fetchBoards.map((el) => (
              <div key={el._id}>
                  <span style = {{margin: "10px"}}>{el.writer}</span>
                  <span style = {{margin: "10px"}}>{el.title}</span>
                  <button onClick={onClickDelete(el._id)}>삭제하기</button>
              </div>))}
          <button onClick={onClickSubmit}>등록하기</button>
      </div>
  )
}