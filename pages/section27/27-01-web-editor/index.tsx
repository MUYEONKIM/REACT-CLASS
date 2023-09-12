// import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import 'react-quill/dist/quill.snow.css'
import { wrapFormAsyncFunc } from "../../../src/commons/libaries/asyncFunc";

const ReactQuill = dynamic(async () =>await import("react-quill"), {
   ssr: false 
});


export default function WebEditor(): JSX.Element {
  const onClickSubmit = async(): Promise<void> => {
    const {Modal} = await import("antd") // 원하는 식으로 코드를 쪼갠다 (코드 스플릿팅)
    Modal.success({content: "게시글 등록에 성공하였습니다!!!"})
  };

  // useEffect(() => {
  //   async function aaa(): Promise<void> {
  //     const {Modal} = await import("antd") // 원하는 식으로 코드를 쪼갠다 (코드 스플릿팅)
  //     Modal.success({content: "게시글 등록에 성공하였습니다!!!"})
  //   }
  //   void aaa();
  // }, []) 이런 방법도 있음!

  const onChangeContents = (a: string): void => {
    console.log(a)
  };

  return (
    <form onSubmit={wrapFormAsyncFunc(onClickSubmit)}>
      작성자: <input type='text'/>
      <br/>
      비밀번호: <input type='password'/>
      <br/>
      제목: <input type='text'/>
      <br/>
      내용: <ReactQuill onChange={onChangeContents}/><br/>
      <button>등록하기</button>
    </form>
  )
}