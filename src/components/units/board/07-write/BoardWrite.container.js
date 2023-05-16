import { useMutation } from '@apollo/client'
import { useState} from 'react'
import { 나의그래프큐엘셋팅 } from './BoardWrite.queries' // export는 골라서 가져오기 가능 {}
import BoardWriteUI from './BoardWrite.presenter' // 중괄호가 없다는것은 export가 하나밖에 없고 default되어있는 그거 가져온다는 것
import asdfds from './BoardWrite.presenter' // export default 이름 바꿔서 가져오기
import asdfd, {apple} from './BoardWrite.presenter' // export default 와 export함꼐 가져오기
import * as S from './BoardWrite.styled' //export 한방에 다 가져오기
S.BlueButton
S.RedInput

// {}는 여러개중에 한개, default는 언제나 하나, default는 어차피 하나 이기때문에 import에서 이름을 똑같이 안맞춰줘도 됨
export default function BoardWrite() {
    const [isActive, setIsActive] = useState(false)
    const [writer, setWriter] = useState('')
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState('')

    const [나의함수] = useMutation(나의그래프큐엘셋팅)
    
    const onClickSubmit = async () => {
        const result = await 나의함수({
            variables: {    //  variables 가 $의 역할을 함
                writer: writer,
                title: title,
                contents: contents 
            }
        }) // 물론 await 빼면 promise라고 나옴
        console.log(result)
    } 

    const onChangeWriter = (event) => {
        setWriter(event.target.value)
        event.target.value && title && contents? setIsActive(true): setIsActive(false)
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
        writer && event.target.value && contents? setIsActive(true): setIsActive(false)
    }

    const onChangeContents = (event) => {
        setContents(event.target.value)
        writer && title && event.target.value? setIsActive(true): setIsActive(false)
    }

    return (
        <div>  
            <div style={{color:"red"}}>$$$$$$$$$$ 여기는 컨테이너 입니다 $$$$$$$$$$$$$$</div>          
            <BoardWriteUI 
                onClickSubmit={onClickSubmit}
                onChangeWriter={onChangeWriter}
                onChangeTitle={onChangeTitle}
                onChangeContents={onChangeContents}
                isActive={isActive}/>
            <div>$$$$$$$$$$ 여기는 컨테이너 입니다</div>          
        </div>
    )
}
/*
props = {
    aaa :onClickSubmit,
    bbb :onChangeWriter,
    ccc :onChangeTitle.
    ddd :   onChangeContents
}
*/