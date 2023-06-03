import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { IMutation, IMutationCreateBoardArgs } from '../../../src/commons/types/generated/typed'

export const 나의그래프큐엘셋팅 = gql`
    mutation createBoard($writer: String, $title:String, $contents:String){
        createBoard(writer: $writer, title: $title, contents: $contents){
            _id,
            number,
            message,
        }
    }
`
// graphql 에서 변수는 $
export default function GraphqlMutationPage() {
    //const [counter, setCounter] = useState<number>(0) state의 타입 명시 방법

    // const [나의함수] = useMutation<결과타입, 변수타입>(나의그래프큐엘셋팅) // use타입 사용시는 사이에 꺽쇠로 낑겨넣어야 함
    const [나의함수] = useMutation<Pick<IMutation, "createBoard">, IMutationCreateBoardArgs>(나의그래프큐엘셋팅) // use타입 사용시는 사이에 꺽쇠로 낑겨넣어야 함
    
    const onClickSubmit = async () => {
        const result = await 나의함수({
            variables: {    //  variables 가 $의 역할을 함
                writer: "훈이",
                title: "안녕하세요!",
                contents: "5달라!" 
            }
        }) // 물론 await 빼면 promise라고 나옴
        console.log(result)
    } 

    return ( // 한줄일때는 괄호 빼도됨
        <div>
            <button style={{background: "red"}} onClick={onClickSubmit}>Graphql-API 요청하기</button>
        </div>
    )
}