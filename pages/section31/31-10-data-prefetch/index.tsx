import { useQuery, gql, useApolloClient } from "@apollo/client";
import type {
    IQuery,
    IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/typed";
import { wrapAsyncFunc } from "../../../src/commons/libaries/asyncFunc";
import { useRouter } from "next/router";

const FETCH_BOARDS = gql`
    query fetchBoards($page: Int) {
        fetchBoards(page: $page) {
            _id #기존의 api할당 number에서 id로 바뀜
            writer
            title
            contents
        }
    }
`;

const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
        fetchBoard(boardId: $boardId) {
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
        IQueryFetchBoardsArgs
    >(FETCH_BOARDS);

    const client = useApolloClient();
    const router = useRouter();

    const prefetchBoard = (boardId: string) => async () => {
        await client.query({
            query: FETCH_BOARD,
            variables: {
                boardId,
            },
        });
    };

    const onClickMove = (boardId: string) => () => {
        void router.push(`/section31/31-10-data-prefetch-moved/${boardId}`);
    };

    return (
        <div>
            {data?.fetchBoards.map((el) => (
                <div key={el._id}>
                    <span>
                        <input type="checkbox" />
                    </span>
                    <span
                        style={{ margin: "10px" }}
                        onMouseOver={wrapAsyncFunc(prefetchBoard(el._id))}
                        onClick={onClickMove(el._id)}
                    >
                        {el.writer}
                    </span>
                    <span style={{ margin: "10px" }}>{el.title}</span>
                    <span style={{ margin: "10px" }}>{el.contents}</span>
                </div>
            ))}
        </div>
    );
}
