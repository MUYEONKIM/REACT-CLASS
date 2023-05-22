import { Fragment } from 'react'
import { useRouter } from 'next/router'
import BoardComponent from '../../../src/components/units/board/09-board-component'

export default function BoardEditPage() {
    const router = useRouter()

    const onClickMove2= () => {
        router.push('/section09/09-02-component-new')
    }

    return ( 
        <BoardComponent isEdit={true} onClickMove={onClickMove2} colors="blue"/>
    )
}