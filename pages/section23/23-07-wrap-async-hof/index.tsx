import { useMutation, gql } from '@apollo/client'
import { wrapAsyncFunc } from '../../../src/commons/libaries/asyncFunc'

const 나의그래프큐엘셋팅 = gql`
    mutation {
        createProduct(seller:"123", createProductInput: 
            {name:"마우스", detail:"별로임", price:50000}) {
            _id
            number
            message
        }
    }
` 

export default function GraphqlMutationPage(): JSX.Element {

    const [나의함수] = useMutation(나의그래프큐엘셋팅)
    
    const onClickSubmit = async (): Promise<void> => {
        const result = await 나의함수() // 물론 await 빼면 promise라고 나옴
        console.log(result)
    }

    return ( // 한줄일때는 괄호 빼도됨
        <div>
            <button style={{background: "red"}} onClick={wrapAsyncFunc(onClickSubmit)}>Graphql-API 요청하기</button>
        </div>
    )
}