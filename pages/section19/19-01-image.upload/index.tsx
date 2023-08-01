import { gql, useMutation } from "@apollo/client"
import type { IMutation, IMutationUploadFileArgs } from "../../../src/commons/types/generated/typed";
import { useState } from "react";

const UPLOAD_FILE =gql`
  mutation uploadFile($file: Upload!){
    uploadFile(file: $file){
      url
    }
  }
`;

export default function ImageUploadPage(): JSX.Element {
  const [image, setImage] = useState("")
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
  return (
    <>
      <input type="file" onChange={onChangeFile} multiple/>
      <img src={`https://storage.googleapis.com/${image}`} />
    </>
  )
}