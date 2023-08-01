import { gql, useMutation } from "@apollo/client"
import type { IMutation, IMutationUploadFileArgs } from "../../../src/commons/types/generated/typed";
import { useState, useRef } from "react";

const UPLOAD_FILE =gql`
  mutation uploadFile($file: Upload!){
    uploadFile(file: $file){
      url
    }
  }
`;

export default function ImageUploadPage(): JSX.Element {
  const [image, setImage] = useState("")
  const fileRef = useRef(null)

  const [uploadFile] = useMutation<Pick<IMutation, "uploadFile">, IMutationUploadFileArgs>(UPLOAD_FILE);

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0] // 배열로 들어오는 이유: <input type="file" multiple /> 일때 여러개 드래그 가능
    console.log(file)

    const result = await uploadFile({
      variables: {
        file
      }
    })
    console.log(result.data?.uploadFile.url)
    setImage(result.data?.uploadFile.url?? "")
  }
  const onClickImage = (): void => {
    // 이게 기존방법, react스럽지 않음 react는 useRef사용
    // console.log(document.getElementById("파일태그ID")); 
    // console.log(fileRef)

    // 둘 다 같은 기능
    // document.getElementById("파일태그ID")?.click()
    fileRef.current?.click();
  }

  return (
    <>
      <div style={{width: "50px", height: "50px", backgroundColor: "gray"}} onClick={onClickImage}>이미지 선택</div>
      <input id="파일태그ID" style={{display: "none"}} type="file" onChange={onChangeFile} ref={fileRef}/>
      <img src={`https://storage.googleapis.com/${image}` } />
    </>
  )
}