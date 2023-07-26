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
export default function GraphqlMutationPage(): JSX.Element {
    const [inputs, setInputs] = useState({
        writer: "",
        title: "",
        contents: "",
    })

    const [나의함수] = useMutation(나의그래프큐엘셋팅)
    
    const onClickSubmit = async (): Promise<any> => {
        const result = await 나의함수({
            variables: {    //  variables 가 $의 역할을 함
                ...inputs,
            },
        }) // 물론 await 빼면 promise라고 나옴
        console.log(result)
    } 

    const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputs({
            ...inputs,
            [event.target.id] : event.target.value,
        })
    }

    // const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //     setInputs((prev) => ({ 이렇게 prev로 해도 똑같이 작동
    //         ...inputs,
    //         [event.target.id] : event.target.value,
    //     })); 왜 prev에 괄호가 들어가게 되냐면 화살표 함수에서 중괄호와 return을 없애는 대신 소괄호로 쓸 수 있었음
    // } 

    return ( // 한줄일때는 괄호 빼도됨
        <div>
            작성자 : <input type="text" id="writer" onChange={onChangeInputs}/><br/>
            품명 : <input type="text" id="title" onChange={onChangeInputs}/><br/>
            상세사항 : <input type="text" id="contents" onChange={onChangeInputs}/><br/>
            <button style={{background: "red"}} onClick={onClickSubmit}>Graphql-API 요청하기</button>
            <div></div>
        </div>
    )
}