import { useState, useEffect } from "react"


export default function TestPage() {
    const [color, setColor] = useState('white')
    const [backcolor, setBackColor] = useState('black')

    const onClcikButton = () => {
        color=='white'?setColor('black'):setColor('white');
        backcolor=='black'?setBackColor('white'):setBackColor('black')
    }

    const myStyle = {
        backgroundColor: backcolor,
        color: color
    }
    return (
        <>
            <div style = {myStyle}>
                테스트페이지 입니다.
            </div>
            <button onClick={onClcikButton}>색상 바꾸기 버튼입니다</button>
            <input onChange={onChangeInput} type='text' placeholder="값을 입력해보세요."></input>
        </>
    )
}