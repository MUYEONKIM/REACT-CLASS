import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { wrapAsyncFunc } from "../../../src/commons/libaries/asyncFunc";
import { useRouter } from "next/router";

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
    const [writer, setWriter] = useState("");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const router = useRouter();

    const [나의함수] = useMutation(나의그래프큐엘셋팅);

    const onChangeWriter = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setWriter(event.target.value);
    };

    const onChangeTitle = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setTitle(event.target.value);
    };

    const onChangeContents = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setContents(event.target.value);
    };

    const onClickSubmit = async (): Promise<void> => {
        const result = await 나의함수({
            variables: {
                createBoardInput: {
                    writer,
                    password: "1234",
                    title,
                    contents,
                },
            },
        });
        console.log(result);
        const boardId = result.data.createBoard._id;
        void router.push(`/boards/${boardId}`);
    };

    return (
        <div>
            작성자 :
            <input role="input-writer" type="text" onChange={onChangeWriter} />
            품명 :
            <input role="input-title" type="text" onChange={onChangeTitle} />
            상세사항 :
            <input
                role="input-contents"
                type="text"
                onChange={onChangeContents}
            />
            <br />
            <button
                role="submit-button"
                style={{ background: "red" }}
                onClick={wrapAsyncFunc(onClickSubmit)}
            >
                Graphql-API 요청하기
            </button>
        </div>
    );
}
