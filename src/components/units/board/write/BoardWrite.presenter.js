import {RedInput, BlueButton} from './BoardWrite.styled'

export default function BoardWriteUI (props) {
    return (
        <div>
            <div style={{color:"violet"}}>@@@@@@@@@ 여기는 프리젠터 입니다 @@@@@@@@</div>
            작성자 : <RedInput type = "text" onChange={props.bbb}/><br/>
            품명 : <RedInput type="text" onChange={props.ccc}/><br/>
            상세사항 : <RedInput type="text" onChange={props.ddd}/><br/>
            <BlueButton style={{background: "gray"}} onClick={props.aaa}>Graphql-API 요청하기</BlueButton>
            <div>@@@@@@@@@ 여기는 프리젠터 입니다 @@@@@@@@</div>
        </div>
    )
}

export const apple = 3 