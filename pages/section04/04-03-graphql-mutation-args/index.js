import { useMutation, gql } from '@apollo/client'

const 나의그래프큐엘셋팅 = gql`
    mutation createProduct($seller: String, $name: String, $detail: String, $price: Int){
        createProduct(seller: $seller, createProductInput: 
            {name: $name, detail: $detail, price: $price}) {
            _id
            number
            message
        }
    }
` 
// graphql 에서 변수는 $
export default function GraphqlMutationPage() {

    const [나의함수] = useMutation(나의그래프큐엘셋팅)
    
    const onClickSubmit = async () => {
        const result = await 나의함수({
            variables: {   // $를 다른말로 variables 로 써도 됨
                seller: "훈이",
                name: "키보드",
                detail : "별로임ㅋ",
                price : 5000,
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