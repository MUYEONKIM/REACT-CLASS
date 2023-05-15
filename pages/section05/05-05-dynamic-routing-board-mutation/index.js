import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/router'

const 나의그래프큐엘셋팅 = gql`
    mutation createBoard($writer: String, $title: String, $contents: String,){
        createBoard(writer: $writer, title: $title, contents: $contents) {
            _id
            number
            message
        }
    }
` 
// graphql 에서 변수는 $
export default function GraphqlMutationPage() {

    const router = useRouter()
    
    const [나의함수] = useMutation(나의그래프큐엘셋팅)
    
    const onClickSubmit = async () => {

        try { // try안에 있는 내용을 시도하다가 실패하면, 다음에 있는 모든 줄들을 무시하고, catch에 있는 내요이 실행됨
            const result = await 나의함수({
                variables: {   // $를 다른말로 variables 로 써도 됨
                    writer: "훈이",
                    title: "키보드",
                    contents : "별로임ㅋ",
                }
            }) // 물론 await 빼면 promise라고 나옴
            router.push(`/section05/05-05-dynamic-routing-board-mutation-moved/${result.data.createBoard.number}`)
        } catch(error) {
            alert(error.message)
        }
    }
    return ( // 한줄일때는 괄호 빼도됨
        <div>
            <button style={{background: "red"}} onClick={onClickSubmit}>Graphql-API 요청하기</button>
        </div>
    )
}