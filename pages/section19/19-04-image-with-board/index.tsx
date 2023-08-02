import { gql, useMutation } from "@apollo/client"
import type { IMutation, IMutationUploadFileArgs } from "../../../src/commons/types/generated/typed";
import { useState, useRef } from "react";
import { checkValidationFile } from "../../../src/commons/libaries/validation";

const UPLOAD_FILE =gql`
  mutation uploadFile($file: Upload!){
    uploadFile(file: $file){
      url
    }
  }
`;

const 나의그래프큐엘셋팅 = gql`
  mutation createBoard($createBaordInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  };
`

export default function ImageUploadPage(): JSX.Element {
  const [image, setImage] = useState("")
  const fileRef = useRef(null)

  const [uploadFile] = useMutation<Pick<IMutation, "uploadFile">, IMutationUploadFileArgs>(UPLOAD_FILE);

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0] // 배열로 들어오는 이유: <input type="file" multiple /> 일때 여러개 드래그 가능
    console.log(file)

    const isValid = checkValidationFile(file)
    if(!isValid) return

    const result = await uploadFile({
      variables: {
        file
      }
    })
    console.log(result.data?.uploadFile.url)
    setImage(result.data?.uploadFile.url?? "")
  };
  const onClickImage = (): void => {
    fileRef.current?.click();
  };

  // /////////////////////////////////////////////////////

  const [writer, setWriter] = useState('')
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const [나의함수] = useMutation(나의그래프큐엘셋팅)
  
  const onClickSubmit = async (): Promise<void>  => {
      const result = await 나의함수({
          variables: {
            createBoardInput: {
              writer,
              password: "123",
              title,
              contents,
              images: [image]
            }
          }
      });
      console.log(result)
  };

  const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setWriter(event.target.value)
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value)
  };

  const onChangeContents = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setContents(event.target.value)
  };

  return (
    <>
      작성자 : <input type="text" onChange={onChangeWriter}/>
      제목 : <input type="text" onChange={onChangeTitle}/>
      내용 : <input type="text" onChange={onChangeContents}/>
      <div style={{width: "50px", height: "50px", backgroundColor: "gray"}} onClick={onClickImage}>이미지 선택</div>
      <input id="파일태그ID" style={{display: "none"}} type="file" onChange={onChangeFile} ref={fileRef} accept="image/jpeg, image/png"/>
      <img src={`https://storage.googleapis.com/${image}` } />
      <button style={{background: "red"}} onClick={onClickSubmit}>Graphql-API 요청하기</button>
    </>
  )
}