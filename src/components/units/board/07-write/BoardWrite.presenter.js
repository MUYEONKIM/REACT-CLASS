import {RedInput, BlueButton} from './BoardWrite.styled'

export default function BoardWriteUI (props) {
    return (
        <div>
            <div style={{color:"violet"}}>@@@@@@@@@ 여기는 프리젠터 입니다 @@@@@@@@</div>
            작성자 : <RedInput 
                    type = "text" 
                    onChange={props.onChangeWriter}/><br/>
            품명 : <RedInput type="text" onChange={props.onChangeTitle}/><br/>
            상세사항 : <RedInput 
                        type="text" 
                        onChange={props.onChangeContents}
                        mycolor={true}/><br/>
            <BlueButton 
                onClick={props.onClickSubmit}
                isActive={props.isActive}>
                    Graphql-API 요청하기
            </BlueButton>
            <div>@@@@@@@@@ 여기는 프리젠터 입니다 @@@@@@@@</div>
        </div>
    )
}

export const apple = 3 