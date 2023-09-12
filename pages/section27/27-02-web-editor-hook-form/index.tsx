// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
// import { useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import { wrapFormAsyncFunc } from "../../../src/commons/libaries/asyncFunc";
import { useForm } from 'react-hook-form'

const ReactQuill = dynamic(async () =>await import("react-quill"), {
   ssr: false 
});


export default function WebEditor(): JSX.Element {
  const { register, setValue, trigger } = useForm({
    mode: "onChange"
  });

  const onClickSubmit = async(): Promise<void> => {
    const {Modal} = await import("antd") // 원하는 식으로 코드를 쪼갠다 (코드 스플릿팅)
    Modal.success({content: "게시글 등록에 성공하였습니다!!!"})
  };

  const onChangeContents = (value: string): void => {
    console.log(value)
    // register로 등록하지 않고, 강제로 값을 넣어주는 기능
    setValue("contents", value === "<p><br></p>" ? "" : value);

    // onChange 됬으니깐 에러검증 같은것들 해달라고 react-hook-form에 알려주는 기능
    void trigger("contents");
  };

  return (
    <form onSubmit={wrapFormAsyncFunc(onClickSubmit)}>
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