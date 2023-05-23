import BoardWrite from '../../../../../src/components/units/board/09-write/BoardWrite.container'

export default function GraphqlMutationPage() {

    return (
        <div>
            <div style={{color:"blue"}}>########## 여기는 페이지 입니다 ###########</div>
            <BoardWrite isEdit={true}/>
            <div>########## 여기는 페이지 입니다 ###########</div>
        </div>
    )
}