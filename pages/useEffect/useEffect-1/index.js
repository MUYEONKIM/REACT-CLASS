import { useEffect, useState } from "react"
import styled from '@emotion/styled'


const Mydiv = styled.div`
    width: 100vw;
    height: 100vh;
    border: 5px solid red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const MyInput = styled.input`
    color: gray;
    font-size: 50px;
`

const MyDiv = styled.div`
    border: 3px solid red;
    color: gray;
    font-size: 50px;
`

export default function useEffectPage() {
    const [text, setText] = useState('');
    const onChangeInput = (event) => {
        console.log(event.target.value);
        setText(event.target.value)
    };

    useEffect(() => {
        console.log("렌더링이 완료될때 마다 실행")
    })
    return (
        <Mydiv>
            <MyInput onChange={onChangeInput} type='text' placeholder="값을 입력하시오"></MyInput>
            <MyDiv>{text}</MyDiv>
        </Mydiv>
    )
}