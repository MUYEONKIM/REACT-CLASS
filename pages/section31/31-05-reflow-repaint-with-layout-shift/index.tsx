import { useQuery, gql } from "@apollo/client";
import type {
    IQuery,
    IQueryFetchBoardsArgs,
} from "../../../src/commons/types/generated/typed";
import { MouseEvent } from "react";

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

export default function StaticRoutingMovedPage(): JSX.Element {
    const { data, refetch } = useQuery<
        Pick<IQuery, "fetchBoards">,
        IQueryFetchBoardsArgs
    >(FETCH_BOARDS);

    const onClickpage = (event: MouseEvent<HTMLSpanElement>): void => {
        void refetch({ page: Number(event.currentTarget.id) });
    };
    return (
        <div>
            {(data?.fetchBoards ?? new Array(10).fill(1)).map((el) => (
                <div key={el._id} style={{ height: "30px" }}>
                    <span>
                        <input type="checkbox" />
                    </span>
                    <span style={{ margin: "10px" }}>{el.writer}</span>
                    <span style={{ margin: "10px" }}>{el.title}</span>
                    <span style={{ margin: "10px" }}>{el.contents}</span>
                </div>
            ))}
            {new Array(10).fill(1).map((_, index) => (
                <span
                    key={index + 1}
                    id={String(index + 1)}
                    onClick={onClickpage}
                >
                    {index + 1}
                    <span> </span>
                </span>
            ))}
        </div>
    );
}
