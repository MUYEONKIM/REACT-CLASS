// 1. HOF를 이용한 router 페이지 옮기기
// import { useRouter } from "next/router"


// export default function CustomHooksMovetoPage(): JSX.Element {
  //   const router = useRouter()
  
  //   const onClickMoveToPage = (path: string) => () => {
    //     // void router.push(path)
    //     console.log(path)
    //   }
    
    //   return (
      //     <>
      //       <button onClick={onClickMoveToPage("/boards")}>게시판으로 이동</button>
//       <button onClick={onClickMoveToPage("/markets")}>마켓으로 이동</button>
//       <button onClick={onClickMoveToPage("/mypages")}>마이페이지으로 이동</button>
//     </>
//   )
// } 
import { useMoveToPage } from "../../../src/components/commons/hooks/useMoveToPage"

export default function CustomHooksMovetoPage(): JSX.Element {
  const {onClickMoveToPage, visitedPage } = useMoveToPage();
  
  return (
    <>
      <button onClick={onClickMoveToPage("/boards")}>게시판으로 이동</button>
      <button onClick={onClickMoveToPage("/markets")}>마켓으로 이동</button>
      <button onClick={onClickMoveToPage("/mypages")}>마이페이지으로 이동</button>
    </>
  )
} 
