import { Fragment } from "react"
import { useRouter } from 'next/router'

export default function BoardNewPage() {
    const router = useRouter()

    const onClickMove = () => {
        router.push("/section09/09-01-board-edit")
    }

    return (
        <Fragment>
            <h1>등록페이지</h1>
            <div>
                제목 : <input type="text" />
            </div>
            <div>
                내용 : <input type="text" />
            </div>
            <div>
                <button onClick = {onClickMove}>등록하기</button>
            </div>
        </Fragment>    
    )
}