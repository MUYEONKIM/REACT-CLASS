import BoardComponent from '../../../src/components/units/board/09-board-component'
import { useRouter } from 'next/router'


export default function BoardNewPage() {
    const router = useRouter()

    const onClcikMove = () => {
        router.push('/section09/09-02-component-edit')
    }
    return <BoardComponent isEdit={false} onClickMove={onClcikMove} colors="red"/>
}