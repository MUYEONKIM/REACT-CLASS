import {RedInput, BlueButton} from './BoardWrite.styled'

export default function BoardWriteUI (props) {
    return (
        <div>
            <div style={{color:"violet"}}>@@@@@@@@@ 여기는 프리젠터 입니다 @@@@@@@@</div>
            작성자 : <RedInput type = "text" onChange={props.onChangeWriter} defaultValue={props.data?.fetchBoard.writer} /><br/>
            품명 : <RedInput type="text" onChange={props.onChangeTitle} defaultValue={props.data?.fetchBoard.title} /><br/>
            상세사항 : <RedInput type="text" onChange={props.onChangeContents} defaultValue={props.data?.fetchBoard.contents} /><br/>
            <BlueButton style={{background: "gray"}} onClick={props.isEdit ? props.onClickUpdate :props.onClickSubmit}>
                {props.isEdit ? "수정" : "등록"}하기</BlueButton>
            <div>@@@@@@@@@ 여기는 프리젠터 입니다 @@@@@@@@</div>
        </div>
    )
}

export const apple = 3 

// mutation에 전부 보내는게 아니라 내가 수정한 것만 보내기
// 해결방법: 빈객체를 만들어서 함
// state이 초기값에 defaultValue를 넣어주기