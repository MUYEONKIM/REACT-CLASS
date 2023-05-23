import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { useState} from 'react'
import { 나의그래프큐엘셋팅, UPDATE_BOARD } from './BoardWrite.queries' // export는 골라서 가져오기 가능 {}
import BoardWriteUI from './BoardWrite.presenter' 
// 중괄호가 없다는것은 export가 하나밖에 없고 default되어있는 그거 가져온다는 것
// import asdf from './BoardWrite.presenter' // export default 이름 바꿔서 가져오기
// import asdf, {apple} from './BoardWrite.presenter' // export default 와 export함꼐 가져오기
// import * as S from './BoardWrite.styled' //export 한방에 다 가져오기
// S.BlueButton
// S.RedInput

// {}는 여러개중에 한개, default는 언제나 하나, default는 어차피 하나 이기때문에 import에서 이름을 똑같이 안맞춰줘도 됨
export default function BoardWrite(props) {
    const router = useRouter()
    const [writer, setWriter] = useState("")
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")

    const [나의함수] = useMutation(나의그래프큐엘셋팅)
    const [updateBoard] = useMutation(UPDATE_BOARD)
    
    const onClickSubmit = async () => {
        const result = await 나의함수({
            variables: {    //  variables 가 $의 역할을 함
                writer: writer,
                title: title,
                contents: contents 
            }
        }) // 물론 await 빼면 promise라고 나옴
        console.log(result)
        router.push(`/section09/09-03-boards/${result.data.createBoard.number}`)
    } 

    const onClickUpdate = async () => {
        const result = await updateBoard({
            variables: {
                number: Number(router.query.number),
                writer: writer,
                title: title,
                contents: contents,
            }
        })
        console.log(result)
        router.push(`/section09/09-03-boards/${result.data.updateBoard.number}`)
    }

    const onChangeWriter = (event) => {
        setWriter(event.target.value)
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onChangeContents = (event) => {
        setContents(event.target.value)
    }
    return (
        <div>  
            <div style={{color:"red"}}>$$$$$$$$$$ 여기는 컨테이너 입니다 $$$$$$$$$$$$$$</div>          
            <BoardWriteUI 
                onClickSubmit={onClickSubmit}
                onClickUpdate={onClickUpdate}
                onChangeWriter={onChangeWriter}
                onChangeTitle={onChangeTitle}
                onChangeContents={onChangeContents}
                isEdit={props.isEdit}/>
            <div>$$$$$$$$$$ 여기는 컨테이너 입니다</div>          
        </div>
    )
}