import { useState } from "react";
import { wrapAsyncFunc } from "../../../src/commons/libaries/asyncFunc";
import type {
    IMutation,
    IMutationUploadFileArgs,
} from "../../../src/commons/types/generated/typed";
import { gql, useMutation } from "@apollo/client";

const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!) {
        uploadFile(file: $file) {
            url
        }
    }
`;

const 나의그래프큐엘셋팅 = gql`
    mutation createBoard($createBoardInput: CreateBoardInput!) {
        createBoard(createBoardInput: $createBoardInput) {
            _id
            title
            contents
            likeCount
        }
    }
`;

export default function ImageUploadPage(): JSX.Element {
    const [image, setImage] = useState("");
    const [file, setFile] = useState<File>();

    const [나의함수] = useMutation(나의그래프큐엘셋팅);
    const [uploadFile] = useMutation<
        Pick<IMutation, "uploadFile">,
        IMutationUploadFileArgs
    >(UPLOAD_FILE);

    const onClickSubmit = async (): Promise<void> => {
        // 1. uploadfile
        const resultFile = await uploadFile({
            variables: {
                file,
            },
        });
        const URL = resultFile.data?.uploadFile.url;

        const result = await 나의함수({
            variables: {
                createBoardInput: {
                    writer: "철수",
                    password: "1234",
                    title: "제목입니다",
                    contents: "내용입니다",
                    images: [URL],
                },
            },
        });
        console.log(result);
    };

    const onChangeFile = async (
        event: React.ChangeEvent<HTMLInputElement>
    ): Promise<void> => {
        const file = event.target.files?.[0];
        if (file === undefined) return;
        console.log(file);

        // 1. 임시URL 생성 => (가짜URL - 내 브라우저에서만 접근 가능)
        const result = URL.createObjectURL(file);
        console.log(result);

        // 2. 임시URL 생성 => (진짜URL - 다른 브라우저에서도 접근 가능)
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (event) => {
            console.log(event.target?.result); // 게시판에서 event.target.id를 쓰면 eslint가 잡았던 이유 : event.target은 태그만을 가르키지 않음
            if (typeof event.target?.result === "string") {
                setImage(event.target?.result);
                setFile(file);
            }
        };
    };

    return (
        <>
            <input
                type="file"
                onChange={wrapAsyncFunc(onChangeFile)}
                multiple
            />
            {/* <img src={`https://storage.googleapis.com/${image}`} /> */}
            <img src={image} />
            <button onClick={wrapAsyncFunc(onClickSubmit)}>등록하기</button>
        </>
    );
}
