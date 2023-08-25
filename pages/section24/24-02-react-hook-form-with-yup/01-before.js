import { useState} from 'react'

// graphql 에서 변수는 $
export default function GraphqlMutationPage() {
    const [seller, setSeller] = useState('')
    const [name, setName] = useState('')
    const [detail, setDetail] = useState('')
    const [price, setPrice] = useState(0)

    
    const onClickSubmit = async () => {

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
            <div></div>
        </div>
    )
}