// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
// import { useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import { wrapFormAsyncFunc } from "../../../src/commons/libaries/asyncFunc";
import { SubmitHandler, useForm } from 'react-hook-form'
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { IMutation, IMutationCreateBoardArgs } from "../../../src/commons/types/generated/typed";

const ReactQuill = dynamic(async () =>await import("react-quill"), {
   ssr: false 
});

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

export default function WebEditor(): JSX.Element {
  const router = useRouter();
  const [나의함수] = useMutation<Pick<IMutation, "createBoard">,IMutationCreateBoardArgs>(나의그래프큐엘셋팅);
  
  const { register, setValue, trigger, handleSubmit } = useForm<Icreate>({
    mode: "onChange"
  });

  interface Icreate {
    writer: string
    password: string
    title: string
    contents: string
  }
  const onClickSubmit = async(data: Icreate): Promise<void> => {
    const result = await 나의함수({
      variables: {
        createBoardInput: {
          writer : data.writer,
          password: data.password,
          title : data.title,
          contents : data.contents,
        },
      },
    });
    if(result?.data === undefined || result?.data === null) return;
    const {Modal} = await import("antd") // 원하는 식으로 코드를 쪼갠다 (코드 스플릿팅)
    Modal.success({content: `게시글 등록에 성공하였습니다!!!`})
    const boardId = result.data.createBoard._id
    void router.push(`/section27/27-03-web-editor-xss-detail/${boardId}`)
  };

  const onChangeContents = (value: string): void => {
    console.log(value)
    // register로 등록하지 않고, 강제로 값을 넣어주는 기능
    setValue("contents", value);

    // onChange 됬으니깐 에러검증 같은것들 해달라고 react-hook-form에 알려주는 기능
    void trigger("contents");
  };
  console.log(handleSubmit)

  return (
    <form onSubmit={wrapFormAsyncFunc(handleSubmit(onClickSubmit))}>
      작성자: <input type='text' {...register("writer")}/>
      <br/>
      비밀번호: <input type='password' {...register("password")}/>
      <br/>
      제목: <input type='text' {...register("title")}/>
      <br/>
      내용: <ReactQuill onChange={onChangeContents} /><br/>
      <button>등록하기</button>
    </form>
  )
}