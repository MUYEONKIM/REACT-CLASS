import { Fragment } from 'react'
import { useRouter } from 'next/router'

export default function BoardEditPage() {
    const router = useRouter()

    const onClickMove2= () => {
        router.push('/section09/09-01-board-new')
    }

    return (
        <Fragment>
            <h1>수정페이지</h1>
            <div>
                제목 : <input type="text" />
            </div>
            <div>
                내용 : <input type="text" />
            </div>
            <div>
                <button onClick = {onClickMove2}>수정하기</button>
            </div>
        </Fragment>    
    )
}