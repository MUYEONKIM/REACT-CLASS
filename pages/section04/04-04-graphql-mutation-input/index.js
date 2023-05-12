import { useMutation, gql } from '@apollo/client'
import { useState} from 'react'

const 나의그래프큐엘셋팅 = gql`
  mutation createProduct($seller: String, $createProductInput: CreateProductInput!){ 
    createProduct(seller: $seller, createProductInput: $createProductInput){ 
      _id
      number
      message
    }
  }
`
// graphql 에서 변수는 $
export default function GraphqlMutationPage() {
    const [seller, setSeller] = useState('')
    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')
    const [price, setPrice] = useState(0)

    const [나의함수] = useMutation(나의그래프큐엘셋팅)
    
    const onClickSubmit = async () => {
        const result = await 나의함수({
            variables: {    //  variables 가 $의 역할을 함
                seller: seller,
                createProductInput: {
                    name: name,
                    detail : detail,
                    price : price,
                }
            }
        }) // 물론 await 빼면 promise라고 나옴
        console.log(result)
    } 

    const onChangeSeller = (event) => {
        setSeller(event.target.value)
    }

    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const onChangeDetail = (event) => {
        setDetail(event.target.value)
    }

    const onChangePrice = (event) => {
        setPrice(Number(event.target.value))
    }

    return ( // 한줄일때는 괄호 빼도됨
        <div>
            작성자 : <input type="text" onChange={onChangeSeller}/><br/>
            품명 : <input type="text" onChange={onChangeName}/><br/>
            상세사항 : <input type="text" onChange={onChangeDetail}/><br/>
            가격 : <input type="text" onChange={onChangePrice}/><br/>
            <button style={{background: "red"}} onClick={onClickSubmit}>Graphql-API 요청하기</button>
        </div>
    )
}