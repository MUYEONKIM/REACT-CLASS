import { gql, useMutation, useQuery } from "@apollo/client";
import type {
    IMutation,
    IMutationLikeBoardArgs,
    IQuery,
    IQueryFetchBoardArgs,
} from "../../../src/commons/types/generated/typed";

const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
        fetchBoard(boardId: $boardId) {
            _id
            likeCount
        }
    }
`;

const LIKE_COUNT = gql`
    mutation likeBoard($boardId: ID!) {
        likeBoard(boardId: $boardId)
    }
`;

export default function OptimisticUiPage(): JSX.Element {
    const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
        FETCH_BOARD,
        {
            variables: {
                boardId: "6540b20a5d6eaa0029f7c092",
            },
        }
    );
    const [likeBoard] = useMutation<
        Pick<IMutation, "likeBoard">,
        IMutationLikeBoardArgs
    >(LIKE_COUNT);

    const onClickLike = (): void => {
        void likeBoard({
            variables: {
                boardId: "6540b20a5d6eaa0029f7c092",
            },
            // 응답을 받았다 가정하에 아래의 값으로 바로 바꿔버림 그래서 보여준 후 아래에서 새롭게 받아온 후 진짜로 넣어줌
            optimisticResponse: {
                likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
            },
            // 1. 리페치 이용
            // refetchQueries: [{}]

            // 2. 캐시 직접 수정
            update: (cache, { data }) => {
                // cache.modify가 있었는데 이것은 기존 값을 새로운 걸로 바꾸는 것 이었음
                // writeQuery는 없던 것도 새롭게 추가 가능
                cache.writeQuery({
                    query: FETCH_BOARD,
                    variables: {
                        boardId: "6540b20a5d6eaa0029f7c092",
                    },
                    data: {
                        fetchBoard: {
                            _id: "6540b20a5d6eaa0029f7c092", // 기준이 되기 때문에 필수
                            __typename: "Board", // 기준이 되기 때문에 필수
                            likeCount: data?.likeBoard,
                        },
                    },
                });
            },
        });
    };

    return (
        <>
            <div>좋아요 개수 : {data?.fetchBoard.likeCount}</div>
            <button onClick={onClickLike}>좋아요!</button>
        </>
    );
}
