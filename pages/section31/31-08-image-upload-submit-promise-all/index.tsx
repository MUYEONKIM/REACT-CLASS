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
    const [image, setImage] = useState(["", "", ""]);
    const [files, setFiles] = useState<File[]>([]);

    const [나의함수] = useMutation(나의그래프큐엘셋팅);
    const [uploadFile] = useMutation<
        Pick<IMutation, "uploadFile">,
        IMutationUploadFileArgs
    >(UPLOAD_FILE);

    const onClickSubmit = async (): Promise<void> => {
        // 1. uploadfile
        // 1-1. 안좋은 예제 (await를 매번 기다림 => for문 사용해도 마찬가지 (이유 : i 값에 의존하기 때문에 ))
        // const resultFile0 = await uploadFile({
        //     variables: {
        //         file: files[0],
        //     },
        // });
        // const resultFile1 = await uploadFile({
        //     variables: {
        //         file: files[1],
        //     },
        // });
        // const resultFile2 = await uploadFile({
        //     variables: {
        //         file: files[2],
        //     },
        // });
        // const URL0 = resultFile0.data?.uploadFile.url;
        // const URL1 = resultFile1.data?.uploadFile.url;
        // const URL2 = resultFile2.data?.uploadFile.url;
        // 하나하나 될 때 까지 기다린 후 실행이라서 시간이 세 배!
        // const resultUrls = [URL0, URL1, URL2]

        // 1-2. 좋은예제 - Promise.all 사용
        // const results = await Promise.all([
        //     uploadFile({
        //         variables: {
        //             file: files[0],
        //         },
        //     }),
        //     uploadFile({
        //         variables: {
        //             file: files[1],
        //         },
        //     }),
        //     uploadFile({
        //         variables: {
        //             file: files[2],
        //         },
        //     })
        // ])

        // 1-3. 좋은예제 리팩토링 - files state를 이용, 현재 files state는 배열로 담겨져 있음
        const results = await Promise.all(
            files.map(
                async (el) =>
                    await uploadFile({
                        variables: {
                            file: el,
                        },
                    })
            )
        );

        console.log(results); // 자동으로 배열로 나타남
        const resultUrls = results.map((el) => el.data?.uploadFile.url);

        const result = await 나의함수({
            variables: {
                createBoardInput: {
                    writer: "철수",
                    password: "1234",
                    title: "제목입니다",
                    contents: "내용입니다",
                    images: resultUrls,
                },
            },
        });
        console.log(result);
    };

    const onChangeFile =
        (index: number) =>
        async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
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
                    const tempUrls = [...image];
                    tempUrls[index] = event.target?.result;
                    setImage(tempUrls);

                    const tempFiles = [...files];
                    tempFiles[index] = file;
                    setFiles(tempFiles);
                }
            };
        };

    return (
        <>
            <input type="file" onChange={wrapAsyncFunc(onChangeFile(0))} />
            <input type="file" onChange={wrapAsyncFunc(onChangeFile(1))} />
            <input type="file" onChange={wrapAsyncFunc(onChangeFile(2))} />
            {/* <img src={`https://storage.googleapis.com/${image}`} /> */}
            <img src={image[0]} />
            <img src={image[1]} />
            <img src={image[2]} />
            <button onClick={wrapAsyncFunc(onClickSubmit)}>등록하기</button>
        </>
    );
}
