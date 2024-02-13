import { useEffect, useState } from "react"
import styled from '@emotion/styled'
import { useRouter } from 'next/router'


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
    margin-bottom: 30px;
`

let num = 0 // let이 여기 있는거랑 밑의 함수 안에 있는 거랑 전혀 다름

export default function useEffectPage() {
    const router = useRouter();
    let num2 = 0
    const [text, setText] = useState('');
    const [message, setMessage] = useState('')
    const onChangeInput = (event) => {
        setText(event.target.value)
    };

    const onChangeInput2 = (event) => {
        setMessage(event.target.value)
    };

    useEffect(() => {
        console.log("렌더링이 완료될때 실행" + num2++ + num++); // 렌더링 (무조건 처음에 한 번 실행되는 것)
        return () => {  // 렌더링만 한번 실행시키고 그 후 return을 먼저 실행시켜주고 위의 console.log를 실행시킴
            console.log("cleanup")
        }
    }, [])
    return (
        <Mydiv>
            <button onClick={() => router.push("/")}>ddd</button>
            <MyInput onChange={onChangeInput}></MyInput>
            <MyDiv>{text}</MyDiv>
            <MyInput onChange={onChangeInput2}></MyInput>
            <MyDiv>{message}</MyDiv>
        </Mydiv>
    )
}