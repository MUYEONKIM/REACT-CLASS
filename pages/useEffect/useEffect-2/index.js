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
    height: 70px;
    width: 620px;
    border: 3px solid red;
    color: gray;
    font-size: 50px;
    margin-bottom: 30px;;
`

export default function useEffectPage() {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('')
    const onChangeInput = (event) => {
        setText(event.target.value)
    };

    const onChangeInput2 = (event) => {
        setMessage(event.target.value)
    };

    useEffect(() => {
        console.log("렌더링이 완료될때 실행")
        console.log(text) // 이렇게 하면 text에 있는 것들이 message가 바뀔때 마다 실행
    }, [message]) // 대괄호 안속에 있는게 바뀔 때만 렌더링 실행
    return (
        <Mydiv>
            <MyInput onChange={onChangeInput}></MyInput>
            <MyDiv>{text}</MyDiv>
            <MyInput onChange={onChangeInput2}></MyInput>
            <MyDiv>{message}</MyDiv>
        </Mydiv>
    )
}