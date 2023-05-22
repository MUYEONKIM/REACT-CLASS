export default function BoardComponent(props) {
    // 컴포넌트 형식에서는 왠만하면 return 안에 div로 감싸주는게 좋다
    return (
        <div>
            <h1 style={{color: props.colors}}>{props.isEdit ? "수정" : "등록"}페이지</h1>
            <div>
                제목 : <input type="text" />
            </div>
            <div>
                내용 : <input type="text" />
            </div>
            <div>
                <button onClick={props.onClickMove}>{props.isEdit ? "수정" : "등록"}하기</button>
            </div>
        </div>
    )
}

