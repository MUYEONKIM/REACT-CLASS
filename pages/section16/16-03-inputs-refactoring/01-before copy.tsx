import { useMutation, gql } from '@apollo/client'
import { useState} from 'react'

const 나의그래프큐엘셋팅 = gql`
  mutation createProduct($writer: String, $title: String, $contents: String){ 
    createProduct(writer: $writer, title: $title, contents: $contents){ 
      _id
      number
      message
    }
  }
`
// graphql 에서 변수는 $
export default function GraphqlMutationPage() {
    const [writer, setWriter] = useState();
    const [title, setTitle] = useState();
    const [contents, setContents] = useState();

    const [나의함수] = useMutation(나의그래프큐엘셋팅)
    
    const onClickSubmit = async () => {
        const result = await 나의함수({
            variables: {    //  variables 가 $의 역할을 함
                    writer: writer,
                    title : title,
                    contents : contents,
            },
        }) // 물론 await 빼면 promise라고 나옴
        console.log(result)
    } 

    const onChangeWriter = (event) => {
        setWriter(event.target.value)
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onChangeContents = (event) => {
        setContents(event.target.value)
    }

    return ( // 한줄일때는 괄호 빼도됨
        <div>
            작성자 : <input type="text" onChange={onChangeWriter}/><br/>
            품명 : <input type="text" onChange={onChangeTitle}/><br/>
            상세사항 : <input type="text" onChange={onChangeContents}/><br/>
            <button style={{background: "red"}} onClick={onClickSubmit}>Graphql-API 요청하기</button>
            <div></div>
        </div>
    )
}